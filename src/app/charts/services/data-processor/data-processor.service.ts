import { Injectable } from '@angular/core'
import { SalesData } from '../../types/salesData.interface'
import { CarTypeInterface } from '../../types/carTypeData.interface'
import { CarsInterface } from './../../../shared/types/cars.interface'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

@Injectable({
  providedIn: 'root',
})
export class CarsProcessorService {
  // PIE CHART COMPONENT DATA
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

  // LINE CHART COMPONENT DATA
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

  // SUNBURST CHART COMPONENT DATA
  public sunBurstChartCars(cars: CarsInterface[]): ProfitOfRegionInterface[] {
    const groupedData: any = {}
    cars.forEach((row: any) => {
      const region = row['Dealer_Region']
      const dealer = row['Dealer_Name']
      const profit = parseFloat(row['Price ($)']) // Assume price is profit for simplicity

      if (!groupedData[region]) {
        groupedData[region] = {}
      }
      if (!groupedData[region][dealer]) {
        groupedData[region][dealer] = 0
      }
      groupedData[region][dealer] += profit
    })

    return this.formatForSunBurstChart(groupedData)
  }

  private formatForSunBurstChart(data: any): ProfitOfRegionInterface[] {
    return Object.entries(data).map(([region, dealers]: any) => {
      const regionColor = this.generateRandomColor() // Generate one color for the region
      return {
        name: region,
        itemStyle: { color: regionColor },
        children: Object.entries(dealers).map(([dealer, totalProfit]: any) => ({
          name: dealer,
          value: totalProfit,
          itemStyle: { color: regionColor }, // Apply the same color to children
        })),
      }
    })
  }

  private generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  // STACKED CHART COMPONENT DATA
  public stackedChartCars(cars: CarsInterface[]): quarterlyIncomeInterface {
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
