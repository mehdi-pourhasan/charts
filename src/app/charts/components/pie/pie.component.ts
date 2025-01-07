import { Component, ElementRef, Input, OnInit } from '@angular/core'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { TransformationService } from '../../services/body-type-transform/transform.service'
import { CarTypeInterface } from '../../types/carTypeData.interface'
import { EditableTitleDirective } from '../../directives/editable-title/editable-title.directive'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])

@Component({
  selector: 'app-pie',
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
      <div id="pie-chart" style="width: 100%; height: 60rem; "></div>
    </div>
  `,
})
export class PieComponent implements OnInit {
  public chartTitle: string = 'Sales trends of different car models'
  public charTitleFontSize: number = 24
  @Input() public pieData!: CarTypeInterface

  constructor(
    private el: ElementRef,
    private transformSrv: TransformationService
  ) {}

  ngOnInit(): void {
    this.pieChartInit()
  }

  private pieChartInit(): void {
    const chartDom = this.el.nativeElement.querySelector('#pie-chart')
    const myChart = echarts.init(chartDom)

    // Transform carsType data for the chart
    const data = this.transformSrv.transformData(this.pieData)
    const chartData = Object.keys(this.pieData)

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: chartData,
      },
      series: [
        {
          name: 'Car Type',
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    myChart.setOption(option)
  }
}
