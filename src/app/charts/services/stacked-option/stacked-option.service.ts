// chart.service.ts
import { Injectable } from '@angular/core'
import { EChartsOption } from 'echarts'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

@Injectable({
  providedIn: 'root',
})
export class StackedOptionService {
  getChartOptions(data: quarterlyIncomeInterface): EChartsOption {
    const transformedSeries = this.transformToSum(data)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          let tooltip = `${params[0].axisValue}<br/>`
          params.forEach((param: any) => {
            tooltip += `${param.seriesName}: ${param.value.toFixed(1)}<br/>`
          })
          return tooltip
        },
      },
      legend: {
        data: data.series.map((item) => item.name),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.categories,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
      },
      dataZoom: [
        {
          type: 'slider', // X Slider
          start: 0, // start at 0
          end: 100, // end at 100
          xAxisIndex: 0, // at X
        },
      ],
      series: transformedSeries,
    }
  }

  private transformToSum(data: quarterlyIncomeInterface): any[] {
    return data.series.map((series) => ({
      name: series.name,
      type: 'bar',
      stack: 'total',
      label: {
        show: false,
        formatter: '{c}',
      },
      data: series.data,
    }))
  }
}
