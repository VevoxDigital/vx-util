
/**
 * An object that can be serialized to JSON
 */
export interface ISerializeable<T = any> {
  /**
   * Serializes this object to JSON
   */
  serialize (): IDictionary<T>
}
