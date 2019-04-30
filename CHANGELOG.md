# Beta Releases
### 0.16.3
`*` Update TypeScript to `3.4`, enable `esModuleInterop`

### 0.16.2
`+` New functions attached to the winston logger  

### 0.16.1
`*` Fix bad import in Signals  

## 0.16.0
`*` Big overhaul on project configuration files  
`*` Refactor and re-arrange a bunch of helper types  
`*` Refactor `Random` to `SeededRandom`, multiple functional changes  
`*` Overhaul `ComparableMap`, though functionally identical  
`*` Collapse utility interfaces (`ICloneable`, `IComparable`, `ISealable`, and `ISerializable`) into one file  
`*` Overhaul exceptions and add a bunch of new ones  
`-` Remove some unused extranious classes  
`-` Completely remove logging classes  
`-` Completely remove process classes  
`-` Completely remove math classes  

## 0.15.0
`+` New Async methods for `Signal`  
`+` New `Exception` class, plus some default exceptions  
`*` Bunch of updates for the `I18nManager` and `LanguageDictionary`  
`*` Refactor `CancellableSignal` to `PrefixedSignal`, make some behavioral changes to it  
`*` Update CHANGELOG format  

#### 0.14.2
`*` Add a public accessor for the global logger's internal logger  

#### 0.14.1
`+` Added some more docs to undocumented types  
`+` Added an optional `thisArg` option for `Signal`s  
`*` Adjust typings on `JSON` global interface and `PackageJSON.IPackage`  
`-` Remove `Functional.Function` in favor of `Functional.Operator`  

## 0.14.0
`*` Fall back to Node v10 and `es6`  
`*` `Random` now uses `number` again instead of `BigInt`  

## 0.13.0
`+` New `GlobalLogger`  
`+` Return of the `.editorconfig`  
`*` Overhaul `Logger` class  

## 0.12.0
`+` New `CancellableSignal` variant  
`+` New `Certain` type  
`*` Added signals to `ComparableMap`, `Random`, and `Logger`  
`*` Changes to `Ordered` to allow indexing (not type-safe yet)  
`*` Default a few functional types to empty arrays instead of `any[]`.

## 0.11.0
`+` New `Fields` and `Options` types  
`*` Refactor `Event` to `Signal` (and associated methods) for clarity reasons  
`*` Move `util` imports around  
`-` Deprecate `EventHandlerImpl` class (to be replaced later)  

#### 0.10.1
`*` Bump dependency versions for `lodash` vulnerability  
`-` Remove unused `cash-mv` dependency for `lodash` vulnerability  

## 0.10.0
`+` New `Nullable` type  
`+` New `Nilable` type  
`+` New `IPlainObject` type  
`+` New `Overrides` type  
`+` New `IArrayMap` interface  
`+` New `NOOP` global constant: a no-op function  
`*` `IDictionary` interface now has `Optional` values  
`*` Rename `OptionalPromise` to `Awaitable`  
`*` Update `CallbackFunction` type to use `Functional` types  

#### 0.9.1
`*` Correct bad import in `event\event`  

## 0.9.0
`+` New `Instanciable` generic type  
`+` New `OptionalPromise` generic type  
`+` New `Event` and `EventHandler` classes  

#### 0.8.7
`*` Fix another series of issues with the minifier  

#### 0.8.6
`*` Use `BigInt` constructor instead of literals to stop the minifier from breaking things  

#### 0.8.5
`*` Correct issue when constructing `Random` objects with no initial value  

#### 0.8.4
`*` Disable interop on module conversion  
`*` Correct main field extension again  

#### 0.8.3
`*` Use `babel` to transpile to CommonJS for Node's sake  

#### 0.8.2
`*` Correct invalid import for `ICloneable` in `Ordered`  
`*` Fix a missing dev depenency for compile  

#### 0.8.1
`*` Main package field now has the correct extension  

## 0.8.0
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

## 0.7.0
`+` Actually started keeping a changelog  
`+` New `Optional` type  
`+` New `Functional` types  
`+` New `IComparable` interface  
`*` Updated index exports to be more open  
`*` The `typescript` package is now *actually* a dependency  
