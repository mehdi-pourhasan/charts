import { TestBed } from '@angular/core/testing'
import { StackedChartDataProcessorService } from './stacked-chart-processor.service'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { quarterlyIncomeInterface } from '../../../types/quarterlyincomeData.interface'

describe('StackedChartDataProcessorService', () => {
  let service: StackedChartDataProcessorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(StackedChartDataProcessorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should process data correctly for quarterly income', () => {
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
        Date: '2025-02-15',
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
        Date: '2025-03-10',
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
        'Body Style': 'Sedan',
        Dealer_Region: 'South',
      },
      {
        Car_id: '4',
        Date: '2025-04-05',
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

    const expectedResult: quarterlyIncomeInterface = {
      categories: ['2025-Q1', '2025-Q2'],
      series: [
        {
          name: 'Sedan',
          type: 'bar',
          stack: 'total',
          data: [30000, 0], // Total for Q1 and Q2
        },
        {
          name: 'SUV',
          type: 'bar',
          stack: 'total',
          data: [15000, 0], // Total for Q1 and Q2
        },
        {
          name: 'Coupe',
          type: 'bar',
          stack: 'total',
          data: [0, 5000], // Total for Q1 and Q2
        },
      ],
    }

    const result = service.processData(cars)

    expect(result).toEqual(expectedResult)
  })

  it('should handle empty car data', () => {
    const cars: CarsInterface[] = []

    const expectedResult: quarterlyIncomeInterface = {
      categories: [],
      series: [],
    }

    const result = service.processData(cars)

    expect(result).toEqual(expectedResult)
  })

  it('should handle cars with no price', () => {
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
        'Price ($)': '0', // No price
        'Dealer_No ': '001',
        'Body Style': 'Sedan',
        Dealer_Region: 'North',
      },
    ]

    const expectedResult: quarterlyIncomeInterface = {
      categories: ['2025-Q1'],
      series: [
        {
          name: 'Sedan',
          type: 'bar',
          stack: 'total',
          data: [0], // Total for Q1
        },
      ],
    }

    const result = service.processData(cars)

    expect(result).toEqual(expectedResult)
  })
})
