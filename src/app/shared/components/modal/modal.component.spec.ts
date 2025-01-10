import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { ModalComponent } from './modal.component'
import { ModalService } from '../../services/modal/modal.service'
import { ThemeManagementService } from '../../../charts/services/theme-management/theme-management.service'
import { themeSettingsActions } from '../../store/theme/action'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

describe('ModalComponent', () => {
  let component: ModalComponent
  let fixture: ComponentFixture<ModalComponent>
  let modalService: ModalService
  let themeService: ThemeManagementService
  let store: Store

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        provideMockStore({}),
        {
          provide: ModalService,
          useValue: {
            modalVisibility$: of(false),
            closeModal: jasmine.createSpy('closeModal'),
          },
        },
        {
          provide: ThemeManagementService,
          useValue: {
            getAvailableThemes: jasmine
              .createSpy('getAvailableThemes')
              .and.returnValue(['default', 'dark']),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ModalComponent)
    component = fixture.componentInstance
    modalService = TestBed.inject(ModalService)
    themeService = TestBed.inject(ThemeManagementService)
    store = TestBed.inject(Store)

    fixture.detectChanges()
  })

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('Close Modal', () => {
    it('should close modal on onClose()', () => {
      component.onClose()
      expect(modalService.closeModal).toHaveBeenCalled()
    })

    it('should close modal on Escape key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      spyOn(component, 'onClose')
      component.onEscKey(event)
      expect(component.onClose).toHaveBeenCalled()
    })
  })

  describe('Dispatch Action', () => {
    it('should dispatch theme settings update on onSubmit()', () => {
      spyOn(store, 'dispatch')
      component.backgroundColor = '#000000'
      component.selectedTheme = 'dark'
      component.onSubmit()
      expect(store.dispatch).toHaveBeenCalledWith(
        themeSettingsActions.themeSettingsUpdate({
          backgroundColor: '#000000',
          theme: 'dark',
        })
      )
      expect(modalService.closeModal).toHaveBeenCalled()
    })
  })
})
