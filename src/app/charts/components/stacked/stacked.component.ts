// stacked-bar-chart.component.ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
} from '@angular/core'
import * as echarts from 'echarts'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'
import { StackedOptionService } from '../../services/stacked-option/stacked-option.service'
import { EditableTitleDirective } from '../../directives/editable-title/editable-title.directive'

@Component({
  selector: 'app-stacked',
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
      <div #chartContainer class="chart-container w-full h-96"></div>
    </div>
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
  public chartTitle: string = 'The company income periodically'
  public charTitleFontSize: number = 24
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
