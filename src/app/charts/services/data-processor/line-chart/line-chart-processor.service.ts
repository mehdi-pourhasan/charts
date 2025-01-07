import { Injectable } from '@angular/core'
import { ChartDataProcessorInterface } from '../../../types/chartsDataProcessor.interface'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { SalesData } from '../../../types/salesData.interface'

@Injectable({
  providedIn: 'root',
})
export class LineChartDataProcessorService
  implements ChartDataProcessorInterface
{
  // LINE CHART COMPONENT DATA
  // برای شمارش فروش نوع خودرو براساس تاریخ مشخص
  processData(cars: CarsInterface[]): SalesData {
    const salesData: SalesData = {}

    cars.forEach((entry) => {
      const date = entry.Date.split(' ')[0] // استخراج تاریخ
      const bodyStyle = entry['Body Style']

      if (!salesData[date]) {
        salesData[date] = {}
      }

      if (!salesData[date][bodyStyle]) {
        salesData[date][bodyStyle] = 0
      }

      salesData[date][bodyStyle]++
    })

    return salesData
  }
}
