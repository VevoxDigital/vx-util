import { Exception } from 'exception'

/**
 * An exception raised when a signal is passed through
 */
export class SignalException extends Exception {
  public constructor (signal: NodeJS.Signals) {
    super(signal)
  }
}
