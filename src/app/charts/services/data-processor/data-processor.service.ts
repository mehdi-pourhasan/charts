import { Injectable } from '@angular/core'
import { LineChartDataProcessorService } from './line-chart/line-chart-processor.service'
import { PieChartDataProcessorService } from './pie-chart/pie-chart-processor.service'
import { SunBurstChartDataProcessorService } from './sunBurst-chart/sun-burst-chart-processor.service'
import { StackedChartDataProcessorService } from './stacked-chart/stacked-chart-processor.service'
import { CarsInterface } from '../../../shared/types/cars.interface'
import { CarTypeInterface } from '../../types/carTypeData.interface'
import { SalesData } from '../../types/salesData.interface'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

@Injectable({
  providedIn: 'root',
})
export class DataProcessorService {
  constructor(
    private lineChartSrv: LineChartDataProcessorService,
    private pieChartSrv: PieChartDataProcessorService,
    private sunBurstChartSrv: SunBurstChartDataProcessorService,
    private StackedChartSrv: StackedChartDataProcessorService
  ) {}

  public pieChartCars(cars: CarsInterface[]): CarTypeInterface {
    return this.pieChartSrv.processData(cars)
  }

  public lineChartCars(
    cars: CarsInterface[],
    timeFrame: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  ): SalesData {
    return this.lineChartSrv.processData(cars, timeFrame)
  }

  public sunBurstChartCars(cars: CarsInterface[]): ProfitOfRegionInterface[] {
    return this.sunBurstChartSrv.processData(cars)
  }

  public stackedChartCars(cars: CarsInterface[]): quarterlyIncomeInterface {
    return this.StackedChartSrv.processData(cars)
  }
}
