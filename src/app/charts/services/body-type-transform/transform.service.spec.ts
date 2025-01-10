import { TestBed } from '@angular/core/testing'
import { TransformationService } from './transform.service'

describe('TransformationService', () => {
  let service: TransformationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TransformationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should transform data correctly', () => {
    const input = {
      Sedan: 10,
      SUV: 5,
      Coupe: 3,
    }

    const expectedOutput = [
      { name: 'Sedan', value: 10 },
      { name: 'SUV', value: 5 },
      { name: 'Coupe', value: 3 },
    ]

    const result = service.transformData(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should return an empty array for empty input', () => {
    const input = {}

    const expectedOutput: jasmine.Expected<jasmine.ArrayLike<any>> = []

    const result = service.transformData(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should handle input with a single entry', () => {
    const input = {
      Sedan: 1,
    }

    const expectedOutput = [{ name: 'Sedan', value: 1 }]

    const result = service.transformData(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should handle input with multiple entries with zero values', () => {
    const input = {
      Sedan: 0,
      SUV: 0,
      Coupe: 0,
    }

    const expectedOutput = [
      { name: 'Sedan', value: 0 },
      { name: 'SUV', value: 0 },
      { name: 'Coupe', value: 0 },
    ]

    const result = service.transformData(input)

    expect(result).toEqual(expectedOutput)
  })
})
