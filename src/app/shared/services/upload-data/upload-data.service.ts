import { Injectable } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Router } from '@angular/router'
import { BackendDataService } from '../backend-data/backend-data.service'
import { NzUploadChangeParam } from 'ng-zorro-antd/upload'

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private messageService: NzMessageService,
    private backendService: BackendDataService,
    private router: Router
  ) {}

  handleUpload(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      const file = info.file.originFileObj
      if (file) {
        this.backendService.uploadFile(file).subscribe({
          next: (response) => {
            this.messageService.success(
              `${info.file.name} file uploaded successfully`
            )
            this.router.navigate(['/info'])
          },
          error: (error) => {
            this.messageService.error(`${info.file.name} file upload failed.`)
            console.error('Upload error:', error)
          },
        })
      }
    }
  }
}
