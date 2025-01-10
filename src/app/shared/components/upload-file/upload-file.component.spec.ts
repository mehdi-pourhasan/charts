import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UploadFileComponent } from './upload-file.component'
import { of, throwError } from 'rxjs'
import { NzUploadChangeParam } from 'ng-zorro-antd/upload'
import { uploadActions } from '../../store/upload-file/action'
import { Store } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { Router } from '@angular/router'
import { BackendDataService } from '../../services/backend-data/backend-data.service'

describe('UploadFileComponent', () => {
  let component: UploadFileComponent
  let fixture: ComponentFixture<UploadFileComponent>
  let storeSpy: jasmine.SpyObj<Store>
  let backendSrvSpy: jasmine.SpyObj<BackendDataService>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch'])
    backendSrvSpy = jasmine.createSpyObj('BackendDataService', ['uploadFile'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      imports: [UploadFileComponent],
      providers: [
        provideMockStore(),
        { provide: Store, useValue: storeSpy },
        { provide: BackendDataService, useValue: backendSrvSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UploadFileComponent)
    component = fixture.componentInstance
  })

  describe('Component', () => {
    it('should create component', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('service and action', () => {
    it('should dispatch upload action and call backend service', () => {
      const file = new File([''], 'data.csv')
      const info: NzUploadChangeParam = {
        file: { status: 'done', originFileObj: file },
      } as NzUploadChangeParam

      backendSrvSpy.uploadFile.and.returnValue(of({ success: true }))

      component.handleChange(info)

      // upload action dispatched
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        uploadActions.upload({ file })
      )

      //  upload success action dispatched
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        uploadActions.uploadSuccess({ response: { success: true } })
      )

      expect(backendSrvSpy.uploadFile).toHaveBeenCalledWith(file)
    })
  })

  describe('success and failure actions', () => {
    it('should dispatch upload success and navigate after upload was successfully finished', () => {
      const file = new File([''], 'data.csv')
      const info: NzUploadChangeParam = {
        file: { status: 'done', originFileObj: file },
      } as NzUploadChangeParam

      backendSrvSpy.uploadFile.and.returnValue(of({ success: true }))

      component.handleChange(info)

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        uploadActions.uploadSuccess({ response: { success: true } })
      )
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/info'])
    })

    it('should log error when upload fails', () => {
      const consoleSpy = spyOn(console, 'log')
      const file = new File([''], 'data.csv')
      const info: NzUploadChangeParam = {
        file: { status: 'done', originFileObj: file },
      } as NzUploadChangeParam

      backendSrvSpy.uploadFile.and.returnValue(
        throwError(() => new Error('upload failed'))
      )

      component.handleChange(info)

      expect(consoleSpy).toHaveBeenCalledWith('Error uploading file')
    })
  })
})
