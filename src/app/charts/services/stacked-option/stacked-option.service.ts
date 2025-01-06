// chart.service.ts
import { Injectable } from '@angular/core'
import { EChartsOption } from 'echarts'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

@Injectable({
  providedIn: 'root',
})
export class StackedOptionService {
  getChartOptions(data: quarterlyIncomeInterface): EChartsOption {
    // Transform data for percentage calculation
    const transformedSeries = this.transformToPercentage(data)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          let tooltip = `${params[0].axisValue}<br/>`
          params.forEach((param: any) => {
            tooltip += `${param.seriesName}: ${param.value.toFixed(1)}%<br/>`
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
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.categories,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: transformedSeries,
    }
  }

  private transformToPercentage(data: quarterlyIncomeInterface): any[] {
    const totalsByQuarter = data.categories.map((_, index) => {
      return data.series.reduce((sum, series) => sum + series.data[index], 0)
    })

    return data.series.map((series) => ({
      name: series.name,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        formatter: '{c}%',
      },
      data: series.data.map((value, index) =>
        ((value / totalsByQuarter[index]) * 100).toFixed(1)
      ),
    }))
  }
}
