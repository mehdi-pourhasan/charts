import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TransformationService {
  transformData(carsType: { [key: string]: number }): any[] {
    return Object.entries(carsType).map(([key, value]) => ({
      name: key,
      value: value,
    }))
  }
}
