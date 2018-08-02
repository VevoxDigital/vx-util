
/** A mapping of string keys to a specific value type */
declare interface IDictionary<T = any> {
  [key: string]: T
}

/**
 * A function acting as a listener for a variable number of arguments
 */
declare type CallbackFunction<R = void> = (...args: any[]) => R

/**
 * A specialized type-safe event emitter
 * @param E A map of event data to any value
 * @param K The key element type
 */
declare interface IEventEmitter<E extends IDictionary, K = keyof E> {
  /**
   * Attaches a listener to the given event
   * @param event The event o attach to
   * @param listener The listener function to use
   * @returns A symbol used to unregister the listener
   */
  on (event: K | symbol, listener: CallbackFunction): symbol

  /**
   * Attaches a listener to every event
   * @param listener The listener to use
   * @returns A symbol used to unregister the listener
   */
  onAny (listener: (event: K | symbol, ...args: any[]) => void): symbol

  /**
   * Attaches a listener to the given event, then removes it after it has been fired once
   * @param event The event o attach to
   * @param listener The listener function to use
   * @returns A symbol used to unregister the listener
   */
  once (event: K | symbol, listener: CallbackFunction): symbol

  /**
   * Unhooks an event listener from this emitter
   * @param symbol The listener symbol to unhook
   * @returns This emitter
   */
  off (listener: symbol): this

  /**
   * Unhooks all listeners from this emitter
   * @returns This emitter
   */
  offAll (): this

  /**
   * Emits data on a given event
   * @param event The event to emit on
   * @param args The args to emit
   * @returns This emitter
   */
  emit (event: K, ...args: any[]): this

  /**
   * Sets a maximum number of listeners per event, optionally only for a specific event
   * @param max The maximum number of listeners (0 for unlimited)
   * @param event Optionally, override for a specific event
   */
  setMax (max: number, event?: K | symbol): void

  /**
   * Gets the maximum number of listeners for this emitter, or, if specified, for a given event
   * @param event The event to check
   * @returns The max, or 0 if no maximum is set
   */
  getMax (event?: K | symbol): number

  /**
   * Gets a list of registered events
   * @returns The list of events
   */
  events (): ReadonlyArray<K | symbol>
}

/** The level to log a message at */
declare type ConsoleLoggingLevel = 'error' | 'warning' | 'info'

/** A logging method that accepts a logging level */
declare type LoggingMethod<L> = (level: L, message: string, ...data: any[]) => void

/** A logging method that has a pre-assigned logging level */
declare type LoggingLevelMethod = (message: string, ...data: any[]) => void

/**
 * A generic logging interface
 */
declare interface ILogger<L = ConsoleLoggingLevel> {
  /** The top-most global logger for this chain. */
  global: ILogger<L>

  /** The parent to this logger */
  parent: ILogger<L>

  /**
   * Logs a message at the given level
   * @param level The level to log at
   * @param message The message
   * @param data Any data to format into the message
   */
  log: LoggingMethod<L>

  /**
   * Creates a sublogger parented to this logger
   * @param prefix The logger's prefix
   * @returns The new logger
   */
  createSubLogger (...prefix: string[]): ILogger<L>
}

/** The `package.json` file for yarn/npm */
declare namespace PackageJSON {
  export interface IPackage {
    [index: string]: any

    /** The package's internal name */
    readonly name: string

    /** The semver-compatable version of the package */
    readonly version: string

    /** A non-localized description of the package */
    readonly description?: string

    /** The non-localized product name of this pacakge */
    readonly productName?: string

    /** Any package keysworks for NPM search */
    readonly keywords?: string[]

    /** The package's homepage, if it has one */
    readonly homepage?: string

    /** A tracker to report bugs too */
    readonly bugs?: string | PackageJSON.IPackageBugs

    /** The license that this package is available under */
    readonly license?: string

    /** The author of the package */
    readonly author?: string | PackageJSON.IPackageAuthor

    /** Any additional contributors to the package */
    readonly contributors?: string[] | PackageJSON.IPackageAuthor[]

    /** An array of files to include in publishing */
    readonly files?: string[]

    /** The main execution script for the package */
    readonly main?: string

    /** Any binary commands available to the package */
    readonly bin?: string | IDictionary<string>

    /** Documentation for this pacakage */
    readonly man?: string | string[]

    /** The location of certain package directories */
    readonly directories?: PackageJSON.IPackageDirectories

    /** The version control repository for this package */
    readonly repository?: string | IPackageRepository

    /** The scripts for the package */
    readonly scripts?: IDictionary<string>

    /** The package's configuration data */
    readonly config?: PackageJSON.IPackageConfig

    /** A mapping of the package dependencies to their versions */
    readonly dependencies?: IDictionary<string>

    /** A mapping of the package development-only dependencies to their versions */
    readonly devDependencies?: IDictionary<string>

    /** A mapping of the package peer dependencies to their versions */
    readonly peerDependencies?: IDictionary<string>

    /** A mapping of the package optional dependencies to their versions */
    readonly optionalDependencies?: IDictionary<string>

    /** An array of dependencies that come bundled */
    readonly bundledDependencies?: string[]

    /** The engines this package runs on */
    readonly engines?: PackageJSON.IPackageEngines

    /** The list of OSes this package runs on */
    readonly os?: string[]

    /** THe list of CPU architectures this pacakge runs on */
    readonly cpu?: string[]

    /** Whether or not this package prefers a global install */
    readonly preferGlobal?: boolean

    /** Whether or not this pacakge is private */
    readonly private?: boolean

    /** Speciallized configuration for publishing */
    readonly publishConfig?: PackageJSON.IPackagePublishConfig

    /** Any yarn workspaces for this package */
    readonly workspaces?: string[]
  }

  export interface IPackageAuthor {
    /** The author's name */
    name: string

    /** The author's primary contact email */
    email?: string

    /** The author's homepage URL */
    homepage?: string
  }

  export interface IPackageBugs {
    /** An email to send bugs to */
    email: string

    /** The URL to report bugs to */
    url: string
  }

  /** The location of certain package directories */
  export interface IPackageDirectories {
    lib?: string
    bin?: string
    man?: string
    doc?: string
    example?: string
  }

  /** The engines this package is designed for */
  export interface IPackageEngines {
    node?: string
    npm?: string
  }

  /** The configuration data managed by NPM */
  export interface IPackageConfig {
    /** The NPM namespace for the config command */
    name?: string

    /** The configuration data */
    config?: IDictionary
  }

  /** The publishing configuration this package */
  export interface IPackagePublishConfig {
    registry?: string
  }

  /** A project repository */
  export interface IPackageRepository {
    /** The type of repository */
    type: string

    /** The URL of the repository */
    url: string
  }
}

declare module '*/package.json' {
  const packageJson: PackageJSON.IPackage
  export = packageJson
}
