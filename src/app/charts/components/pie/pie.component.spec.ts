import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PieComponent } from './pie.component'
import { TransformationService } from '../../services/body-type-transform/transform.service'
import { CarTypeInterface } from '../../types/carTypeData.interface'
import { ElementRef } from '@angular/core'
import { dispose } from 'echarts'

describe('PieComponent', () => {
  let component: PieComponent
  let fixture: ComponentFixture<PieComponent>
  let transformSrv: jasmine.SpyObj<TransformationService>
  let mockElementRef: ElementRef

  const mockData: CarTypeInterface = {
    Hardtop: 2971,
    Hatchback: 6128,
    Passenger: 3945,
    SUV: 6374,
  }

  beforeEach(async () => {
    const transformSrvSpy = jasmine.createSpyObj('TransformationService', [
      'transformData',
    ])
    transformSrvSpy.transformData.and.returnValue([
      { name: 'Hardtop', value: 2971 },
      { name: 'Hatchback', value: 6128 },
      { name: 'Passenger', value: 3945 },
      { name: 'SUV', value: 6374 },
    ])

    mockElementRef = {
      nativeElement: {
        querySelector: jasmine
          .createSpy('querySelector')
          .and.returnValue(document.createElement('div')),
      },
    }

    await TestBed.configureTestingModule({
      imports: [PieComponent],
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: TransformationService, useValue: transformSrvSpy },
      ],
    }).compileComponents()

    transformSrv = TestBed.inject(
      TransformationService
    ) as jasmine.SpyObj<TransformationService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PieComponent)
    component = fixture.componentInstance
    component.background = '#fff'
    component.theme = 'default'
    component.pieData = mockData
  })

  describe('Component', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should call component with default values', () => {
      expect(component.chartTitle).toBe('Sales trends of different car models')
      expect(component.charTitleFontSize).toBe(24)
    })

    it('should call Transform service after component init', () => {
      fixture.detectChanges()
      expect(transformSrv.transformData).toHaveBeenCalledWith(mockData)
    })

    it('should call updateChart when inputs change', () => {
      spyOn(component as any, 'updateChart').and.callThrough()

      component.ngOnChanges({
        pieData: {
          currentValue: { SUV: 5000 },
          previousValue: mockData,
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect((component as any).updateChart).toHaveBeenCalled()
    })
  })

  describe('Destroy', () => {
    it('cleanup chart on destroy', () => {
      const disposeSpy = jasmine.createSpy('dispose')
      ;(component as any).myChart = { dispose: disposeSpy }

      component.ngOnDestroy()

      expect(disposeSpy).toHaveBeenCalled()
    })
  })
})
