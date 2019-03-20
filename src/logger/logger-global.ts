import * as debug from 'debug'
import { format } from 'util'
import * as winston from 'winston'
import { Signal } from '../event/signal'
import { Logger } from './logger'

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
 * The global top-most {@link Logger}
 */
export class GlobalLogger implements AsInterface<Logger> {

    /** The character used for the prefix */
    public static PREFIX_CHAR = ':'

    public static DEFAULT_TRANSPORTS = [
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
    ]

    /**
     * Initializes a new global logger with the default options
     * @param name The name of the logger
     */
    public static init (name: string | PackageJSON.IPackage): GlobalLogger {
        return new GlobalLogger(typeof name === 'string' ? name : name.name, { transports: this.DEFAULT_TRANSPORTS })
    }

    /**
     * Formats a message with the given data
     * @param message The message to format
     * @param data The data to format with
     */
    public static format (message: string, ...data: any[]): string {
        return format(message, ...data)
    }

    public readonly global = this
    public readonly parent = this
    public readonly name: string
    public readonly prefix: []

    /**
     * *Signal*: A message was emitted from this logger
     * @param level The level of emission
     * @param prefix The logging prefix
     * @param message The message sent
     */
    public readonly message = new Signal<[LoggingLevel, string[], string]>()

    public readonly log = Logger.prototype.log.bind(this)
    public readonly debug = Logger.prototype.debug.bind(this)
    public readonly silly = Logger.prototype.silly.bind(this)
    public readonly verb = Logger.prototype.verb.bind(this)
    public readonly info = Logger.prototype.info.bind(this)
    public readonly warn = Logger.prototype.warn.bind(this)
    public readonly error = Logger.prototype.error.bind(this)

    public readonly debugger: typeof Logger.prototype.debugger
    public readonly children: typeof Logger.prototype.children = new Map<string, Logger>()

    protected readonly _logger: winston.Logger

    private _level: LoggingLevel

    public constructor (name: string, options?: winston.LoggerOptions) {
        this.name = name
        this.prefix = []

        this.debugger = debug(name)
        this._logger = winston.createLogger(options)
        this._level = LoggingLevel.INFO

        this.debug('init global logger')
    }

    public get level (): LoggingLevel {
        return this._level
    }

    public set level (level: LoggingLevel) {
        this._level = level
        this._logger.transports[0].level = level
    }

    public child (name: string): Logger {
        return new Logger(this, name)
    }

    public getPrefix (): [] {
        return []
    }

    /**
     * Writes the given data out to the logger
     * @param level The level to write out at
     * @param prefix The prefix to write with
     * @param message The message to write
     * @param data Any data to format the message with
     */
    public write (level: LoggingLevel, prefix: string[], message: string): void {
        this._logger.log(level, GlobalLogger.format('[%s] ' + message, prefix.join(GlobalLogger.PREFIX_CHAR)))
    }
}
