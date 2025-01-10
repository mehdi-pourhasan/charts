import { TestBed } from '@angular/core/testing'
import { StackedOptionService } from './stacked-option.service'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

describe('StackedOptionService', () => {
  let service: StackedOptionService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(StackedOptionService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return chart options when been called', () => {
    const mockData: quarterlyIncomeInterface = {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        {
          name: 'Product A',
          data: [120, 130, 115, 140],
          type: 'bar',
          stack: '',
        },
        {
          name: 'Product B',
          data: [70, 80, 75, 85],
          type: 'bar',
          stack: '',
        },
      ],
    }

    const options = service.getChartOptions(mockData)

    expect(options).toBeTruthy()
  })

  it('should transform data correctly', () => {
    const mockData: quarterlyIncomeInterface = {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        {
          name: 'Product A',
          data: [120, 130, 115, 140],
          type: 'bar',
          stack: '',
        },
        {
          name: 'Product B',
          data: [70, 80, 75, 85],
          type: 'bar',
          stack: '',
        },
      ],
    }

    const transformedSeries = service['transformToSum'](mockData)
    expect(transformedSeries.length).toBe(2)
    expect(transformedSeries[0].name).toBe('Product A')
  })
})
