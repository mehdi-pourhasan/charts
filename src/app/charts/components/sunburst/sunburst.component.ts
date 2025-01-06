import { Component, OnInit, AfterViewInit, Input } from '@angular/core'
import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption } from 'echarts/components'
import { SunburstChart, SunburstSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { ProfitOfRegionInterface } from '../../types/profitOfRegionData.interface'
import { ProfitFilterService } from '../../services/profit-filter/profit-filter.service'

echarts.use([TitleComponent, SunburstChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | SunburstSeriesOption
>

@Component({
  selector: 'app-sunburst',
  standalone: true,
  imports: [],
  template: `
    <div id="sunburst-chart" style="height: 80rem;"></div>
  `,
  // styles: [
  //   `
  //     :host {
  //       margin: 0 auto;
  //       display: block;
  //       width: 50%;
  //     }
  //     #sunburst-chart {
  //       height: 500px;
  //       margin: 5rem 0;
  //     }
  //   `,
  // ],
})
export class SunburstComponent implements AfterViewInit {
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
      title: {
        text: 'Profitability of each region and vendors',
        textStyle: { fontSize: 20, align: 'center' },
      },
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
