
import EventEmitterImpl from '../event'
import ProcessMessage from './message'

export enum Events {
  READY = 'READY',
  MESSAGE = 'MESSAGE',
  EXIT = 'EXIT'
}

export interface IProcessMainEvents extends IEventEmitter<typeof Events> {
  on (event: Events.MESSAGE, listener: (msg: ProcessMessage) => void): symbol
  once (event: Events.READY | Events.EXIT, listener: () => void): symbol

  emit (event: Events.READY | Events.EXIT): this
  emit (event: Events.MESSAGE, msg: ProcessMessage): this
}

/**
 * The main process for a module
 * @author Matthew Struble <matt@vevox.io>
 */
export default class ProcessMain<A = any> extends EventEmitterImpl<typeof Events> implements IProcessMainEvents {
  public static readonly Events = Events

  /** The `package.json` for this module */
  public readonly pkg: PackageJSON.IPackage

  /** The command-line arguments given to this module on start */
  public readonly args: A

  /** The module's current working directory */
  public readonly cwd: string

  public constructor (pkg: PackageJSON.IPackage, args: A, cwd: string) {
    super()

    this.pkg = pkg
    this.args = args
    this.cwd = cwd
  }

  /**
   * Starts this module's process
   */
  public async start (): Promise<void> {
    await this.onStart()
    this.emit(Events.READY)
  }

  /**
   * Stops this module's process
   */
  public async stop (): Promise<void> {
    await this.onStop()
    this.emit(Events.EXIT)
  }

  protected async onStart (): Promise<void> {
    /* no-op */
  }

  protected async onStop (): Promise<void> {
    /* no-op */
  }
}
