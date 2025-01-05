import { Component } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload'
import { UploadService } from '../../services/upload-data/upload-data.service'
import { Store } from '@ngrx/store'
import { UploadDataInterface } from '../../types/uploadData.interface'
import { uploadActions } from './store/action'
import { BackendDataService } from '../../services/backend-data/backend-data.service'

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  constructor(private store: Store, private backendSrv: BackendDataService) {}

  // handleChange(info: NzUploadChangeParam): void {
  //   this.uploadService.handleUpload(info)
  // }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading' && info.file.originFileObj) {
      const uploadData: UploadDataInterface = {
        file: info.file.originFileObj,
        name: info.file.name,
      }

      this.store.dispatch(uploadActions.upload({ request: uploadData }))

      this.backendSrv.uploadFile(uploadData.file).subscribe({
        next: (response) => {
          this.store.dispatch(uploadActions.uploadSuccess({ response }))
        },
        error: () => {
          this.store.dispatch(uploadActions.uploadFailure())
        },
      })
    }
  }
}
