import { patternMatch } from '.'

describe('patternMatch', () => {
  describe('pattern matching on primatives', () => {
    const matchStringToNumber = (val: string): number =>
      patternMatch(
        val,
        [
          {
            case: 'one',
            do: () => 1,
          },
          {
            case: 'two',
            do: () => 2,
          },
        ],
        () => {
          return 712
        })
    
    it('matches provided cases', () => {
      expect(matchStringToNumber('one')).toBe(1)
      expect(matchStringToNumber('two')).toBe(2)
    })

    it('returns a default if no case matches', () => {
      expect(matchStringToNumber('some not found')).toBe(712)
    })
  })

  describe('pattern matching on tuples', () => {
    interface Person {
      name: string
    }

    const matchTupleToNumber = (tuple: [ boolean, number, string, Person ]): string =>
      patternMatch(tuple, [
        {
          case: [ true, 7, 'ooooh weee!', { name: 'MPB' } ],
          do: () => 'good friend',
        },
        {
          case: [ false, 4, 'wubalubadubdub', { name: 'Rick' } ],
          do: () => 'sanchez',
        },
      ], () => {
        return 'the default'
      })

    it('matches provided cases', () => {
      expect(matchTupleToNumber([ true, 7, 'ooooh weee!', { name: 'MPB' }  ])).toBe('good friend')
      expect(matchTupleToNumber([ false, 4, 'wubalubadubdub', { name: 'Rick' } ])).toBe('sanchez')
    })

    it('returns a default if no case matches', () => {
      expect(matchTupleToNumber([ true, 9, 'nope', { name: 'pencilvester' } ])).toBe('the default')
    })
  })
})
