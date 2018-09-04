
/**
 * A object that can be cloned
 */
export interface ICloneable<T> {
  /**
   * Clones this object, creating a practically identical but entirely different object
   */
  clone (): T
}
