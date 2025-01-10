import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LineComponent } from './line.component'
import { ElementRef } from '@angular/core'
import * as echarts from 'echarts/core'
import { SalesData } from '../../types/salesData.interface'

describe('LineComponent', () => {
  let component: LineComponent
  let fixture: ComponentFixture<LineComponent>
  let mockElementRef: ElementRef

  beforeEach(async () => {
    mockElementRef = {
      nativeElement: {
        querySelector: jasmine
          .createSpy('querySelector')
          .and.returnValue(document.createElement('div')),
      },
    }

    await TestBed.configureTestingModule({
      imports: [LineComponent],
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
    }).compileComponents()

    fixture = TestBed.createComponent(LineComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    if (component.myChart) {
      component.myChart.dispose()
    }
  })

  describe('Component and init', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should initialize the chart on ngOnInit', () => {
      spyOn(component as any, 'initChart')
      component.ngOnInit()
      expect((component as any).initChart).toHaveBeenCalled()
    })
  })

  it('should call updateChart on @Input changes', () => {
    spyOn(component as any, 'updateChart')
    const changes = {
      theme: {
        currentValue: 'dark',
        previousValue: 'light',
        firstChange: false,
        isFirstChange: () => false,
      },
    }
    component.ngOnChanges(changes)
    expect((component as any).updateChart).toHaveBeenCalled()
  })

  it('should initialize the chart with correct options', () => {
    component.lineData = {
      '2023-1': { Sedan: 10, SUV: 20 },
      '2023-2': { Sedan: 15, SUV: 25 },
    }
    component.theme = 'default'
    component.ngOnInit()

    expect(component.myChart).toBeTruthy()
    expect(component.myChart?.getOption()).toBeTruthy()
  })

  describe('Destroy', () => {
    it('should dispose of the chart on ngOnDestroy', () => {
      component.myChart = echarts.init(document.createElement('div'))
      spyOn(component.myChart, 'dispose')
      component.ngOnDestroy()
      expect(component.myChart.dispose).toHaveBeenCalled()
    })
  })
})
