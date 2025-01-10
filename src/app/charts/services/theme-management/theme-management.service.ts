import { Injectable } from '@angular/core'
import * as echarts from 'echarts'

@Injectable({
  providedIn: 'root',
})
export class ThemeManagementService {
  private themes = {
    dark: {
      color: [
        '#dd6b66',
        '#759aa0',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42',
      ],
      backgroundColor: '#1f1f1f',
      textStyle: {
        color: '#fff',
      },
      title: {
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        textStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(50,50,50,0.9)',
        textStyle: {
          color: '#fff',
        },
      },
    },
    vintage: {
      color: [
        '#d87c7c',
        '#919e8b',
        '#d7ab82',
        '#6e7074',
        '#61a0a8',
        '#efa18d',
        '#787464',
        '#cc7e63',
        '#724e58',
        '#4b565b',
      ],
      backgroundColor: '#fef8ef',
    },
    macarons: {
      color: [
        '#2ec7c9',
        '#b6a2de',
        '#5ab1ef',
        '#ffb980',
        '#d87a80',
        '#8d98b3',
        '#e5cf0d',
        '#97b552',
        '#95706d',
        '#dc69aa',
      ],
      backgroundColor: '#fff',
    },
    infographic: {
      color: [
        '#C1232B',
        '#27727B',
        '#FCCE10',
        '#E87C25',
        '#B5C334',
        '#FE8463',
        '#9BCA63',
        '#FAD860',
        '#F3A43B',
        '#60C0DD',
      ],
      backgroundColor: '#fff',
    },
    shine: {
      color: [
        '#c12e34',
        '#e6b600',
        '#0098d9',
        '#2b821d',
        '#005eaa',
        '#339ca8',
        '#cda819',
        '#32a487',
      ],
      backgroundColor: '#fff',
    },
    romantic: {
      color: [
        '#ff7f50',
        '#87cefa',
        '#da70d6',
        '#32cd32',
        '#6495ed',
        '#ff69b4',
        '#ba55d3',
        '#cd5c5c',
        '#ffa500',
        '#40e0d0',
      ],
      backgroundColor: '#fff',
    },
  }

  private registeredThemes = new Set<string>()

  public constructor() {
    this.registerAllThemes()
  }

  private registerAllThemes(): void {
    Object.entries(this.themes).forEach(([themeName, theme]) => {
      if (!this.registeredThemes.has(themeName)) {
        echarts.registerTheme(themeName, theme)
        this.registeredThemes.add(themeName)
      }
    })
  }

  public getTheme(themeName: string = ''): string {
    const normalizedTheme = themeName.toLowerCase()
    return this.registeredThemes.has(normalizedTheme) ? normalizedTheme : ''
  }

  public getAvailableThemes(): string[] {
    return Array.from(this.registeredThemes)
  }
}
