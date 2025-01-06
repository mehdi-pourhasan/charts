export interface quarterlyIncomeInterface {
  categories: string[]
  series: {
    name: string
    type: 'bar' //literal type
    stack: string
    data: number[]
  }[]
}
