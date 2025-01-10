import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StackedComponent } from './stacked.component'
import { StackedOptionService } from '../../services/stacked-option/stacked-option.service'
import * as echarts from 'echarts'
import { ElementRef } from '@angular/core'
import { quarterlyIncomeInterface } from '../../types/quarterlyincomeData.interface'

describe('StackedComponent', () => {
  let component: StackedComponent
  let fixture: ComponentFixture<StackedComponent>
  let stackedOptionSrv: jasmine.SpyObj<StackedOptionService>
  let mockElementRef: ElementRef

  const mockData: quarterlyIncomeInterface = {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      {
        name: 'Product A',
        type: 'bar',
        stack: 'Total',
        data: [12000, 15000, 18000, 20000],
      },
      {
        name: 'Product B',
        type: 'bar',
        stack: 'Total',
        data: [8000, 10000, 12000, 14000],
      },
      {
        name: 'Product C',
        type: 'bar',
        stack: 'Total',
        data: [5000, 7000, 9000, 11000],
      },
      {
        name: 'Product D',
        type: 'bar',
        stack: 'Total',
        data: [3000, 4000, 5000, 6000],
      },
    ],
  }

  beforeEach(async () => {
    const stackedOptionSpy = jasmine.createSpyObj('StackedOptionService', [
      'getChartOptions',
    ])

    stackedOptionSpy.getChartOptions.and.returnValue({
      xAxis: [{ type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] }],
      yAxis: [{ type: 'value' }],
      series: [
        { name: 'Product A', type: 'bar', data: [12000, 15000, 18000, 20000] },
      ],
    })

    mockElementRef = {
      nativeElement: {
        querySelector: jasmine.createSpy('querySelector').and.returnValue({
          offsetWidth: 500,
          offsetHeight: 400,
        }),
      },
    }

    await TestBed.configureTestingModule({
      imports: [StackedComponent],
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: StackedOptionService, useValue: stackedOptionSpy },
      ],
    }).compileComponents()

    stackedOptionSrv = TestBed.inject(
      StackedOptionService
    ) as jasmine.SpyObj<StackedOptionService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedComponent)
    component = fixture.componentInstance
    component.background = '#fff'
    component.theme = 'default'
    component.stackedData = mockData
  })

  describe('Component', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy()
    })
    it('should call component with default values', () => {
      expect(component.chartTitle).toBe('The company income periodically')
      expect(component.charTitleFontSize).toBe(24)
    })

    it('should call StackedOption service after component init', () => {
      fixture.detectChanges()
      expect(stackedOptionSrv.getChartOptions).toHaveBeenCalledWith(mockData)
    })

    it('should init chart after component initialized', () => {
      spyOn(component, 'initChart')
      fixture.detectChanges()
      expect(component.initChart).toHaveBeenCalled()
    })
  })

  describe('Destroy', () => {
    it('cleanup chart on destroy', () => {
      const disposeSpy = jasmine.createSpy('dispose')
      component.chart = {
        dispose: disposeSpy,
        setOption: jasmine.createSpy('setOption'),
      } as any

      component.ngOnDestroy()

      expect(disposeSpy).toHaveBeenCalled()
    })
  })

  describe('Change', () => {
    it('should update the chart when inputs change', () => {
      spyOn(component, 'updateChart')

      component.stackedData = {
        categories: ['Q1', 'Q2'],
        series: [
          { name: 'Income', type: 'bar', stack: 'total', data: [120, 200] },
        ],
      }
      component.theme = 'dark'
      component.background = '#000'

      component.ngOnChanges({
        stackedData: {
          currentValue: component.stackedData,
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false,
        },
        theme: {
          currentValue: component.theme,
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false,
        },
        background: {
          currentValue: component.background,
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect(component.updateChart).toHaveBeenCalled()
    })
  })
})
