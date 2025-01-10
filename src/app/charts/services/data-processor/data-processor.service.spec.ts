import { TestBed } from '@angular/core/testing'
import { DataProcessorService } from './data-processor.service'
import { LineChartDataProcessorService } from './line-chart/line-chart-processor.service'
import { PieChartDataProcessorService } from './pie-chart/pie-chart-processor.service'
import { SunBurstChartDataProcessorService } from './sunBurst-chart/sun-burst-chart-processor.service'
import { StackedChartDataProcessorService } from './stacked-chart/stacked-chart-processor.service'
import { CarsInterface } from '../../../shared/types/cars.interface'
import { CarTypeInterface } from '../../types/carTypeData.interface'
import { SalesData } from '../../types/salesData.interface'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

describe('DataProcessorService', () => {
  let service: DataProcessorService
  let lineChartSrv: jasmine.SpyObj<LineChartDataProcessorService>
  let pieChartSrv: jasmine.SpyObj<PieChartDataProcessorService>
  let sunBurstChartSrv: jasmine.SpyObj<SunBurstChartDataProcessorService>
  let stackedChartSrv: jasmine.SpyObj<StackedChartDataProcessorService>

  beforeEach(() => {
    lineChartSrv = jasmine.createSpyObj('LineChartDataProcessorService', [
      'processData',
    ])
    pieChartSrv = jasmine.createSpyObj('PieChartDataProcessorService', [
      'processData',
    ])
    sunBurstChartSrv = jasmine.createSpyObj(
      'SunBurstChartDataProcessorService',
      ['processData']
    )
    stackedChartSrv = jasmine.createSpyObj('StackedChartDataProcessorService', [
      'processData',
    ])

    TestBed.configureTestingModule({
      providers: [
        DataProcessorService,
        { provide: LineChartDataProcessorService, useValue: lineChartSrv },
        { provide: PieChartDataProcessorService, useValue: pieChartSrv },
        {
          provide: SunBurstChartDataProcessorService,
          useValue: sunBurstChartSrv,
        },
        {
          provide: StackedChartDataProcessorService,
          useValue: stackedChartSrv,
        },
      ],
    })

    service = TestBed.inject(DataProcessorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should process pie chart data', () => {
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
    ]
    const expectedResult: CarTypeInterface = { 'Model A': 1 }

    pieChartSrv.processData.and.returnValue(expectedResult)

    const result = service.pieChartCars(cars)

    expect(result).toEqual(expectedResult)
    expect(pieChartSrv.processData).toHaveBeenCalledWith(cars)
  })

  it('should process line chart data', () => {
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
    ]
    const expectedResult: SalesData = { '2025-01-01': { 'Model A': 1 } }
    const timeFrame:
      | 'weekly'
      | 'monthly'
      | 'quarterly'
      | 'semiannual'
      | 'annual' = 'monthly'

    lineChartSrv.processData.and.returnValue(expectedResult)

    const result = service.lineChartCars(cars, timeFrame)

    expect(result).toEqual(expectedResult)
    expect(lineChartSrv.processData).toHaveBeenCalledWith(cars, timeFrame)
  })

  it('should process sunburst chart data', () => {
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
    ]
    const expectedResult: ProfitOfRegionInterface[] = [
      { name: 'North', itemStyle: { color: '#FF0000' } },
    ]

    sunBurstChartSrv.processData.and.returnValue(expectedResult)

    const result = service.sunBurstChartCars(cars)

    expect(result).toEqual(expectedResult)
    expect(sunBurstChartSrv.processData).toHaveBeenCalledWith(cars)
  })

  it('should process stacked chart data', () => {
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
    ]
    const expectedResult: quarterlyIncomeInterface = {
      categories: ['Q1'],
      series: [{ name: 'Sales', type: 'bar', stack: 'total', data: [10000] }],
    }

    stackedChartSrv.processData.and.returnValue(expectedResult)

    const result = service.stackedChartCars(cars)

    expect(result).toEqual(expectedResult)
    expect(stackedChartSrv.processData).toHaveBeenCalledWith(cars)
  })
})
