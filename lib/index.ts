import http from 'http'
import path from 'path'
import { rummageFolder, PathMap } from './import-mapper'
import { Logger } from './logger'

const mimeTypes: { [key: string]: string } = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  ico: 'image/icon'
}

function runServer(files: PathMap[]) {
  const server = http.createServer(async (req, res) => {
    const urlArray = req.url?.split('/').filter(Boolean) || []
    const fileName = !urlArray.length || !req.url?.includes('.') ? ['index.html'] : urlArray
    const filePath = path.resolve('src', ...fileName)

    const [ , extension] = fileName.pop()?.split('.') || ''
    const contentType = extension in mimeTypes && mimeTypes[extension]

    if(!contentType) {
      return res.end('Content Type not allowed: ' + extension)
    }

    try {
      const fileContent = await loadFileContent(filePath)

      res.writeHead(200, { 'Content-Type': contentType })
      res.end(fileContent)
    } catch(err) {
      console.log(err.message)
      return notFound(res)
    }
  })

  function loadFileContent(filePath: string) {
    return new Promise((resolve, reject) => {
      const file = files.find(file => file.path === filePath)

      if(!file) return reject(
        new Error(`File in path, not found ${filePath}`)
      )

      resolve(file.data)
    })
  }

  function notFound(res: http.ServerResponse) {
    res.writeHead(404)
    res.end()
  }

  const port = 8000
  server.listen(port, () => Logger.startServer(port))
}

async function run() {
  const compileResult = await rummageFolder({
    initialFolder: 'src',
    extensions: ['html', 'ico', 'css', 'js']
  })

  if(compileResult.success == true) {
    runServer(compileResult.paths)
  } else {
    Logger.tscError(compileResult)
  }
}

run()
