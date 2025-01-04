import { Component } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload'
import { UploadService } from '../../services/upload-data/upload-data.service'

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  constructor(private uploadService: UploadService) {}

  handleChange(info: NzUploadChangeParam): void {
    this.uploadService.handleUpload(info)
  }
}
