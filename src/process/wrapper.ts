
import * as assert from 'assert'

import EventEmitterImpl from '../event'
import ProcessMain from './'

export enum Events {
  IMPORTED = 'IMPORTED',
  CONSTRUCTED = 'CONSTRUCTED',
  READY = 'READY',
  MESSAGE = 'MESSAGE',
  EXIT = 'EXIT',
  ERROR = 'ERROR'
}

export default class ProcessWrapper<A = any> extends EventEmitterImpl<typeof Events> {
  public static readonly Events = Events

  /** The script URL (relative to the working directory) to invoke */
  public readonly script: string

  /** The `package.json` for this module */
  public readonly pkg: PackageJSON.IPackage

  /** The command-line arguments given to this module on start */
  public readonly args: A

  /** The module's current working directory */
  public readonly cwd: string

  private main: ProcessMain | undefined

  public constructor (script: string, pkg: PackageJSON.IPackage, args: A, cwd: string = process.cwd()) {
    super()

    this.pkg = pkg
    this.args = args
    this.cwd = cwd
    this.script = script
  }

  public init (): ProcessMain<A> {
    const rawScript = require(this.script)
    this.emit(Events.IMPORTED, rawScript)

    assert(rawScript && rawScript.default, `Given script does not provide an export named 'default'.`)
    const { default: pClass } = rawScript
    assert(pClass === ProcessMain || pClass.prototype instanceof ProcessMain,
      'The default export must be a ProcessMain instance')

    const ProcessClass = pClass as (typeof ProcessMain)
    this.main = new ProcessClass<A>(this.pkg, this.args, this.cwd)

    this.emit(Events.CONSTRUCTED, this.main)
    return this.main
  }

  public start (): void {
    if (!this.main) throw new Error('Process not yet initialized')

    this.main.start()
      .then(() => this.emit(Events.READY))
      .catch(err => this.emit(Events.ERROR, err))
  }
}
