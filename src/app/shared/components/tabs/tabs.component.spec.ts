import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TabsComponent } from './tabs.component'
import { Store } from '@ngrx/store'
import { DataProcessorService } from '../../../charts/services/data-processor/data-processor.service'
import { ModalService } from '../../services/modal/modal.service'
import { selectFeedData, selectIsLoading } from '../../../charts/store/reducer'
import { of } from 'rxjs'
import { selectBackgroundColor, selectTheme } from '../../store/theme/reducer'
import { feedActions } from '../../../charts/store/action'

describe('TabsComponent', () => {
  let component: TabsComponent
  let fixture: ComponentFixture<TabsComponent>
  let store: jasmine.SpyObj<Store>
  let dataProcessorSrv: jasmine.SpyObj<DataProcessorService>
  let modalSrv: jasmine.SpyObj<ModalService>

  const mockFeedData = {
    cars: [
      {
        Car_id: '1',
        Date: '2025-01-01',
        'Customer Name': 'John',
        Gender: 'Male',
        'Annual Income': '50000',
        Dealer_Name: 'Dealer 1',
        Company: 'Company 1',
        Model: 'Model A',
        Engine: 'V6',
        Transmission: 'Manual',
        Color: 'Red',
        'Price ($)': '30000',
        'Dealer_No ': '123',
        'Body Style': 'Sedan',
        Dealer_Region: 'North',
      },
      {
        Car_id: '2',
        Date: '2025-01-02',
        'Customer Name': 'Jane',
        Gender: 'Female',
        'Annual Income': '60000',
        Dealer_Name: 'Dealer 2',
        Company: 'Company 2',
        Model: 'Model B',
        Engine: 'V8',
        Transmission: 'Automatic',
        Color: 'Blue',
        'Price ($)': '35000',
        'Dealer_No ': '124',
        'Body Style': 'SUV',
        Dealer_Region: 'South',
      },
    ],
    salesData: {
      '2025-01-01': { 'Model A': 10 },
      '2025-01-02': { 'Model B': 15 },
    },
    profitData: [
      { name: 'North', itemStyle: { color: 'blue' }, value: 100 },
      { name: 'South', itemStyle: { color: 'green' }, value: 150 },
    ],
    quarterlyIncomeData: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        {
          name: 'Region 1',
          type: 'bar',
          stack: 'total',
          data: [100, 200, 150, 250],
        },
      ],
    },
  }

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch'])
    const dataProcessorSpy = jasmine.createSpyObj('DataProcessorService', [
      'pieChartCars',
      'lineChartCars',
      'sunBurstChartCars',
      'stackedChartCars',
    ])
    const modalSrvSpy = jasmine.createSpyObj('Modal Service', ['openModal'])

    storeSpy.select.and.callFake((selector: any) => {
      switch (selector) {
        case selectIsLoading:
          return of(false)
        case selectFeedData:
          return of(mockFeedData.cars)
        case selectBackgroundColor:
          return of('#FFF')
        case selectTheme:
          return of('default')
        default:
          return of(null)
      }
    })

    await TestBed.configureTestingModule({
      imports: [TabsComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: DataProcessorService, useValue: dataProcessorSpy },
        { provide: ModalService, useValue: modalSrvSpy },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TabsComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>
    dataProcessorSrv = TestBed.inject(
      DataProcessorService
    ) as jasmine.SpyObj<DataProcessorService>
    modalSrv = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>
  })

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('Actions', () => {
    it('should dispatch feedaction.fetchfeed onInit', () => {
      component.ngOnInit()
      expect(store.dispatch).toHaveBeenCalledWith(feedActions.fetchFeed())
    })
  })

  describe('Modal', () => {
    it('should opens modal whenever openModal is called', () => {
      component.openModal()
      expect(modalSrv.openModal).toHaveBeenCalled()
    })
  })
})
