import minimist, { ParsedArgs } from 'minimist'
import { createInterface, Interface } from 'readline'

export type SimpleCommandHandler = (args: ParsedArgs) => void

export const SYMBOL_ROOT_COMMAND = Symbol('@root-command')

export interface ISimpleCommandHandlerMap extends Dictionary<SimpleCommandHandler[]> {
  [SYMBOL_ROOT_COMMAND]?: SimpleCommandHandler[]
}

/**
 * A simple, small, light-weight command-line interface wrapper
 */
export class SimpleCommandLineInterface {

  public static readonly ROOT_COMMAND: typeof SYMBOL_ROOT_COMMAND = SYMBOL_ROOT_COMMAND

  public static once (setup: (cli: SimpleCommandLineInterface) => Promise<void>,
                      argv: string[] = process.argv.slice(2)): void {
    const cli = new SimpleCommandLineInterface(createInterface({ input: process.stdin }))
    setup(cli).then(() => {
      cli.fire(minimist(argv))
    })
  }

  /** The `readline` interface associated with this CLI */
  public readonly interface: Interface

  private readonly commands: ISimpleCommandHandlerMap = { }

  public constructor (intf: Interface) {
    this.interface = intf
  }

  /**
   * Fires the handlers with the given args
   * @param args The args
   */
  public fire (args: ParsedArgs): void {
    const cmd = args[0] || SYMBOL_ROOT_COMMAND
    const handlers = this.commands[cmd as string]
    if (handlers) handlers.forEach(h => h(args))
  }

  /**
   * Attaches a handler to this CLI
   * @param command The command(s) to attach to
   * @param handler The handler to attach
   */
  public handle (command: string | string[], handler: SimpleCommandHandler): void {
    if (!Array.isArray(command)) command = [ command ]

    const names = command.length ? command : [ SYMBOL_ROOT_COMMAND ]
    for (const name of names) {
      const k = name as string
      this.commands[k] = this.commands[k] || []
      this.commands[k]!.push(handler)
    }
  }

  /**
   * Closes this interface, which closes the underlying interface below it
   */
  public close (): void {
    this.interface.close()
  }
}
