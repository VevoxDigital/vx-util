
/**
 * An error raised when the maximum number of event listeners are reached
 */
export default class MaxEventListenersReachedError extends Error {
  constructor (max: number) {
    super (`Maximum number of event emitters allowed reached, no more than ${max} allowed`)
    this.name = this.constructor.name
  }
}
