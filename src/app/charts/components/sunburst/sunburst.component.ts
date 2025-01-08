import { Component, OnInit, AfterViewInit, Input } from '@angular/core'
import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption } from 'echarts/components'
import { SunburstChart, SunburstSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'
import { ProfitFilterService } from '../../services/profit-filter/profit-filter.service'
import { EditableTitleDirective } from '../../directives/editable-title/editable-title.directive'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

echarts.use([TitleComponent, SunburstChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | SunburstSeriesOption
>

@Component({
  selector: 'app-sunburst',
  standalone: true,
  imports: [
    EditableTitleDirective,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    CommonModule,
  ],
  template: `
    <div class="chart-container">
      <h1
        appEditableTitle
        [initialTitle]="chartTitle"
        [initialFontSize]="charTitleFontSize"
      >
        Click to Edit
      </h1>
      <div id="sunburst-chart" style="height: 80rem;"></div>

      <nz-input-group
        *ngIf="selectedSeries"
        nzSize="large"
        [nzSuffix]="suffixButton"
        style="margin-top: 10px;"
      >
        <input nz-input [(ngModel)]="newColor" placeholder="Enter new color" />
      </nz-input-group>
      <ng-template #suffixButton>
        <button nz-button nzType="primary" (click)="updateSeriesColor()">
          Apply
        </button>
      </ng-template>
    </div>
  `,
})
export class SunburstComponent implements AfterViewInit {
  public chartTitle: string =
    'Profitability of different regions and sellers in each region'
  public charTitleFontSize: number = 24
  public selectedSeries: any = null
  public newColor: string = ''

  @Input() public sunBurstData!: ProfitOfRegionInterface[]

  private myChart: any

  constructor(private profitFilterSrv: ProfitFilterService) {}

  ngAfterViewInit(): void {
    this.initSunburstChart()
  }

  private initSunburstChart(): void {
    const chartDom = document.getElementById('sunburst-chart')
    this.myChart = echarts.init(chartDom)

    const filteredData = this.profitFilterSrv.filterTopVendors(
      this.sunBurstData,
      4
    )

    const option: EChartsOption = {
      series: [
        {
          type: 'sunburst',
          data: filteredData,
          radius: [0, '90%'],
          label: {
            rotate: 'radial',
          },
          emphasis: {
            focus: 'ancestor',
          },
        },
      ],
    }

    this.myChart.setOption(option)
    this.myChart.on('click', (params: any) => {
      this.selectedSeries = params.data
    })
  }

  updateSeriesColor(): void {
    if (this.myChart && this.selectedSeries) {
      this.selectedSeries.itemStyle = {
        color: this.newColor,
      }
      const filteredData = this.profitFilterSrv.filterTopVendors(
        this.sunBurstData,
        4
      )

      this.myChart.setOption({
        series: [
          {
            type: 'sunburst',
            data: filteredData,
          },
        ],
      })
      console.log('1 Selected series:', this.selectedSeries)
      console.log('1 New color:', this.newColor)

      this.selectedSeries = null

      this.newColor = ''

      console.log('2 Selected series:', this.selectedSeries)
      console.log('2 New color:', this.newColor)
    } else {
      console.error('Chart or selected series is undefined')
    }
  }
}
