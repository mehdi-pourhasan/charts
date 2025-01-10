import { CommonModule } from '@angular/common'
import { Component, HostListener, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { ModalService } from '../../services/modal/modal.service'
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize-first-letter.pipe'
import { Store } from '@ngrx/store'
import { themeSettingsActions } from '../../store/theme/action'
import { ThemeManagementService } from '../../../charts/services/theme-management/theme-management.service'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    CommonModule,
    CapitalizeFirstLetterPipe,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  public backgroundColor: string = '#FFF'
  public selectedTheme: string = 'default'
  public chartsTheme: string[]
  public isModalVisible: boolean = false

  public constructor(
    private readonly modalSrv: ModalService,
    private readonly store: Store,
    private readonly themeSrv: ThemeManagementService
  ) {
    this.chartsTheme = this.themeSrv.getAvailableThemes()
  }

  ngOnInit(): void {
    this.modalSrv.modalVisibility$.subscribe((visible) => {
      this.isModalVisible = visible
    })
  }

  public onClose(): void {
    this.modalSrv.closeModal()
  }

  public onUpdate(): void {
    this.modalSrv.closeModal()
  }

  public onSubmit() {
    // HERE we update global theme settings
    this.store.dispatch(
      themeSettingsActions.themeSettingsUpdate({
        backgroundColor: this.backgroundColor,
        theme: this.selectedTheme,
      })
    )
    this.onClose()
  }

  @HostListener('document:keydown.escape')
  onEscKey(event: KeyboardEvent): void {
    this.onClose()
  }
}
