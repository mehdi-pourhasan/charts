import { Component, OnInit, AfterViewInit, Input } from '@angular/core'
import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption } from 'echarts/components'
import { SunburstChart, SunburstSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'
import { ProfitFilterService } from '../../services/profit-filter/profit-filter.service'
import { EditableTitleDirective } from '../../directives/editable-title/editable-title.directive'

echarts.use([TitleComponent, SunburstChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | SunburstSeriesOption
>

@Component({
  selector: 'app-sunburst',
  standalone: true,
  imports: [EditableTitleDirective],
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
    </div>
  `,
})
export class SunburstComponent implements AfterViewInit {
  public chartTitle: string =
    'Profitability of different regions and sellers in each region'
  public charTitleFontSize: number = 24
  @Input() public sunBurstData!: ProfitOfRegionInterface[]

  constructor(private profitFilterSrv: ProfitFilterService) {}

  ngAfterViewInit(): void {
    this.initSunburstChart()
    console.log(this.sunBurstData)
  }

  private initSunburstChart(): void {
    const chartDom = document.getElementById('sunburst-chart')
    const myChart = echarts.init(chartDom)

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
        },
      ],
    }

    myChart.setOption(option)
  }
}
