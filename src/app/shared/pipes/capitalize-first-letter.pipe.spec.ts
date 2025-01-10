import { pipe } from 'rxjs'
import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe'

describe('CapitalizeFirstLetterPipe', () => {
  describe('Pipe', () => {
    it('create an instance', () => {
      const pipe = new CapitalizeFirstLetterPipe()
      expect(pipe).toBeTruthy()
    })
  })

  describe('Capitalize', () => {
    it('should capitalize the first letter of a word', () => {
      const pipe = new CapitalizeFirstLetterPipe()
      const result = pipe.transform('hello')
      expect(result).toBe('Hello')
    })
  })
})
