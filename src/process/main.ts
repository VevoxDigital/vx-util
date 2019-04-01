import { ParsedArgs } from 'minimist'
import { Signal } from '../event/signal'

export abstract class Main {
  /**
   * *Signal*: The process recieved an interrupt
   */
  public readonly interrupt = new Signal()

  public constructor () {
    process.once('SIGINT', this.interrupt.callback)
  }

  /**
   * Main execution function for the process
   * @param args Arguments passed into the process when
   */
  public abstract main (args: ParsedArgs): Awaitable<void | boolean>
}
