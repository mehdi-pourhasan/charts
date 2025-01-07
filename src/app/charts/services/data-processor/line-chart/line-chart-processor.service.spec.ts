import { TestBed } from '@angular/core/testing';

import { LineChartProcessorService } from './line-chart-processor.service';

describe('LineChartProcessorService', () => {
  let service: LineChartProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineChartProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
