import { TestBed } from '@angular/core/testing'

import { GenerateRandomColorService } from './random-color.service'

describe('RandomColorService', () => {
  let service: GenerateRandomColorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(GenerateRandomColorService)
  })

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy()
    })
  })

  describe('Generate color', () => {
    it('should generate different colors on each call', () => {
      const color1 = service.generateRandomColor()
      const color2 = service.generateRandomColor()
      expect(color1).not.toEqual(color2)
    })
  })
})
