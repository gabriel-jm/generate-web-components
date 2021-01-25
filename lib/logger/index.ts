import { CompilingError } from '../import-mapper'
import colors from './colors'

export class Logger {
  static compiling() {
    console.clear()
    console.log(
      colors.yellow('Compiling...')
    )
  }

  static cachingFiles() {
    console.clear()
    console.log(
      colors.yellow('Caching files...')
    )
  }

  static tscError(compileError: CompilingError) {
    const errorMsg = compileError.msg.split('): ')
    const where = errorMsg[0] + '):'
    const rest = errorMsg[1]

    console.clear()
    console.error(
      colors.red('[TSC Error]'),
      colors.gray(where),
      colors.reset(rest)
    )
  }

  static startServer(port: number | string) {
    console.clear()
    console.log(
      colors.cyan('[INFO]'),
      colors.reset(`Server Started: http://localhost:${port}`)
    )
  }

}
