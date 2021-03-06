export interface CaseBlock<A, B> extends Readonly<{
  case: A
  do: () => B
}> {}

function matchesScrutinee<A, B> (scrutinee: A, caseBlock: CaseBlock<A, B>): boolean {
  return JSON.stringify(caseBlock.case) === JSON.stringify(scrutinee)
}

export function patternMatch<A, B> (scrutinee: A, cases: ReadonlyArray<CaseBlock<A, B>>, defaultBlock: () => B): B {
  for (const currentCase of cases) {
    if (matchesScrutinee(scrutinee, currentCase)) return currentCase.do()
  }
  return defaultBlock()
}
