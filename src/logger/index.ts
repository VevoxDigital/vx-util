
import * as debug from 'debug'
import { format } from 'util'
import * as winston from 'winston'

/**
 * The logging level for a specific message
 */
export enum LoggingLevel {
  DEBUG = 'debug',
  SILLY = 'silly',
  VERBOSE = 'verbose',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Creates a lower-level Winston logger
 * @returns The logger
 */
export function createWistonLogger (): winston.Logger {
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf((info: any) => {
            return `${info.timestamp} ${info.level}: ${info.message}`
          })
        ),
        level: LoggingLevel.INFO,
        stderrLevels: [ LoggingLevel.WARN, LoggingLevel.ERROR ]
      })
      // TODO File transports
    ]
  })
}

export default class Logger {
  /** The global logger this logger inhierited from */
  public readonly global: Logger

  /** The logger's parent */
  public readonly parent: Logger

  /** The package name for the logger */
  public readonly packageName: string

  /** The logger's prefix */
  public readonly prefix: string

  private readonly debugger: debug.IDebugger
  private readonly logger: winston.Logger
  private readonly subLoggers: Map<string, Logger>
  private consoleLevel: LoggingLevel = LoggingLevel.ERROR

  private constructor (packageName: string, prefix: string, parent?: Logger, global?: Logger) {
    this.prefix = prefix
    this.packageName = packageName

    this.parent = parent || this
    this.global = global || this

    this.debugger = debug([ packageName, prefix ].join(':'))
    this.logger = createWistonLogger()

    this.subLoggers = new Map<string, Logger>()
  }

  /**
   * Sets or gets the logging level of the console
   * @param level If specified, sets the logging level
   * @returns The current logging level
   */
  public consoleLoggingLevel (level?: LoggingLevel): LoggingLevel {
    if (level) this.consoleLevel = level
    return this.consoleLevel
  }

  /**
   * Logs a message at the given level
   * @param level The level to log at
   * @param message The message to send
   * @param data Optionally, data to format the message with
   */
  public log (level: LoggingLevel, message: string, ...data: any[]): void {
    const m = format(message, ...data)

    if (level === LoggingLevel.DEBUG) this.debugger(m)
    this.logger.log(level, m)
  }

  /**
   * Logs an debug message to the logger
   * @param message The message to log
   * @param data Optionally, data to format the message with
   */
  public debug (message: string, ...data: any[]): void {
    this.log(LoggingLevel.DEBUG, message, ...data)
  }

  /**
   * Logs an silly message to the logger
   * @param message The message to log
   * @param data Optionally, data to format the message with
   */
  public silly (message: string, ...data: any[]): void {
    this.log(LoggingLevel.SILLY, message, ...data)
  }

  /**
   * Logs an verbose message to the logger
   * @param message The message to log
   * @param data Optionally, data to format the message with
   */
  public verb (message: string, ...data: any[]): void {
    this.log(LoggingLevel.VERBOSE, message, ...data)
  }

  /**
   * Logs an info-level message to the logger
   * @param message The message to log
   * @param data Optionally, data to format the message with
   */
  public info (message: string, ...data: any[]): void {
    this.log(LoggingLevel.INFO, message, ...data)
  }

  /**
   * Logs an warning message to the logger
   * @param message The message to log
   * @param data Optionally, data to format the message with
   */
  public warn (message: string, ...data: any[]): void {
    this.log(LoggingLevel.WARN, message, ...data)
  }

  /**
   * Logs an error-level message to the logger
   * @param message The message to log
   * @param data Optionally, data to format the message with
   */
  public error (message: string, ...data: any[]): void {
    this.log(LoggingLevel.ERROR, message, ...data)
  }

  /**
   * Creates a new logger parented to this one with the same global.
   * @param prefix The logger's prefix
   * @returns The logger
   */
  public subLogger (prefix: string): Logger {
    let l = this.subLoggers.get(prefix)

    if (!l) {
      l = new Logger(
        this.packageName,
        this.prefix.length ? [ this.prefix, prefix ].join(':') : prefix,
        this,
        this.global
      )
      this.subLoggers.set(prefix, l)
    }

    return l
  }
}
