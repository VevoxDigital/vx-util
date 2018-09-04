import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'
import OrderedPair from '../ordered/pair'
import { VectorC2f } from './c2f'

/**
 * A 2D polar vector
 */
export default class VectorP2f
extends OrderedPair<number>
implements ICloneable<VectorP2f>, ISerializeable<number> {
  /**
   * Creates a new zero-angle zero-magnitude polar vector
   */
  public static zero (): VectorP2f {
    return new VectorP2f(0, 0)
  }

  /**
   * Creates a new polar vector from the given number of degrees and radius
   * @param deg The number of degrees
   * @param magnitude The magnitude
   */
  public static fromDegrees (deg: number, magnitude: number = 1) {
    return new VectorP2f(Math.rad(deg), magnitude)
  }

  /** The ratio of PI of the number of radians (i.e. `2pi` would be `2`) */
  public readonly ratio: number

  /**
   * Creates a new polar vector from the given number of radians and radius
   * @param angle The number of radians
   * @param radius The magnitude
   */
  public constructor (angle: number, radius: number = 1) {
    super(angle, radius)
    this.ratio = angle / Math.PI
  }

  /** The angle of this vector */
  public get angle (): number {
    return this.a
  }

  /** The radius of this vector */
  public get radius (): number {
    return this.b
  }

  /** Creates a new cartesian vector that represents this vector */
  public toCartesian (): VectorC2f {
    return new VectorC2f(this.radius * Math.cos(this.angle), this.radius * Math.sin(this.angle))
  }

  public serialize (): IDictionary<number> {
    return {
      magnitude: this.radius,
      rads: this.angle
    }
  }

  public clone (): VectorP2f {
    return new VectorP2f(this.angle, this.radius)
  }
}
