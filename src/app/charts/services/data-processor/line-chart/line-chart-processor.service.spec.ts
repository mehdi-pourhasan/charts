import { TestBed } from '@angular/core/testing'
import { LineChartDataProcessorService } from './line-chart-processor.service'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { SalesData } from '../../../types/salesData.interface'

describe('LineChartDataProcessorService', () => {
  let service: LineChartDataProcessorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LineChartDataProcessorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should process data correctly for weekly timeframe', () => {
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
        Date: '2025-01-03',
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
        Date: '2025-01-08',
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
    ]

    const expectedResult: SalesData = {
      '2025-W01': { Sedan: 1, SUV: 1 },
      '2025-W02': { Sedan: 1 },
    }

    const result = service.processData(cars, 'weekly')

    expect(result).toEqual(expectedResult)
  })

  it('should process data correctly for monthly timeframe', () => {
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
        Date: '2025-01-15',
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
        Date: '2025-02-01',
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
    ]

    const expectedResult: SalesData = {
      '2025-1': { Sedan: 1, SUV: 1 },
      '2025-2': { Sedan: 1 },
    }

    const result = service.processData(cars, 'monthly')

    expect(result).toEqual(expectedResult)
  })

  it('should process data correctly for quarterly timeframe', () => {
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
        Date: '2025-04-15',
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
        Date: '2025-05-01',
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
    ]

    const expectedResult: SalesData = {
      '2025-Q1': { Sedan: 1 },
      '2025-Q2': { SUV: 1, Sedan: 1 },
    }

    const result = service.processData(cars, 'quarterly')

    expect(result).toEqual(expectedResult)
  })

  it('should process data correctly for semiannual timeframe', () => {
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
        Date: '2025-07-15',
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
    ]

    const expectedResult: SalesData = {
      '2025-H1': { Sedan: 1 },
      '2025-H2': { SUV: 1 },
    }

    const result = service.processData(cars, 'semiannual')

    expect(result).toEqual(expectedResult)
  })
})
