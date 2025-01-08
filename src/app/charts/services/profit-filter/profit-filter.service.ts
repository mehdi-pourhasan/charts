import { Injectable } from '@angular/core'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'

@Injectable({
  providedIn: 'root',
})
export class ProfitFilterService {
  filterTopVendors(
    data: ProfitOfRegionInterface[],
    topN: number
  ): ProfitOfRegionInterface[] {
    return data.map((region) => ({
      ...region,
      children: region.children
        ?.sort((a, b) => (b.value as number) - (a.value as number)) // Sort by profit
        .slice(0, topN), // Select N upper seller
    }))
  }
}
