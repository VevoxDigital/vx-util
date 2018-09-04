import * as debug from 'debug'

import { ICloneable } from 'util/cloneable'
import { ISerializeable } from 'util/serializeable'
import { OrderedPair } from '../ordered/pair'
import { VectorP2f } from './p2f'

const d = debug('vx-util:vector:cartesian2f')

/**
 * A floating-point vector 2 value
 */
export class VectorC2f
extends OrderedPair<number>
implements ICloneable<VectorC2f>, ISerializeable<number> {

  /** Creates a zero vector */
  public static zero (): VectorC2f {
    return new VectorC2f(0, 0)
  }

  /** The magnitude of this vector, to as much precision as JS allows */
  public readonly magnitude: number

  /**
   * Creates a new Vector2 value from zero the given X and Y values
   * @param x The x value
   * @param y The y value
   */
  public constructor (x: number, y: number) {
    super (x, y)
    this.magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    d('gen magnitude %d from %s', this.magnitude, this.toString())
  }

  /** The X value */
  public get x () {
    return this.a
  }

  /** The Y value */
  public get y () {
    return this.b
  }

  /**
   * Returns a new vector that is the sum of this vector and the given one
   * @param vector The vector to add
   */
  public add (vector: VectorC2f): VectorC2f {
    const v = new VectorC2f(this.x + vector.x, this.y + vector.y)
    d('%s + %s = %s', this.toString(), vector.toString(), v.toString())
    return v
  }

  /**
   * Returns a new vector that is this vector scaled by the given scalar
   * @param scalar The scalar to scale by
   */
  public scale (scalar: number): VectorC2f {
    const v = new VectorC2f(this.x * scalar, this.y * scalar)
    d('%s * %d = %s', this.toString(), scalar, v.toString())
    return v
  }

  /**
   * Returns a new vector that is the inverse of this one
   */
  public inverse (): VectorC2f {
    d('next scale invert', this.toString())
    return this.scale(-1)
  }

  /**
   * Returns a new vector that is perpendicular to this one
   */
  public perpendicular (): VectorC2f {
    const v = new VectorC2f(this.y, -this.x)
    d('create %s perpen. to %s', v.toString(), this.toString())
    return v
  }

  /**
   * Creates a new vector that shares the same direction but has a magnitude of one.
   */
  public unit (): VectorC2f {
    d('next scale unit')
    return this.clone().scale(1 / this.magnitude)
  }

  /**
   * Creates a new vector in polar form with the same direction and magnitude
   * as this one
   */
  public toPolar (): VectorP2f {
    const r = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    let t = Math.atan(this.y / this.x)
    d('calculated polar (%d,%d) as is', r, t)

    if (this.x > 0 && this.y < 0) {
      t += Math.PI_2
      d('polar is quadrant IV, angle updated to %d', t)
    } else if (this.x < 0) {
      t += Math.PI
      d('polar is quadrant II or III, angle updated to %d', t)
    }

    return new VectorP2f(t, r)
  }

  public clone (): VectorC2f {
    d('clone %s', this.toString())
    return new VectorC2f(this.x, this.y)
  }

  public serialize (): IDictionary<number> {
    d('serialize %s', this.toString())
    return {
      x: this.x,
      y: this.y
    }
  }
}
