
import { Exception } from '../exception/exception'

/**
 * An {@link Exception} that is thrown when a signal slot raises an exception
 */
export class SignalSlotException extends Exception<[number]> {
  public constructor (index: number) {
    super('Signal Slot (at index: %d) threw when signal was fired', index)
  }
}
