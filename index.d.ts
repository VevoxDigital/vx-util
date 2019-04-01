
/** A mapping of string keys to possible values of type `T` */
declare interface IDictionary<T = any> {
  [key: string]: Optional<T>
}

/** A mapping of string keys to a type `T` */
declare type Dictionary<T = any> = { [key: string]: T }

/** A mapping of numeric keys to a specific value type */
declare interface IArrayMap<T = any> {
  [key: number]: Optional<T>
}

/** A mapping of both string and numeric keys to a given value type */
declare type IPlainObject<S = any, N = S> = IDictionary<S> & IArrayMap<N>

/**
 * A function acting as a listener for a variable number of arguments
 * @deprecated
 */
declare type CallbackFunction<R = void> = Functional.Operator<any[], R>

/** A type that can either be something or undefined */
declare type Optional<T> = T | undefined

/** Removes `undefined` from a given type */
declare type Certain<T> = Exclude<T, undefined>

/** A type that can either be something or null */
declare type Nullable<T> = T | null

/** A type that can either be something, null, or undefined */
declare type Nilable<T> = T | null | undefined

/** A type that could be a promise or its base value */
declare type Awaitable<T> = T | Promise<T>

/** A type that is optionally a partial of another type */
declare type Overrides<T> = Optional<Partial<T>>

/** All fields in `U` removed from `T` */
declare type ExcludeFields<T, U extends keyof T> = { [K in Exclude<keyof T, U>]: T[K] }

/** Only fields in `U` from `T` */
declare type ExtractFields<T, U extends keyof T> = { [K in Extract<keyof T, U>]: T[K] }

/** `T`, but with all fields `U` marked required (and others untouched) */
declare type RequiredFields<T, U extends keyof T> = T & ExtractFields<Required<T>, U>

/** An object who extends `T`, where keys `U` are required and others are optional */
declare type Options<T, U extends keyof T = never> = RequiredFields<Partial<T>, U>

/** An object that can be instanced (i.e. new'ed) into a given type, accepting the given arguments to do so */
declare interface Instanciable<T, A extends any[] = []> extends Function {
  new(...args: A): T // tslint:disable-line callable-types
}

/** A type with private/protected members stripped */
declare type AsInterface<T> = {
    [P in keyof T]: T[P]
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

  /** A functional type that creates values from no input */
  export type Producer<V> = Operator<[], V>

  /** A functional type that consumes data and returns a void value */
  export type Consumer<T extends any[]> = Operator<T>

  /** A functional type that returns a boolean from input */
  export type Predicate<T extends any[]> = Operator<T, boolean>

  /** A functional that *can* a given input and *can* process it to an output */
  export type Operator<T extends any[] = [], V = void> = (...args: T) => V
}

declare namespace FunctionalAsync {
  // generic async functinals

  /** An async functional type that creates values from no input */
  export type Producer<V> = Operator<[], V>

  /** An async functional type that consumes data and returns a void value */
  export type Consumer<T extends any[]> = Operator<T>

  /** An async functional type that returns a boolean from input */
  export type Predicate<T extends any[]> = Operator<T, boolean>

  /** An async functional that *can* a given input and *can* process it to an output */
  export type Operator<T extends any[] = [], V = void> = Functional.Operator<T, Promise<V>>
}

declare namespace JSON {
  /** Valid value types for JSON */
  export type Value = string | number | boolean | null | ValueArray | ValueDictionary

  /** An array of JSON values */
  export interface ValueArray extends Array<Value> { }

  /** A dictionary of JSON values */
  export interface ValueDictionary extends IDictionary<Value> { }
}

declare interface JSON {
  parse (text: string): JSON.Value
}

/** The `package.json` file for yarn/npm */
declare namespace PackageJSON {
  export interface IPackage extends JSON.ValueDictionary {

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

  export interface IPackageAuthor extends JSON.ValueDictionary {
    /** The author's name */
    name: string

    /** The author's primary contact email */
    email?: string

    /** The author's homepage URL */
    homepage?: string
  }

  export interface IPackageBugs extends JSON.ValueDictionary {
    /** An email to send bugs to */
    email: string

    /** The URL to report bugs to */
    url: string
  }

  /** The location of certain package directories */
  export interface IPackageDirectories extends JSON.ValueDictionary {
    lib?: string
    bin?: string
    man?: string
    doc?: string
    example?: string
  }

  /** The engines this package is designed for */
  export interface IPackageEngines extends JSON.ValueDictionary {
    node?: string
    npm?: string
  }

  /** The configuration data managed by NPM */
  export interface IPackageConfig extends JSON.ValueDictionary {
    /** The NPM namespace for the config command */
    name?: string

    /** The configuration data */
    config?: IDictionary
  }

  /** The publishing configuration this package */
  export interface IPackagePublishConfig extends JSON.ValueDictionary {
    registry?: string
  }

  /** A project repository */
  export interface IPackageRepository extends JSON.ValueDictionary {
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
