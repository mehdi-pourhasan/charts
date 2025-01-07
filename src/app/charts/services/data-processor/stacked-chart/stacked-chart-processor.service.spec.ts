import { TestBed } from '@angular/core/testing';

import { StackedChartProcessorService } from './stacked-chart-processor.service';

describe('StackedChartProcessorService', () => {
  let service: StackedChartProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackedChartProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
