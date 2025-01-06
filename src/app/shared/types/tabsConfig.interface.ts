import { Type } from '@angular/core'

export interface TabsConfigInterface {
  title: string
  component: Type<any>
  data: () => any
}
