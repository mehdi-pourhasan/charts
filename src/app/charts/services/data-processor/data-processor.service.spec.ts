import { TestBed } from '@angular/core/testing'

import { BodyTypeCarsProcessorService } from './data-processor.service'

describe('BodyTypeCarsProcessorService', () => {
  let service: BodyTypeCarsProcessorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BodyTypeCarsProcessorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
