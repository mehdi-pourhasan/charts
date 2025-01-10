import { Injectable } from '@angular/core'
import { ChartDataProcessorInterface } from '../../../types/chartsDataProcessor.interface'
import { CarsInterface } from '../../../../shared/types/cars.interface'
import { ProfitOfRegionInterface } from '../../../types/profitOfRegionData.interface'
import { GenerateRandomColorService } from '../../../../shared/services/random-color/random-color.service'

@Injectable({
  providedIn: 'root',
})
export class SunBurstChartDataProcessorService
  implements ChartDataProcessorInterface
{
  public constructor(
    private readonly randomColorSrv: GenerateRandomColorService
  ) {}

  // SUNBURST CHART COMPONENT DATA
  processData(cars: CarsInterface[]): ProfitOfRegionInterface[] {
    const groupedData: any = this.groupDataByRegionAndDealer(cars)
    return this.formatForSunBurstChart(groupedData)
  }

  private groupDataByRegionAndDealer(cars: CarsInterface[]): any {
    const groupedData: any = {}
    cars.forEach((row: any) => {
      const region = row['Dealer_Region']
      const dealer = row['Dealer_Name']
      const profit = parseFloat(row['Price ($)'])

      if (!groupedData[region]) {
        groupedData[region] = {}
      }
      if (!groupedData[region][dealer]) {
        groupedData[region][dealer] = 0
      }
      groupedData[region][dealer] += profit
    })

    return groupedData
  }

  private formatForSunBurstChart(data: any): ProfitOfRegionInterface[] {
    return Object.entries(data).map(([region, dealers]: any) => {
      // SAME COLOR FOR PARENT AND CHILDREN
      const regionColor = this.randomColorSrv.generateRandomColor()
      return {
        name: region,
        itemStyle: { color: regionColor },
        children: Object.entries(dealers).map(([dealer, totalProfit]: any) => ({
          name: dealer,
          value: totalProfit,
          itemStyle: { color: regionColor },
        })),
      }
    })
  }
}
