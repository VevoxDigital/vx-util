
/// <reference path="../index.d.ts" />

import * as module_io from './io'

export { default as EventEmitter } from './event'

export { Logger, LoggingLevel, createWistonLogger } from './logger'

export { default as ProcessMain } from './process'
export { default as ProcessMessage } from './process/message'
export { default as ProcessWrapper } from './process/wrapper'

export { TupleKey } from './util/key'

export { Random } from './random'
export const io = module_io

Math.PI_2 = Math.PI * 2
Math.PI_HALF = Math.PI / 2
Math.PI_QUARTER = Math.PI / 4

Math.ROTATION_FULL = 360
Math.ROTATION_HALF = 180
Math.ROTATION_QUARTER = 90
Math.ROTATION_EIGHTH = 45

Math.deg = (r: number): number => r * (Math.ROTATION_HALF / Math.PI)
Math.rad = (d: number): number => d * (Math.PI / Math.ROTATION_HALF)
