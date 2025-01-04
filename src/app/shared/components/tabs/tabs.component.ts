import { Component, OnInit } from '@angular/core'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { PieComponent } from '../../../charts/components/pie/pie.component'
import { LineComponent } from '../../../charts/components/line/line.component'
import { SunburstComponent } from '../../../charts/components/sunburst/sunburst.component'
import { StackedComponent } from '../../../charts/components/stacked/stacked.component'
import { BackendDataService } from '../../services/backend-data/backend-data.service'
import { CommonModule } from '@angular/common'

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
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit {
  data: any[] = []

  constructor(private backendService: BackendDataService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(): void {
    this.backendService.getData().subscribe({
      next: (response) => {
        this.data = response
      },
      error: (error) => {
        console.error('Error fetching data:', error)
      },
    })
  }
}
