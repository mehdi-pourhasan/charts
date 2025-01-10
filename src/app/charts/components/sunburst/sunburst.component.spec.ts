import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SunburstComponent } from './sunburst.component'
import { ProfitFilterService } from '../../services/profit-filter/profit-filter.service'
import { FormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import * as echarts from 'echarts'

describe('SunburstComponent', () => {
  let component: SunburstComponent
  let fixture: ComponentFixture<SunburstComponent>
  let profitFilterService: jasmine.SpyObj<ProfitFilterService>

  const mockSunburstData = [
    {
      name: 'Region A',
      value: 100,
      itemStyle: { color: '#eeeeee' },
      children: [
        {
          name: 'Vendor 1',
          value: 50,
          itemStyle: { color: '#eeeeee' },
        },
      ],
    },
  ]

  beforeEach(async () => {
    const filterSrvspy = jasmine.createSpyObj('ProfitFilterService', [
      'filterTopVendors',
    ])
    filterSrvspy.filterTopVendors.and.returnValue(mockSunburstData)

    await TestBed.configureTestingModule({
      imports: [FormsModule, NzInputModule, NzButtonModule, SunburstComponent],
      providers: [{ provide: ProfitFilterService, useValue: filterSrvspy }],
    }).compileComponents()

    profitFilterService = TestBed.inject(
      ProfitFilterService
    ) as jasmine.SpyObj<ProfitFilterService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SunburstComponent)
    component = fixture.componentInstance
    component.background = '#fff'
    component.theme = 'default'
    component.sunBurstData = mockSunburstData
  })

  describe('component', () => {
    it('should create component', () => {
      expect(component).toBeTruthy()
    })

    it('call component with default values', () => {
      expect(component.chartTitle).toBe(
        'Profitability of different regions and sellers in each region'
      )
      expect(component.charTitleFontSize).toBe(24)
      expect(component.selectedSeries).toBeNull()
      expect(component.newColor).toBe('')
    })

    it('should call filterTopVendors on init component ', () => {
      fixture.detectChanges()
      expect(profitFilterService.filterTopVendors).toHaveBeenCalledWith(
        mockSunburstData,
        4
      )
    })
  })

  describe('Change', () => {
    it('should call updateChart when inputs change', () => {
      spyOn(component as any, 'updateChart').and.callThrough()

      component.ngOnChanges({
        sunBurstData: {
          currentValue: [
            {
              name: 'Region B',
              value: 150,
              itemStyle: { color: '#aaaaaa' },
              children: [
                {
                  name: 'Vendor 2',
                  value: 75,
                  itemStyle: { color: '#aaaaaa' },
                },
              ],
            },
          ],
          previousValue: mockSunburstData,
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect((component as any).updateChart).toHaveBeenCalled()
    })
  })

  describe('Destroy component', () => {
    it('should clean up chart on destroy', () => {
      fixture.detectChanges()
      const disposeSpy = jasmine.createSpy('dispose')
      ;(component as any).myChart = { dispose: disposeSpy }

      component.ngOnDestroy()

      expect(disposeSpy).toHaveBeenCalled()
    })
  })
})
