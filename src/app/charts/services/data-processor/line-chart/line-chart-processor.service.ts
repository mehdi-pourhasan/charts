import { Injectable } from '@angular/core'
import { ChartDataProcessorInterface } from '../../../types/chartsDataProcessor.interface'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { SalesData } from '../../../types/salesData.interface'

@Injectable({
  providedIn: 'root',
})
// TODO ImplementationdataProcessor interface below
export class LineChartDataProcessorService
  implements ChartDataProcessorInterface
{
  // LINE CHART COMPONENT DATA
  // Based on timeframes
  processData(
    cars: CarsInterface[],
    timeFrame: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  ): SalesData {
    const salesData: SalesData = {}

    const groupedByTimeFrame = (date: string): string => {
      const d = new Date(date)
      switch (timeFrame) {
        case 'weekly':
          // Start of year date
          const startOfYear = new Date(d.getFullYear(), 0, 1)
          // Calculate the number of weeks elapsed
          const weekNumber = Math.ceil(
            ((d.getTime() - startOfYear.getTime()) / 86400000 +
              startOfYear.getDay() +
              1) /
              7
          )
          // Pad week number with leading zero if less than 10
          const paddedWeek = weekNumber.toString().padStart(2, '0')
          return `${d.getFullYear()}-W${paddedWeek}`
        case 'monthly':
          return `${d.getFullYear()}-${d.getMonth() + 1}`
        case 'quarterly':
          const quater = Math.floor(d.getMonth() / 3) + 1
          return `${d.getFullYear()}-Q${quater}`
        case 'semiannual':
          const half = d.getMonth() < 6 ? 'H1' : 'H2'
          return `${d.getFullYear()}-${half}`
        case 'annual':
          return `${d.getFullYear()}`
        default:
          return date
      }
    }

    cars.forEach((entry) => {
      const dateGrouped = groupedByTimeFrame(entry.Date.split(' ')[0])
      const bodyStyle = entry['Body Style']

      if (!salesData[dateGrouped]) {
        salesData[dateGrouped] = {}
      }

      if (!salesData[dateGrouped][bodyStyle]) {
        salesData[dateGrouped][bodyStyle] = 0
      }

      salesData[dateGrouped][bodyStyle]++
    })

    return salesData
  }
}
