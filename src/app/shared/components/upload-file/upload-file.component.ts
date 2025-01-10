import { Component } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload'
import { Store } from '@ngrx/store'
import { UploadDataInterface } from '../../types/uploadData.interface'
import { uploadActions } from '../../store/upload-file/action'
import { BackendDataService } from '../../services/backend-data/backend-data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  public constructor(
    private readonly store: Store,
    private readonly backendSrv: BackendDataService,
    private readonly router: Router
  ) {}

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading' && info.file.originFileObj) {
      const uploadData: UploadDataInterface = {
        file: info.file.originFileObj,
      }

      this.store.dispatch(uploadActions.upload({ file: uploadData.file }))

      this.backendSrv.uploadFile(uploadData.file).subscribe({
        next: (response) => {
          this.store.dispatch(uploadActions.uploadSuccess({ response }))
          this.router.navigate(['/info'])
        },
        error: () => {
          console.log('Error uploading file')
        },
      })
    }
  }
}
