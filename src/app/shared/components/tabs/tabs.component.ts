import { Component, OnInit } from '@angular/core'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { PieComponent } from '../../../charts/components/pie/pie.component'
import { LineComponent } from '../../../charts/components/line/line.component'
import { SunburstComponent } from '../../../charts/components/sunburst/sunburst.component'
import { StackedComponent } from '../../../charts/components/stacked/stacked.component'
import { CommonModule } from '@angular/common'
import { combineLatest } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectFeedData, selectIsLoading } from '../../../charts/store/reducer'
import { feedActions } from '../../../charts/store/action'
import { LoadingComponent } from '../loading/loading.component'
import { DataProcessorService } from '../../../charts/services/data-processor/data-processor.service'
import { SalesData } from '../../../charts/types/salesData.interface'
import { CarTypeInterface } from '../../../charts/types/carTypeData.interface'
import { ProfitOfRegionInterface } from '../../../charts/types/profitOfRegionData.interface'
import { quarterlyIncomeInterface } from '../../../charts/types/quarterlyincomeData.interface'

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NzTabsModule,
    PieComponent,
    LineComponent,
    SunburstComponent,
    CommonModule,
    LoadingComponent,
    StackedComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit {
  // Fetch data from store
  public data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    feed: this.store.select(selectFeedData),
  })

  // filtered data for each component
  protected PieChartData!: CarTypeInterface
  protected lineChartData!: SalesData
  protected sunBurstChartData!: ProfitOfRegionInterface[]
  protected stackedChartData!: quarterlyIncomeInterface

  constructor(
    private store: Store,
    private dataProcessorSrv: DataProcessorService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.fetchFeed())

    this.data$.subscribe(({ isLoading, feed }) => {
      if (!isLoading && feed) {
        console.log('DATA FETCHED FROM STORE =>>   ', feed)
        this.PieChartData = this.dataProcessorSrv.pieChartCars(feed)

        this.lineChartData = this.dataProcessorSrv.lineChartCars(feed)
        this.sunBurstChartData = this.dataProcessorSrv.sunBurstChartCars(feed)
        this.stackedChartData = this.dataProcessorSrv.stackedChartCars(feed)
        // console.log('STACKED DATA ==>>>>   ', this.stackedChartData)
      }
    })
  }
}
