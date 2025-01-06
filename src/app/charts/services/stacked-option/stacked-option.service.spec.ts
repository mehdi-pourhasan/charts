import { TestBed } from '@angular/core/testing';

import { StackedOptionService } from './stacked-option.service';

describe('StackedOptionService', () => {
  let service: StackedOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackedOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
