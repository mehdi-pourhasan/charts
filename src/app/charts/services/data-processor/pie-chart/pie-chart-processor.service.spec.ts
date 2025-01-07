import { TestBed } from '@angular/core/testing';

import { PieChartProcessorService } from './pie-chart-processor.service';

describe('PieChartProcessorService', () => {
  let service: PieChartProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieChartProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
