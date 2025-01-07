import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { EditableTitleInterface } from '../../../charts/types/editable-title.interface'
@Component({
  selector: 'app-editable-title-form',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzButtonModule],
  template: `
    <div class="edit-container">
      <nz-input-group [nzCompact]="true">
        <input
          nz-input
          [(ngModel)]="formData.title"
          placeholder="New Title"
          style="width: 40%"
        />
        <input
          nz-input
          type="number"
          [(ngModel)]="formData.fontSize"
          placeholder="FontSize(px)"
          style="width: 40%"
        />
        <button
          nz-button
          nzType="primary"
          (click)="onUpdate()"
          style="width: 20%"
        >
          Update
        </button>
      </nz-input-group>
    </div>
  `,
  styles: [
    `
      .edit-container {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class EditableTitleFormComponent {
  @Input() initialConfig: EditableTitleInterface = {
    title: '',
    fontSize: 24,
  }

  @Output() updateConfig = new EventEmitter<EditableTitleInterface>()
  @Output() cancelEdit = new EventEmitter<void>()

  formData: EditableTitleInterface = {
    title: '',
    fontSize: 24,
  }

  ngOnInit() {
    this.formData = { ...this.initialConfig }
  }

  onUpdate(): void {
    this.updateConfig.emit(this.formData)
  }

  onCancel(): void {
    this.cancelEdit.emit()
  }
}
