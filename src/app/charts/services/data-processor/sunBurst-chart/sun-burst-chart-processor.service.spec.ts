import { TestBed } from '@angular/core/testing';

import { SunBurstChartProcessorService } from './sun-burst-chart-processor.service';

describe('SunBurstChartProcessorService', () => {
  let service: SunBurstChartProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunBurstChartProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
