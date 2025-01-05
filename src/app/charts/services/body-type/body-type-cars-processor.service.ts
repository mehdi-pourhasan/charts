import { Injectable } from '@angular/core'
import { CarsInterface } from '../../../shared/types/cars.interface'
import { SalesData } from '../../types/salesData.interface'
import { CarTypeInterface } from '../../types/carTypeData.interface'

@Injectable({
  providedIn: 'root',
})
export class BodyTypeCarsProcessorService {
  // برای شمارش نوع ماشین ها بر اساس شاسی
  public PieCharCars(cars: CarsInterface[]): CarTypeInterface {
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

  // برای شمارش فروش نوع خودرو براساس تاریخ مشخص
  public lineChartCars(cars: CarsInterface[]): SalesData {
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
