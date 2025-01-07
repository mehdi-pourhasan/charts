import { CarsInterface } from '../../shared/types/cars.interface'

export interface ChartDataProcessorInterface {
  processData(
    cars: CarsInterface[],
    timeFrame?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  ): any
}
