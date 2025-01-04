import { Component, ElementRef, OnInit } from '@angular/core'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

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
  imports: [],
  template: `
    <div id="pie-chart" style="width: 100%; height: 500px; margin: 2rem;"></div>
  `,
})
export class PieComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.pieChartInit()
  }

  private pieChartInit(): void {
    const chartDom = this.el.nativeElement.querySelector('#pie-chart')
    const myChart = echarts.init(chartDom)

    const option = {
      title: {
        text: 'Number of car sales',
        subtext: 'Based on chassis type',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE'],
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {
              value: 1548,
              name: 'CityE',
              label: {
                rich: {
                  title: { color: '#eee', align: 'center' },
                  abg: {
                    backgroundColor: '#333',
                    width: '100%',
                    align: 'right',
                    height: 25,
                    borderRadius: [4, 4, 0, 0],
                  },
                },
              },
            },
            { value: 735, name: 'CityC' },
            { value: 510, name: 'CityD' },
            { value: 434, name: 'CityB' },
            { value: 335, name: 'CityA' },
          ],
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
