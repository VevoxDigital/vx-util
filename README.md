
# vxUtil
**Core Utility library for Vevox TypeScript/JavaScript projects**

## Docs
***TODO***

## Changelog
#### 0.8.1
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
