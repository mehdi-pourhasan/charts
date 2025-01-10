import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { SalesData } from '../../types/salesData.interface'
import { EditableTitleDirective } from '../../directives/editable-title/editable-title.directive'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])
@Component({
  selector: 'app-line',
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
        id="stacked-chart"
        [style.background-color]="background"
        style="width: 100%; height: 80rem;"
      ></div>
    </div>
  `,
  styles: [``],
})
export class LineComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public background!: string
  @Input() public theme!: string
  @Input() public lineData!: SalesData

  public chartTitle: string = 'Number of car sales by chassis type'
  public charTitleFontSize: number = 24

  public myChart: echarts.ECharts | null = null
  private chartOptions: any

  constructor(private readonly el: ElementRef) {}

  ngOnInit(): void {
    this.initChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme'] || changes['background'] || changes['lineData']) {
      this.updateChart()
    }
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose()
    }
  }

  private initChart(): void {
    const chartDom = this.el.nativeElement.querySelector('#stacked-chart')
    this.myChart = echarts.init(chartDom, this.theme)
    this.createChartOptions()
    this.myChart?.setOption(this.chartOptions)
  }

  private createChartOptions(): void {
    const dates = Object.keys(this.lineData)
    const bodyStyles = Array.from(
      new Set(
        Object.values(this.lineData).flatMap((styleData) =>
          Object.keys(styleData)
        )
      )
    )

    const series = bodyStyles.map((bodyStyle) => ({
      name: bodyStyle,
      type: 'line',
      stack: 'Total',
      emphasis: {
        focus: 'series',
      },
      data: dates.map((date) => this.lineData[date][bodyStyle] ?? 0),
    }))

    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
      },
      legend: {
        data: bodyStyles,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show: false,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value',
        name: 'Sales',
      },
      series: series,
    }
  }

  private updateChart(): void {
    if (this.myChart) {
      this.myChart.dispose()
    }
    this.initChart()
  }
}
