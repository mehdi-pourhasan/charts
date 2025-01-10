import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
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
import { ThemeManagementService } from '../../services/theme-management/theme-management.service'

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
      <div
        id="pie-chart"
        [style.background-color]="background"
        style="width: 100%; height: 60rem; "
      ></div>
    </div>
  `,
})
export class PieComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public pieData!: CarTypeInterface
  @Input() public background!: string
  @Input() public theme!: string

  public chartTitle: string = 'Sales trends of different car models'
  public charTitleFontSize: number = 24
  private myChart: echarts.ECharts | null = null
  private chartOptions: any

  public constructor(
    private readonly el: ElementRef,
    private readonly transformSrv: TransformationService,
    private readonly themeSrv: ThemeManagementService
  ) {}

  ngOnInit(): void {
    this.initializeChart()
    console.log(this.pieData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme'] || changes['background'] || changes['pieData']) {
      this.updateChart()
    }
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose()
    }
  }

  private initializeChart(): void {
    const chartDom = this.el.nativeElement.querySelector('#pie-chart')
    this.myChart = echarts.init(chartDom, this.themeSrv.getTheme(this.theme))
    this.createChartOptions()
    this.myChart.setOption(this.chartOptions)
  }

  private createChartOptions(): void {
    const data = this.transformSrv.transformData(this.pieData)
    const chartData = Object.keys(this.pieData)

    this.chartOptions = {
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
  }

  private updateChart(): void {
    if (this.myChart) {
      this.myChart.dispose()
    }
    this.initializeChart()
  }
}
