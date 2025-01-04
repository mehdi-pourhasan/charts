import { CarsInterface } from './cars.interface'

export interface FeedStateInterface {
  isLoading: boolean
  data: CarsInterface[] | null
}
