import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadFileComponent } from './upload-file.component'
import { Store } from '@ngrx/store'
import { BackendDataService } from '../../services/backend-data/backend-data.service'
import { Router } from '@angular/router'
import { NzUploadChangeParam } from 'ng-zorro-antd/upload'
import { of } from 'rxjs'
import { uploadActions } from './store/action'

describe('UploadFileComponent', () => {
  // تعریف متغیر ها
  // نمونه شبیه سازی شده کامپوننت
  let component: UploadFileComponent
  // برای دسترسی به دام
  let fixture: ComponentFixture<UploadFileComponent>
  // برای شبیه سازی سرویس های مورد نیاز در کامپوننت
  let store: jasmine.SpyObj<Store>
  let backendService: jasmine.SpyObj<BackendDataService>
  let router: jasmine.SpyObj<Router>

  beforeEach(async () => {
    // ایجاد شبیه ساز های مورد نیاز در کامپوننت
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch'])
    const backendServiceSpy = jasmine.createSpyObj('BackendDataService', [
      'upload file',
    ])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    await TestBed.configureTestingModule({
      declarations: [UploadFileComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: BackendDataService, useValue: backendServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UploadFileComponent)
    component = fixture.componentInstance
    // تزریق وابستگی ها
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>
    backendService = TestBed.inject(
      BackendDataService
    ) as jasmine.SpyObj<BackendDataService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
  })

  it('should create upload file component', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch action and navigate after successful upload', () => {
    const Mockfile = new File([''], 'data.csv')
    const Mockresponse = { success: true }
    const info: NzUploadChangeParam = {
      file: {
        uid: '1',
        name: 'data.csv',
        status: 'done',
        originFileObj: Mockfile,
      },
      fileList: [],
    }

    backendService.uploadFile.and.returnValue(of(Mockresponse))
    component.handleChange(info)

    expect(store.dispatch).toHaveBeenCalledWith(
      uploadActions.upload({ file: Mockfile })
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      uploadActions.uploadSuccess({ response: Mockresponse })
    )
    expect(router.navigate).toHaveBeenCalledWith(['/info'])
  })

  xit('should log error on upload failure', () => {
    expect(component).toBeTruthy()
  })
})
