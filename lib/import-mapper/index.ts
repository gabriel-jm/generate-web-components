import path from 'path'
import fs from 'fs'
import { Logger } from '../logger'
const tsc = require('node-typescript-compiler')

export interface PathMap {
  path: string
  data: Buffer
}

interface RummageFolderOptions {
  initialFolder: string
  extensions: string[]
  usingTS?: boolean
}

interface FolderToSearch {
  folderName: string
  extensions: string[]
}

export interface CompilingSuccess {
  success: true
  paths: PathMap[]
}

export interface CompilingError {
  success: false
  msg: string
}

async function tsCompiling() {
  try {
    Logger.compiling()
    
    await tsc.compile({
      project: path.resolve(),
      noEmitOnError: true,
      module: 'esnext'
    })

    return {
      compiled: true
    }
  } catch(tscError) {
    const errorMessage = tscError
      .message
      .split(']')[1]

    return {
      compiled: false,
      error: errorMessage
    }
  }
}

export async function rummageFolder(options: RummageFolderOptions) {
  const { initialFolder, extensions, usingTS = true } = options

  if(usingTS) {
    const procced = await tsCompiling()

    if(!procced.compiled) {
      return <CompilingError> {
        success: false,
        msg: procced.error as string
      }
    }
  }

  Logger.cachingFiles()
  return startRun({ initialFolder, extensions }) as CompilingSuccess
}

function startRun({ initialFolder, extensions }: Omit<RummageFolderOptions, 'usingTS'>) {
  let paths: Array<PathMap> = []

  function runThrough({ folderName, extensions }: FolderToSearch) {
    const folderChildren = fs.readdirSync(folderName)

    for(const child of folderChildren) {
      const folderPath = `${folderName}/${child}`
      const childStats = fs.lstatSync(folderPath)
      const [, extname] = child.split('.')
      const matchExtension = extensions ? extensions.includes(extname) : true
  
      if(childStats.isFile() && matchExtension) {
        const pathToFile = path.resolve(folderPath)
        const [, ...parentPath] = folderName.split('/')

        const file = {
          path: pathToFile,
          data: Buffer.from(fs
            .readFileSync(pathToFile)
            .toString()
            .replace('_DIRNAME', parentPath.join('/'))
          )
        }
  
        if(extname === 'js') {
          fs.unlinkSync(pathToFile)
        }
  
        paths = [...paths, file]
        continue
      }
      
      if(childStats.isDirectory()) {
        runThrough({
          folderName: folderPath,
          extensions
        })
      }
  
      continue
    }
  }

  runThrough({
    folderName: initialFolder,
    extensions
  })

  return {
    success: true,
    paths
  }
}
