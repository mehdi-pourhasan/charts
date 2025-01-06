export interface ProfitOfRegionInterface {
  name: string
  itemStyle: { color: string }
  children?: ProfitOfRegionInterface[]
  value?: number //
}
