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

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NzTabsModule,
    PieComponent,
    LineComponent,
    SunburstComponent,
    StackedComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit {
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    feed: this.store.select(selectFeedData),
  })

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.fetchFeed())

    this.data$.subscribe(({ isLoading, feed }) => {
      if (!isLoading) {
        console.log('DATA FETCHED FROM STORE =>>   ', feed)
      }
    })
  }
}
