import { TestBed } from '@angular/core/testing';

import { ProfitFilterService } from './profit-filter.service';

describe('ProfitFilterService', () => {
  let service: ProfitFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
