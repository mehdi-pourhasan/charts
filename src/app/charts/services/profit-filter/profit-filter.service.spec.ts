import { TestBed } from '@angular/core/testing'
import { ProfitFilterService } from './profit-filter.service'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'

describe('ProfitFilterService', () => {
  let service: ProfitFilterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProfitFilterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should filter and sort top vendors correctly', () => {
    const mockData: ProfitOfRegionInterface[] = [
      {
        name: 'Region A',
        itemStyle: { color: '#ff0000' },
        children: [
          {
            name: 'Vendor 1',
            value: 100,
            itemStyle: {
              color: '',
            },
          },
          {
            name: 'Vendor 2',
            value: 200,
            itemStyle: {
              color: '',
            },
          },
          {
            name: 'Vendor 3',
            value: 50,
            itemStyle: {
              color: '',
            },
          },
        ],
      },
      {
        name: 'Region B',
        itemStyle: { color: '#00ff00' },
        children: [
          {
            name: 'Vendor 4',
            value: 300,
            itemStyle: {
              color: '',
            },
          },
          {
            name: 'Vendor 5',
            value: 150,
            itemStyle: {
              color: '',
            },
          },
          {
            name: 'Vendor 6',
            value: 250,
            itemStyle: {
              color: '',
            },
          },
        ],
      },
    ]

    const topN = 2
    const result = service.filterTopVendors(mockData, topN)

    expect(result[0].children?.length).toBe(topN)
    expect(result[0].children?.[0].name).toBe('Vendor 2')
    expect(result[0].children?.[1].name).toBe('Vendor 1')

    expect(result[1].children?.length).toBe(topN)
    expect(result[1].children?.[0].name).toBe('Vendor 4')
    expect(result[1].children?.[1].name).toBe('Vendor 6')
  })
})
