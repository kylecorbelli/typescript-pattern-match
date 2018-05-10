# TypeScript Pattern Match

[![CircleCI](https://circleci.com/gh/kylecorbelli/typescript-pattern-match.svg?style=shield)](https://circleci.com/gh/kylecorbelli/typescript-pattern-match)

[![codecov](https://codecov.io/gh/kylecorbelli/typescript-pattern-match/branch/master/graph/badge.svg)](https://codecov.io/gh/kylecorbelli/typescript-pattern-match)

## What is This?
A type-safe way to pattern match on more than just a single value. Think pattern matching on tuples.

## Installation
In your terminal:
```
$ npm install --save typescript-pattern-match
```

In your TypeScript files:
```TypeScript
import { patternMatch } from 'typescript-pattern-match'
```

## API
Think of it like a more powerful `switch` statement.
```
patternMatch<A, B> :: (scrutinee: A, cases: ReadonlyArray<CaseBlock<A, B>>, defaultBlock: () => B): B
```
The `scrutinee` is the value you’re trying to match against. The `cases` are similar to the list of `case` statements in a standard `switch` block and are passed in as an array to `patternMatch`. Each case block must have a `.case` value and a `.do` function. `patternMatch` will invoke and return the return value of the `.do` function associated with the first `.case` value to match the `scrutinee`. There is no fallthrough.

The third and final argument passed to `patternMatch` is a function whose return value is the default value returned if none of the `cases` match the `scrutinee`.

## Example Usage
We can now match on type-safe tuples!
```TypeScript
patternMatch([ true, 'noob noob' ], [
  {
    case: [ true, 'MPB' ],
    do: () => 'oooo weee!',
  },
  {
    case: [ false, 'noob noob' ],
    do: () => 'this guy gets it',
  },
  {
    case: [ true, 'noob noob' ],
    do: () => {
      console.log('you can perform calculations or do whatever here')
      return 'this is the matched case'
    },
  },
], () => {
  return 'the default'
})
```
