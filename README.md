
# vx-util
### Core Utility library for Vevox TypeScript/JavaScript projects

[![NPM](https://img.shields.io/npm/v/vx-util.svg?style=for-the-badge)](https://npmjs.org/vx-util)
[![License](https://img.shields.io/npm/l/vx-util.svg?style=for-the-badge)](LICENSE)
[![Lab](https://img.shields.io/static/v1.svg?style=for-the-badge&label=lab&message=open-source&color=informational)](https://lab.vevox.io/oepn-source/vx-util)

*Please Submit any issues [in the Vevox Lab](https://lab.vevox.io/open-source/vx-util).*

## Docs
***TODO***

## Changelog

##### 0.10.0
`+` New `Nullable` type  
`+` New `Nilable` type  
`+` New `IPlainObject` type  
`+` New `Overrides` type  
`+` New `IArrayMap` interface  
`+` New `NOOP` global constant: a no-op function  
`*` `IDictionary` interface now has `Optional` values  
`*` Rename `OptionalPromise` to `Awaitable`  
`*` Update `CallbackFunction` type to use `Functional` types  

##### 0.9.1
`*` Correct bad import in `event\event`  

#### 0.9.0
`+` New `Instanciable` generic type  
`+` New `OptionalPromise` generic type  
`+` New `Event` and `EventHandler` classes  

##### 0.8.7
`*` Fix another series of issues with the minifier

##### 0.8.6
`*` Use `BigInt` constructor instead of literals to stop the minifier from breaking things

##### 0.8.5
`*` Correct issue when constructing `Random` objects with no initial value

##### 0.8.4
`*` Disable interop on module conversion  
`*` Correct main field extension again

##### 0.8.3
`*` Use `babel` to transpile to CommonJS for Node's sake

##### 0.8.2
`*` Correct invalid import for `ICloneable` in `Ordered`  
`*` Fix a missing dev depenency for compile

##### 0.8.1
`*` Main package field now has the correct extension

#### 0.8.0
`+` New generic `Ordered` class  
`+` New `ComparableMap` class re-implementing the ECMAScript map methods  
`+` New `ISealable` interface  
`*` `OrderedPair` and `OrderedTriple` are now `Ordered` subclasses  
`*` Refractor `Ordered*` classes from `math` to `lib/ordered`  
`*` Target `esnext` with TypeScript  
`*` `Random` now uses `BigInt` internally, can still yield `number` values  
`*` Rename `IComparable.equal` to `IComparable.equals`  
`*` Output `.mjs` over `.js` for Node's sake  
`-` Remove old `io` and `TupleKey` classes

#### 0.7.0
`+` Actually started keeping a changelog  
`+` New `Optional` type  
`+` New `Functional` types  
`+` New `IComparable` interface  
`*` Updated index exports to be more open  
`*` The `typescript` package is now *actually* a dependency
