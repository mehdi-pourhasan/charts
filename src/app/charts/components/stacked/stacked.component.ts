// stacked-bar-chart.component.ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
} from '@angular/core'
import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'
import { StackedOptionService } from '../../services/stacked-option/stacked-option.service'

@Component({
  selector: 'app-stacked',
  standalone: true,
  template: `
    <div #chartContainer class="chart-container w-full h-96"></div>
  `,
  styles: [
    `
      .chart-container {
        min-height: 400px;
      }
    `,
  ],
})
export class StackedComponent implements OnInit, OnChanges {
  @Input() public stackedData!: quarterlyIncomeInterface

  private chart: echarts.ECharts | null = null

  constructor(
    private elementRef: ElementRef,
    private stackedOptionSrv: StackedOptionService
  ) {}

  ngOnInit(): void {
    this.initChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stackedData'] && !changes['stackedData'].firstChange) {
      this.updateChart()
    }
  }

  private initChart(): void {
    const chartContainer =
      this.elementRef.nativeElement.querySelector('.chart-container')
    this.chart = echarts.init(chartContainer)
    this.updateChart()
  }

  private updateChart(): void {
    if (!this.chart || !this.stackedData) return

    const options = this.stackedOptionSrv.getChartOptions(this.stackedData)
    this.chart.setOption(options)
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }
}
