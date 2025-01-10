// stacked-bar-chart.component.ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  OnDestroy,
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
    <div class="chart-wrapper">
      <h1
        appEditableTitle
        [initialTitle]="chartTitle"
        [initialFontSize]="charTitleFontSize"
        class="chart-title"
      >
        {{ chartTitle }}
      </h1>
      <div
        #chartContainer
        id="stack-chart"
        [style.background-color]="background"
        class="chart-container w-full"
      ></div>
    </div>
  `,
  styles: [
    `
      .chart-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .chart-title {
        margin: auto 1rem auto 1rem;
        padding: 0.5rem;
        display: block;
        text-align: center;
      }
      .chart-container {
        min-height: 400px;
        flex: 1;
      }
    `,
  ],
})
export class StackedComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public background!: string
  @Input() public theme!: string
  @Input() public stackedData!: quarterlyIncomeInterface

  public chartTitle: string = 'The company income periodically'
  public charTitleFontSize: number = 24

  public chart: echarts.ECharts | null = null

  constructor(
    private readonly elementRef: ElementRef,
    private readonly stackedOptionSrv: StackedOptionService
  ) {}

  ngOnInit(): void {
    this.initChart()
    console.log(this.stackedData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme'] || changes['background'] || changes['stackedData']) {
      this.updateChart()
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  }

  public initChart(): void {
    const chartContainer =
      this.elementRef.nativeElement.querySelector('#stack-chart')
    if (chartContainer) {
      this.chart = echarts.init(chartContainer, this.theme)
      this.updateChartOptions()
    }
  }

  private updateChartOptions(): void {
    if (!this.chart || !this.stackedData) return
    const options = this.stackedOptionSrv.getChartOptions(this.stackedData)
    this.chart.setOption(options)
  }

  public updateChart(): void {
    if (this.chart) {
      this.chart.dispose()
    }
    this.initChart()
  }
}
