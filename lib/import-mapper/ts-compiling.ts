import path from 'path'
import { Logger } from '../logger'
const tsc = require('node-typescript-compiler')

export async function tsCompiling() {
  try {
    Logger.compiling()
    
    await tsc.compile({
      project: path.resolve('src')
    })

    return {
      compiled: true
    }
  } catch(tscError) {
    const errorMessage = tscError
      .message
      .split('] ')[1]

      console.log(tscError.message)

    return {
      compiled: false,
      error: errorMessage
    }
  }
}
