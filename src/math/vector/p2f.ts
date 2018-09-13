import * as debug from 'debug'

import { ICloneable } from '../../util/cloneable'
import { ISerializeable } from '../../util/serializeable'
import { OrderedPair } from '../ordered/pair'
import { VectorC2f } from './c2f'

const d = debug('vx-util:vector:polar2f')

/**
 * A 2D polar vector
 */
export class VectorP2f
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

    d('create %s (ratio %d)', this.toString(), this.ratio)
  }

  /** The angle of this vector */
  public get angle (): number {
    return this.a
  }

  /** The radius of this vector */
  public get radius (): number {
    return this.b
  }

  /**
   * Returns a new vector that is this vector scaled by the given scalar
   * @param scalar The scalar to scale by
   */
  public scale (scalar: number): VectorP2f {
    const v = new VectorP2f(this.angle, this.radius * scalar)
    d('%s * %d = %s', this.toString(), scalar, v.toString())
    return v
  }

  /**
   * Returns a new vector rotated by the given number of radians
   * @param angle The angle to rotate by
   */
  public rotate (angle: number): VectorP2f {
    const v = new VectorP2f(this.angle + angle, this.radius)
    d('%s -> %d = %s', this.toString(), angle, v.toString())
    return v
  }

  /**
   * Creates a new vector that shares the same direction but has a radius of one.
   */
  public unit (): VectorP2f {
    d('unit with angle %d', this.angle)
    return new VectorP2f(this.angle, 1)
  }

  /** Creates a new cartesian vector that represents this vector */
  public toCartesian (): VectorC2f {
    const v = new VectorC2f(this.radius * Math.cos(this.angle), this.radius * Math.sin(this.angle))
    d('convert cartesian %s', v.toString())
    return v
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
