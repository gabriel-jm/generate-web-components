import { promises as fs } from 'fs'
import path from 'path'
import { PathMap, RummageFolderOptions, CompilingSuccess } from './'

interface FolderToSearch {
  folderName: string
  extensions: string[]
}

export async function startRun({ initialFolder, extensions }: Omit<RummageFolderOptions, 'usingTS'>) {
  let paths: Array<PathMap> = []

  async function runThrough({ folderName, extensions }: FolderToSearch) {
    const folderChildren = await fs.readdir(folderName)

    for(const child of folderChildren) {
      const folderPath = `${folderName}/${child}`
      const childStats = await fs.lstat(folderPath)
      const [, extname] = child.split('.')
      const matchExtension = extensions ? extensions.includes(extname) : true

      if(childStats.isDirectory()) {
        await runThrough({
          folderName: folderPath,
          extensions
        })
      }
  
      if(childStats.isFile() && matchExtension) {
        const pathToFile = path.resolve(folderPath)
        const [, ...parentPath] = folderName.split('/')
        const fileContent = await fs.readFile(pathToFile)

        const file = {
          path: pathToFile,
          data: Buffer.from(fileContent
            .toString()
            .replace('_DIRNAME', parentPath.join('/'))
          )
        }
  
        if(extname === 'js' && process.env.NODE_ENV !== 'production') {
          fs.unlink(pathToFile)
        }
  
        paths = [...paths, file]
      }
    }
  }

  await runThrough({
    folderName: initialFolder,
    extensions
  })

  return <CompilingSuccess> {
    success: true,
    paths
  }
}
