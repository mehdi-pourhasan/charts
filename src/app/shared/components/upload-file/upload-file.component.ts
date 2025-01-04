import { Component } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload'
import { Router } from '@angular/router'
import { BackendDataService } from '../../services/backend-data/backend-data.service'

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent {
  constructor(
    private messageService: NzMessageService,
    private backendService: BackendDataService,
    private router: Router
  ) {}

  handleChange(info: NzUploadChangeParam): void {
    console.log('Upload status:', info.file.status)
    console.log('Uploaded file:', info.file)

    if (info.file.status !== 'uploading') {
      const file = info.file.originFileObj
      if (file) {
        this.backendService.uploadFile(file).subscribe({
          next: (response) => {
            console.log(response.message)
            this.messageService.success(
              `${info.file.name} file uploaded successfully`
            )
            this.router.navigate(['/info'])
            // You might want to emit an event here to notify the parent component
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
