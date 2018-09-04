
/// <reference path="../index.d.ts" />

import * as module_io from './io'
import * as module_util from './util'

export { default as EventEmitter } from './event'

export { Logger, LoggingLevel, createWistonLogger } from './logger'

export { default as ProcessMain } from './process'
export { default as ProcessMessage } from './process/message'
export { default as ProcessWrapper } from './process/wrapper'

export { OrderedPair } from './math/ordered/pair'
export { OrderedTriple } from './math/ordered/triple'
export { VectorC2f } from './math/vector/c2f'
export { VectorP2f } from './math/vector/p2f'

export { ICloneable } from './util/cloneable'
export { TupleKey } from './util/key'
export { ISerializeable } from './util/serializeable'

export { Random } from './random'

export const io = module_io
export const util = module_util

Math.PI_2 = Math.PI * 2
Math.PI_HALF = Math.PI / 2
Math.PI_QUARTER = Math.PI / 4

Math.ROTATION_FULL = 360
Math.ROTATION_HALF = 180
Math.ROTATION_QUARTER = 90
Math.ROTATION_EIGHTH = 45

Math.deg = (r: number): number => r * (Math.ROTATION_HALF / Math.PI)
Math.rad = (d: number): number => d * (Math.PI / Math.ROTATION_HALF)
