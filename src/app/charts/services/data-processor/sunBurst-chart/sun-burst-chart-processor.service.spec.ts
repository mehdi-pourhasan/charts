import { TestBed } from '@angular/core/testing'
import { SunBurstChartDataProcessorService } from './sun-burst-chart-processor.service'
import { GenerateRandomColorService } from '../../../../shared/services/random-color/random-color.service'
import { CarsInterface } from '../../../../shared/types/cars.interface'

describe('SunBurstChartDataProcessorService', () => {
  let service: SunBurstChartDataProcessorService
  let randomColorService: jasmine.SpyObj<GenerateRandomColorService>

  beforeEach(() => {
    randomColorService = jasmine.createSpyObj('GenerateRandomColorService', [
      'generateRandomColor',
    ])

    TestBed.configureTestingModule({
      providers: [
        SunBurstChartDataProcessorService,
        { provide: GenerateRandomColorService, useValue: randomColorService },
      ],
    })

    service = TestBed.inject(SunBurstChartDataProcessorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should process data correctly', () => {
    const cars: CarsInterface[] = [
      {
        Car_id: '1',
        Date: '2025-01-01',
        'Customer Name': 'John Doe',
        Gender: 'Male',
        'Annual Income': '50000',
        Dealer_Name: 'Dealer A',
        Company: 'Car Company A',
        Model: 'Model A',
        Engine: 'V6',
        Transmission: 'Automatic',
        Color: 'Red',
        'Price ($)': '10000',
        'Dealer_No ': '001',
        'Body Style': 'Sedan',
        Dealer_Region: 'North',
      },
      {
        Car_id: '2',
        Date: '2025-01-02',
        'Customer Name': 'Jane Smith',
        Gender: 'Female',
        'Annual Income': '60000',
        Dealer_Name: 'Dealer B',
        Company: 'Car Company B',
        Model: 'Model B',
        Engine: 'V8',
        Transmission: 'Manual',
        Color: 'Blue',
        'Price ($)': '15000',
        'Dealer_No ': '002',
        'Body Style': 'SUV',
        Dealer_Region: 'North',
      },
      {
        Car_id: '3',
        Date: '2025-01-03',
        'Customer Name': 'Alice Johnson',
        Gender: 'Female',
        'Annual Income': '70000',
        Dealer_Name: 'Dealer A',
        Company: 'Car Company A',
        Model: 'Model C',
        Engine: 'I4',
        Transmission: 'Automatic',
        Color: 'Green',
        'Price ($)': '20000',
        'Dealer_No ': '001',
        'Body Style': 'Hatchback',
        Dealer_Region: 'South',
      },
      {
        Car_id: '4',
        Date: '2025-01-04',
        'Customer Name': 'Bob Brown',
        Gender: 'Male',
        'Annual Income': '80000',
        Dealer_Name: 'Dealer A',
        Company: 'Car Company A',
        Model: 'Model D',
        Engine: 'V6',
        Transmission: 'Automatic',
        Color: 'Black',
        'Price ($)': '5000',
        'Dealer_No ': '001',
        'Body Style': 'Coupe',
        Dealer_Region: 'North',
      },
    ]
    randomColorService.generateRandomColor.and.returnValue('#FF0000')

    const result = service.processData(cars)

    expect(result).toEqual([
      {
        name: 'North',
        itemStyle: { color: '#FF0000' },
        children: [
          { name: 'Dealer A', value: 15000, itemStyle: { color: '#FF0000' } },
          { name: 'Dealer B', value: 15000, itemStyle: { color: '#FF0000' } },
        ],
      },
      {
        name: 'South',
        itemStyle: { color: '#FF0000' },
        children: [
          { name: 'Dealer A', value: 20000, itemStyle: { color: '#FF0000' } },
        ],
      },
    ])
  })

  it('should group data by region and dealer', () => {
    const cars = [
      { Dealer_Region: 'North', Dealer_Name: 'Dealer A', 'Price ($)': '10000' },
      { Dealer_Region: 'North', Dealer_Name: 'Dealer A', 'Price ($)': '5000' },
      { Dealer_Region: 'South', Dealer_Name: 'Dealer B', 'Price ($)': '20000' },
    ]

    const groupedData = (service as any).groupDataByRegionAndDealer(cars)

    expect(groupedData).toEqual({
      North: { 'Dealer A': 15000 },
      South: { 'Dealer B': 20000 },
    })
  })

  it('should format data for sunburst chart', () => {
    const groupedData = {
      North: { 'Dealer A': 15000, 'Dealer B': 20000 },
      South: { 'Dealer C': 10000 },
    }

    randomColorService.generateRandomColor.and.returnValue('#00FF00') // Mocking color generation

    const formattedData = (service as any).formatForSunBurstChart(groupedData)

    expect(formattedData).toEqual([
      {
        name: 'North',
        itemStyle: { color: '#00FF00' },
        children: [
          { name: 'Dealer A', value: 15000, itemStyle: { color: '#00FF00' } },
          { name: 'Dealer B', value: 20000, itemStyle: { color: '#00FF00' } },
        ],
      },
      {
        name: 'South',
        itemStyle: { color: '#00FF00' },
        children: [
          { name: 'Dealer C', value: 10000, itemStyle: { color: '#00FF00' } },
        ],
      },
    ])
  })
})
