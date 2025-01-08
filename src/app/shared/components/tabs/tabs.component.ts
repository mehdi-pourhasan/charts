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
import { TimeframeFilterComponent } from '../timeframe-filter/timeframe-filter.component'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { ModalService } from '../../services/modal/modal.service'
import { ModalComponent } from '../modal/modal.component'
import { selectBackgroundColor, selectTheme } from '../../store/theme/reducer'
import { themeSettingsActions } from '../../store/theme/action'

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NzButtonModule,
    NzTabsModule,
    PieComponent,
    LineComponent,
    SunburstComponent,
    CommonModule,
    LoadingComponent,
    StackedComponent,
    CommonModule,
    TimeframeFilterComponent,
    ModalComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit {
  public data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    feed: this.store.select(selectFeedData),
    background: this.store.select(selectBackgroundColor),
    theme: this.store.select(selectTheme),
  })
  public selectedTimeframe:
    | 'weekly'
    | 'monthly'
    | 'quarterly'
    | 'semiannual'
    | 'annual' = 'monthly'

  protected PieChartData!: CarTypeInterface
  protected lineChartData!: SalesData
  protected sunBurstChartData!: ProfitOfRegionInterface[]
  protected stackedChartData!: quarterlyIncomeInterface

  constructor(
    private store: Store,
    private dataProcessorSrv: DataProcessorService,
    private modalSrv: ModalService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.fetchFeed())
    this.store.dispatch(themeSettingsActions.fetchThemeSettings())

    this.data$.subscribe(({ isLoading, feed }) => {
      if (!isLoading && feed) {
        this.PieChartData = this.dataProcessorSrv.pieChartCars(feed)
        this.lineChartData = this.dataProcessorSrv.lineChartCars(
          feed,
          this.selectedTimeframe
        )
        this.sunBurstChartData = this.dataProcessorSrv.sunBurstChartCars(feed)
        this.stackedChartData = this.dataProcessorSrv.stackedChartCars(feed)
      }
    })
  }

  public onTimeframeChanged(
    timeframe: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  ): void {
    this.selectedTimeframe = timeframe
    this.data$.subscribe(({ feed }) => {
      if (feed) {
        this.lineChartData = this.dataProcessorSrv.lineChartCars(
          feed,
          this.selectedTimeframe
        )
      }
    })
  }

  public openModal() {
    this.modalSrv.openModal()
  }
}
