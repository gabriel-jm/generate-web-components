import { Logger } from '../logger'
import { startRun } from './files-searcher'

export interface PathMap {
  path: string
  data: Buffer
}

export interface RummageFolderOptions {
  initialFolder: string
  extensions: string[]
  usingTS?: boolean
}

export interface CompilingSuccess {
  success: true
  paths: PathMap[]
}

export interface CompilingError {
  success: false
  msg: string
}

export async function rummageFolder(options: RummageFolderOptions) {
  const { initialFolder, extensions, usingTS = true } = options

  if(usingTS) {
    const { tsCompiling } = require('./ts-compiling')
    const procced = await tsCompiling()

    if(!procced.compiled) {
      return <CompilingError> {
        success: false,
        msg: procced.error as string
      }
    }
  }

  Logger.cachingFiles()
  const runResult = <CompilingSuccess> await startRun({
    initialFolder,
    extensions
  })

  return runResult
}
