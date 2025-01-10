import { Injectable } from '@angular/core'
import { ChartDataProcessorInterface } from '../../../types/chartsDataProcessor.interface'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { CarTypeInterface } from '../../../types/carTypeData.interface'

@Injectable({
  providedIn: 'root',
})
export class PieChartDataProcessorService
  implements ChartDataProcessorInterface
{
  // PIE CHART COMPONENT DATA
  processData(cars: CarsInterface[]): CarTypeInterface {
    const bodyTypeCarsCount: CarTypeInterface = {}

    cars.forEach((entry) => {
      const bodyType = entry['Body Style']
      if (!bodyTypeCarsCount[bodyType]) {
        bodyTypeCarsCount[bodyType] = 0
      }
      bodyTypeCarsCount[bodyType]++
    })

    return bodyTypeCarsCount
  }
}

// cars => car => if not item based on body type creates and declare value as 0 else if there is one => countedCars + 1
