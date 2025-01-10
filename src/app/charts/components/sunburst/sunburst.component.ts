import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core'
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
      <div
        [style.background-color]="background"
        id="sunburst-chart"
        style="height: 80rem;"
      ></div>

      <nz-input-group
        *ngIf="selectedSeries"
        nzSize="large"
        [nzSuffix]="suffixButton"
        style="margin-top: 10px;"
      >
        <input
          nz-input
          [(ngModel)]="newColor"
          placeholder="Enter hex color code (e.g., #FF0000)"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          #colorInput="ngModel"
        />
      </nz-input-group>
      <ng-template #suffixButton>
        <button
          nz-button
          nzType="primary"
          (click)="updateSeriesColor()"
          [disabled]="!isValidHexColor(newColor)"
        >
          Apply
        </button>
      </ng-template>
    </div>
  `,
})
export class SunburstComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() public background!: string
  @Input() public theme!: string
  @Input() public sunBurstData!: ProfitOfRegionInterface[]

  public chartTitle: string =
    'Profitability of different regions and sellers in each region'
  public charTitleFontSize: number = 24
  public selectedSeries: ProfitOfRegionInterface | null = null
  public newColor: string = ''

  private myChart: echarts.ECharts | null = null
  private chartOptions: EChartsOption | null = null

  constructor(private readonly profitFilterSrv: ProfitFilterService) {}

  ngAfterViewInit(): void {
    this.initChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme'] || changes['background'] || changes['sunBurstData']) {
      this.updateChart()
    }
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose()
    }
  }

  private initChart(): void {
    const chartDom = document.getElementById('sunburst-chart')
    this.myChart = echarts.init(chartDom, this.theme)

    this.createChartOptions()
    if (this.myChart && this.chartOptions) {
      this.myChart.setOption(this.chartOptions)
      this.setupChartEventListeners()
    }
  }

  private createChartOptions(): void {
    const filteredData = this.profitFilterSrv.filterTopVendors(
      this.sunBurstData,
      4
    )

    this.chartOptions = {
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
  }

  private setupChartEventListeners(): void {
    if (this.myChart) {
      this.myChart.on('click', (params: any) => {
        this.selectedSeries = params.data
        this.newColor = params.data.itemStyle?.color || ''
      })
    }
  }

  private updateChart(): void {
    if (this.myChart) {
      this.myChart.dispose()
    }
    this.initChart()
  }

  private updateNodeAndChildrenColors(
    node: ProfitOfRegionInterface,
    targetName: string,
    newColor: string
  ): boolean {
    if (node.name === targetName) {
      node.itemStyle = { color: newColor }

      if (node.children) {
        this.updateChildrenColors(node.children, newColor)
      }
      return true
    }

    if (node.children) {
      for (const child of node.children) {
        if (this.updateNodeAndChildrenColors(child, targetName, newColor)) {
          return true
        }
      }
    }

    return false
  }

  private updateChildrenColors(
    children: ProfitOfRegionInterface[],
    newColor: string
  ): void {
    for (const child of children) {
      child.itemStyle = { color: newColor }
      if (child.children) {
        this.updateChildrenColors(child.children, newColor)
      }
    }
  }

  public isValidHexColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
  }

  public updateSeriesColor(): void {
    if (
      this.myChart &&
      this.selectedSeries &&
      this.isValidHexColor(this.newColor)
    ) {
      const filteredData = this.profitFilterSrv.filterTopVendors(
        this.sunBurstData,
        4
      )

      for (const node of filteredData) {
        this.updateNodeAndChildrenColors(
          node,
          this.selectedSeries.name,
          this.newColor
        )
      }

      this.myChart.setOption({
        series: [
          {
            type: 'sunburst',
            data: filteredData,
          },
        ],
      })

      this.selectedSeries = null
      this.newColor = ''
    }
  }
}
