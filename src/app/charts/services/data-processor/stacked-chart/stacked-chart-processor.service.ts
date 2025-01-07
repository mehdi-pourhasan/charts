import { Injectable } from '@angular/core'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { quarterlyIncomeInterface } from '../../../types/quarterlyincomeData.interface'
import { ChartDataProcessorInterface } from '../../../types/chartsDataProcessor.interface'

@Injectable({
  providedIn: 'root',
})
export class StackedChartDataProcessorService
  implements ChartDataProcessorInterface
{
  // STACKED CHART COMPONENT DATA
  processData(cars: CarsInterface[]): quarterlyIncomeInterface {
    const periods: { [key: string]: { [style: string]: number } } = {}

    cars.forEach((car) => {
      // Use the Date string directly from the interface
      const date = new Date(car.Date)
      const year = date.getFullYear()
      const month = date.getMonth()
      const period = Math.floor(month / 3)
      const periodKey = `${year}-Q${period + 1}`

      const price = parseFloat(car['Price ($)'])

      if (!periods[periodKey]) {
        periods[periodKey] = {}
      }

      const style = car['Body Style']
      if (!periods[periodKey][style]) {
        periods[periodKey][style] = 0
      }

      periods[periodKey][style] += price
    })

    const categories = Object.keys(periods).sort()
    const bodyStyles = new Set(cars.map((car) => car['Body Style']))

    const series: quarterlyIncomeInterface['series'] = Array.from(
      bodyStyles
    ).map((style) => ({
      name: style,
      type: 'bar' as const,
      stack: 'total',
      data: categories.map((cat) => periods[cat][style] || 0),
    }))

    return {
      categories,
      series,
    }
  }
}
