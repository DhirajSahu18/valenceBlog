type LogLevel = 'info' | 'warn' | 'error' | 'debug'

const colors = {
  info: '\x1b[36m',    // cyan
  warn: '\x1b[33m',    // yellow
  error: '\x1b[31m',   // red
  debug: '\x1b[35m',   // magenta
  reset: '\x1b[0m'     // reset
}

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`${colors.info}[INFO]${colors.reset} ${message}`, ...args)
  },
  warn: (message: string, ...args: any[]) => {
    console.log(`${colors.warn}[WARN]${colors.reset} ${message}`, ...args)
  },
  error: (message: string, ...args: any[]) => {
    console.error(`${colors.error}[ERROR]${colors.reset} ${message}`, ...args)
  },
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.debug}[DEBUG]${colors.reset} ${message}`, ...args)
    }
  }
}