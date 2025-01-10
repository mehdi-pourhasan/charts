import { TestBed } from '@angular/core/testing'
import { PieChartDataProcessorService } from './pie-chart-processor.service'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { CarTypeInterface } from '../../../types/carTypeData.interface'

describe('PieChartDataProcessorService', () => {
  let service: PieChartDataProcessorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PieChartDataProcessorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should process car data correctly', () => {
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
        'Body Style': 'Sedan',
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

    const expectedResult: CarTypeInterface = {
      Sedan: 2,
      SUV: 1,
      Coupe: 1,
    }

    const result = service.processData(cars)

    expect(result).toEqual(expectedResult)
  })

  it('should handle empty car data', () => {
    const cars: CarsInterface[] = []

    const expectedResult: CarTypeInterface = {}

    const result = service.processData(cars)

    expect(result).toEqual(expectedResult)
  })

  it('should handle cars with the same body style', () => {
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
        'Body Style': 'Sedan',
        Dealer_Region: 'North',
      },
    ]

    const expectedResult: CarTypeInterface = {
      Sedan: 2,
    }

    const result = service.processData(cars)

    expect(result).toEqual(expectedResult)
  })
})
