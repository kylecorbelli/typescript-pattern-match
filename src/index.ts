export interface CaseBlock<A, B> extends Readonly<{
  case: A
  do: () => B
}> {}

function matchesScrutinee<A, B> (scrutinee: A, caseBlock: CaseBlock<A, B>): boolean {
  return JSON.stringify(caseBlock.case) === JSON.stringify(scrutinee)
}

export function patternMatch<A, B> (scrutinee: A, cases: ReadonlyArray<CaseBlock<A, B>>, defaultBlock: () => B): B {
  for (let i = 0; i < cases.length; i++) {
    let currentCase: CaseBlock<A, B> = cases[i]
    if (matchesScrutinee(scrutinee, currentCase)) return currentCase.do()
  }
  return defaultBlock()
}
