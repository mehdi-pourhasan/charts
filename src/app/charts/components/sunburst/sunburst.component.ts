import { Component, OnInit, AfterViewInit } from '@angular/core'
import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption } from 'echarts/components'
import { SunburstChart, SunburstSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, SunburstChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | SunburstSeriesOption
>

@Component({
  selector: 'app-sunburst',
  standalone: true,
  imports: [],
  template: `
    <div id="sunburst-chart" style="width: 600px;"></div>
  `,
  styles: [
    `
      :host {
        margin: 0 auto;
        display: block;
        width: 50%;
      }
      #sunburst-chart {
        height: 500px;
        margin: 5rem 0;
      }
    `,
  ],
})
export class SunburstComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initSunburstChart()
  }

  private initSunburstChart(): void {
    const chartDom = document.getElementById('sunburst-chart')
    const myChart = echarts.init(chartDom)

    const data = [
      {
        name: 'Flora',
        itemStyle: { color: '#da0d68' },
        children: [
          {
            name: 'Black Tea',
            value: 1,
            itemStyle: { color: '#975e6d' },
          },
          {
            name: 'Floral',
            itemStyle: { color: '#e0719c' },
            children: [
              {
                name: 'Chamomile',
                value: 1,
                itemStyle: { color: '#f99e1c' },
              },
              {
                name: 'Rose',
                value: 1,
                itemStyle: { color: '#ef5a78' },
              },
              {
                name: 'Jasmine',
                value: 1,
                itemStyle: { color: '#f7f1bd' },
              },
            ],
          },
        ],
      },
      {
        name: 'Fruity',
        itemStyle: { color: '#f26522' },
        children: [
          {
            name: 'Berry',
            itemStyle: { color: '#a64d79' },
            children: [
              {
                name: 'Blueberry',
                value: 1,
                itemStyle: { color: '#6b2f8f' },
              },
              {
                name: 'Raspberry',
                value: 1,
                itemStyle: { color: '#b73239' },
              },
            ],
          },
          {
            name: 'Citrus',
            itemStyle: { color: '#f7a541' },
            children: [
              {
                name: 'Lemon',
                value: 1,
                itemStyle: { color: '#f3d32f' },
              },
              {
                name: 'Orange',
                value: 1,
                itemStyle: { color: '#f78e2f' },
              },
            ],
          },
        ],
      },
      {
        name: 'Sour',
        itemStyle: { color: '#b8d430' },
        children: [
          {
            name: 'Tart',
            value: 1,
            itemStyle: { color: '#7a9b20' },
          },
          {
            name: 'Tangy',
            value: 1,
            itemStyle: { color: '#9dc209' },
          },
        ],
      },
      {
        name: 'Green',
        itemStyle: { color: '#00a651' },
        children: [
          {
            name: 'Herbaceous',
            value: 1,
            itemStyle: { color: '#3c8c4a' },
          },
          {
            name: 'Grassy',
            value: 1,
            itemStyle: { color: '#8bc53f' },
          },
        ],
      },
    ]

    const option: EChartsOption = {
      title: {
        text: 'Fake DATA',
        textStyle: { fontSize: 14, align: 'center' },
      },
      series: [
        {
          type: 'sunburst',
          data: data,
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
