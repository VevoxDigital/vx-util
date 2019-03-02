
/** A mapping of string keys to a specific value type */
declare interface IDictionary<T = any> {
  [key: string]: T
}

/**
 * A function acting as a listener for a variable number of arguments
 */
declare type CallbackFunction<R = void> = (...args: any[]) => R

/** A type that can either be something or undefined */
declare type Optional<T> = T | undefined

/** A type that could be a promise or its base value */
declare type OptionalPromise<T> = T | Promise<T>

declare interface Instanciable<T, A extends any[] = any[]> extends Function {
  new(...args: A): T // tslint:disable-line callable-types
}

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

/** Functional types */
declare namespace Functional {
  // generic functionals
  /** A general function type */
  export type Function<T extends any[], V> = (...args: T) => V

  /** A functional type that creates values from no input */
  export type Producer<V> = Function<[], V>

  /** A functional type that consumes data and returns a void value */
  export type Consumer<T extends any[]> = Function<T, void>

  /** A functional type that returns a boolean from input */
  export type Predicate<T extends any[]> = Function<T, boolean>

  /** A functional type that takes no input and no output */
  export type Operator = Function<[], void>
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

declare interface Math {
  /** Double PI, a full rotation (e.g. 360 degrees) */
  PI_2: number

  /** Half PI, a quarter of a rotation (e.g. 90 degrees) */
  PI_HALF: number

  /** A quarter of PI, an eighth of a rotation (e.g. 45 degrees) */
  PI_QUARTER: number

  /** The number of degrees in a full rotation  */
  ROTATION_FULL: number

  /** The number of degrees in half a rotation */
  ROTATION_HALF: number

  /** The number of degrees in a quarter of a rotation */
  ROTATION_QUARTER: number

  /** The number of degrees in an eighth of a rotation */
  ROTATION_EIGHTH: number

  /**
   * Gets the number of radians for the given number of degrees
   * @param degrees The number of degrees to convert
   */
  rad (degrees: number): number

  /**
   * Gets the number of degrees for the given number of radians
   * @param radians The number of radians to convert
   */
  deg (radians: number): number
}

declare module '*/package.json' {
  const packageJson: PackageJSON.IPackage
  export = packageJson
}
