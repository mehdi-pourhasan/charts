import { TestBed } from '@angular/core/testing'

import { BodyTypeTransformService } from './transform.service'

describe('BodyTypeTransformService', () => {
  let service: BodyTypeTransformService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BodyTypeTransformService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
