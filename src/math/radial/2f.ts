import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'
import OrderedPair from '../ordered/pair'

/**
 * A 2D radial coordinate
 */
export default class Radial2f
extends OrderedPair<number>
implements ICloneable<Radial2f>, ISerializeable<number> {
  /**
   * Creates a new zero-angle zero-magnitude radial coordinate
   */
  public static zero (): Radial2f {
    return new Radial2f(0, 0)
  }

  /**
   * Creates a new radial coordinate from the given number of degrees and magnitude
   * @param deg The number of degrees
   * @param magnitude The magnitude
   */
  public static fromDegrees (deg: number, magnitude: number = 1) {
    return new Radial2f(Math.rad(deg), magnitude)
  }

  /**
   * Creates a new radial coordinate from the given number of radians and a magnitude
   * @param rads The number of radians
   * @param magnitude The magnitude
   */
  public constructor (rads: number, magnitude: number = 1) {
    super(rads, magnitude)
  }
}
