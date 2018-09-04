import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'
import OrderedPair from '../ordered/pair'

/**
 * A floating-point vector 2 value
 */
export class Vector2f
extends OrderedPair<number>
implements ICloneable<Vector2f>, ISerializeable<number> {

  /** Creates a zero vector */
  public static zero (): Vector2f {
    return new Vector2f(0, 0)
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
  public add (vector: Vector2f): Vector2f {
    return new Vector2f(this.x + vector.x, this.y + vector.y)
  }

  /**
   * Returns a new vector that is this vector scaled by the given scalar
   * @param scalar The scalar to scale by
   */
  public scale (scalar: number): Vector2f {
    return new Vector2f(this.x * scalar, this.y * scalar)
  }

  /**
   * Returns a new vector that is the inverse of this one
   */
  public inverse (): Vector2f {
    return new Vector2f(-this.x, -this.y)
  }

  /**
   * Returns a new vector that is perpendicular to this one
   */
  public perpendicular (): Vector2f {
    return new Vector2f(this.y, -this.x)
  }

  /**
   * Creates a new vector that shares the same direction but has a magnitude of one.
   */
  public unit (): Vector2f {
    return this.clone().scale(1 / this.magnitude)
  }

  public clone (): Vector2f {
    return new Vector2f(this.x, this.y)
  }
}
