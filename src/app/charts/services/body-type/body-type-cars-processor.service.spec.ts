import { TestBed } from '@angular/core/testing';

import { BodyTypeCarsProcessorService } from './body-type-cars-processor.service';

describe('BodyTypeCarsProcessorService', () => {
  let service: BodyTypeCarsProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyTypeCarsProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
