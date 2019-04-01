
import * as minimist from 'minimist'
import { createInterface, Interface, ReadLineOptions } from 'readline'
import { ConnectionOptions, Signal, Slot } from '../event/signal'

export interface ICommandLineInterfaceOnceOptions {
  argv: string[]
  parsingOpts: minimist.Opts
  slotOpts: ConnectionOptions<[minimist.ParsedArgs]>
}

export class CommandLineInterface {

  /**
   * A one-shot helper implementation of the interface meant for packages with a "bin" file defined.
   * @param slot The slot to fire
   * @param opts Any options for firing
   */
  public static async once (slot: Slot<[minimist.ParsedArgs]>,
                            opts: Partial<ICommandLineInterfaceOnceOptions> = {}): Promise<boolean> {
    const cli = new CommandLineInterface(new Signal(), opts.parsingOpts)
    cli.command.connect(slot, opts.slotOpts)
    const res = await cli.exec((opts.argv || process.argv.slice(2)).join(' '))
    cli.close()
    return res
  }

  /**
   * *Signal*: A command was sent through this interface
   * @param command The command data sent
   */
  public readonly command = new Signal<[minimist.ParsedArgs]>()

  private readonly parsingOpts: Optional<minimist.Opts>
  private interruptCommand: Optional<string>
  private readers: Array<[ NodeJS.ReadableStream, Interface ]> = []

  public constructor (interrupt: Signal, parsingOpts: Optional<minimist.Opts>) {
    this.parsingOpts = parsingOpts
    interrupt.connect(() => {
      if (this.interruptCommand) this.exec(this.interruptCommand)
    })
  }

  /**
   * A command to emulate calling when the main process interrupts
   * @param command The command to call
   */
  public setInterruptCommand (command: Optional<string>): this {
    this.interruptCommand = command
    return this
  }

  /**
   * Executes a command
   * @param command The command to call
   */
  public async exec (command: string): Promise<boolean> {
    return this.command.fireAsync(minimist(command.split(' '), this.parsingOpts))
  }

  /**
   * Creates a readline interface on this CLI. If a reader already exists on an interface, that
   * is returned instead.
   * @param opts Options to pass into the reader
   */
  public createReader (options: Partial<ReadLineOptions>): Interface {
    const opts: ReadLineOptions = { input: process.stdin, ...options }
    for (const r of this.readers) if (r[0] === opts.input) return r[1]
    const rl = createInterface(opts)
    rl.on('line', line => {
      Promise.resolve()
        .then(async () => {
          await this.exec(line)
          rl.prompt()
        })
    })
    this.readers.push([ opts.input, rl ])
    rl.prompt()
    return rl
  }

  /**
   * Closes all handlers on this interface
   */
  public close (): void {
    this.readers.forEach(r => r[1].close())
  }
}
