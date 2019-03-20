import * as debug from 'debug'
import { GlobalLogger, LoggingLevel } from './logger-global'

export class Logger {

    /** The parent to this logger */
    public readonly parent: Logger

    /** The global logger */
    public readonly global: GlobalLogger

    /** This logger's name */
    public readonly name: string

    /** This logger's fully-qualified prefix */
    public readonly prefix: string[]

    /** The logger's debugger */
    public readonly debugger: debug.IDebugger

    public readonly children = new Map<string, Logger>()

    public constructor (parent: Logger, name: string) {
        this.parent = parent
        this.name = name
        this.global = parent.global

        this.prefix = this.parent.prefix.concat(name)
        this.debugger = debug([ this.global.name, ...this.prefix ].join(':'))

        this.debug('init logger')
    }

    /**
     * This logger's level
     */
    public get level (): LoggingLevel {
        return this.global.level
    }

    /**
     * Gets a new child logger from this one
     * @param name The name of the child
     */
    public child (name: string, ...names: string[]): Logger {
        let l = this.children.get(name)
        if (!l) {
            l = new Logger(this, name)
            this.children.set(name, l)
        }
        return names.length ? l.child(names[0], ...names.slice(1)) : l
    }

    /**
     * Logs a message at the specified level
     * @param level The level to log at
     * @param message The message to log
     * @param data Any data to format the message with
     */
    public log (level: LoggingLevel, message: string, ...data: any[]): void {
        const msg = GlobalLogger.format(message, ...data)
        if (level === LoggingLevel.DEBUG) {
            this.debugger(message, ...data)
        } else this.global.write(level, this.prefix, msg)

        this.global.message.fire(level, this.prefix, msg)
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
}
