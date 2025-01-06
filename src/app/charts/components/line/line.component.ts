import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnChanges,
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
  imports: [],
  template: `
    <div id="stacked-chart" style="width: 100%; height: 80rem;"></div>
  `,
})
export class LineComponent implements OnInit, OnChanges {
  @Input() public lineData!: SalesData

  private myChart: echarts.ECharts | null = null

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initlineChart()
  }

  ngOnChanges(): void {
    if (this.lineData) {
      this.initlineChart() //Reinitialized if line data changes
    }
  }

  private initlineChart(): void {
    const chartDom = this.el.nativeElement.querySelector('#stacked-chart')
    this.myChart = echarts.init(chartDom)

    const dates = Object.keys(this.lineData)
    const bodyStyles = Array.from(
      new Set(
        Object.values(this.lineData).flatMap((styleData) =>
          Object.keys(styleData)
        )
      )
    ) // Get unique Body Styles

    // Prepare series data for each model
    const series = bodyStyles.map((bodyStyle) => {
      return {
        name: bodyStyle,
        type: 'line',
        stack: 'Total',
        areaStyle: {}, // Enable stacked area style
        data: dates.map((date) => this.lineData[date][bodyStyle] ?? 0), // Extract values for each bodyStyle per date
      }
    })

    // Chart options
    const option = {
      title: {
        text: 'Car Sales Trends Over Time by Body Style',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: bodyStyles,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
        name: 'Sales',
      },
      series: series,
    }

    if (this.myChart) {
      this.myChart.setOption(option)
    }
  }
}
