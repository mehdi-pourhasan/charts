import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  ComponentRef,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  Renderer2,
} from '@angular/core'
import { EditableTitleFormComponent } from '../../../shared/components/editable-title-form/editable-title-form.component'

@Directive({
  selector: '[appEditableTitle]',
  standalone: true,
})
export class EditableTitleDirective implements OnInit, OnDestroy {
  @Input() initialTitle = ''
  @Input() initialFontSize = 24

  private isEditing = false
  private componentRef: ComponentRef<EditableTitleFormComponent> | null = null
  private currentTitle: string
  private currentFontSize: number

  public constructor(
    private readonly el: ElementRef,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly renderer: Renderer2
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer')
    // Initialize with empty values, will be set in ngOnInit
    this.currentTitle = ''
    this.currentFontSize = 24
  }

  ngOnInit() {
    // Get initial content if not provided via inputs
    if (!this.initialTitle) {
      this.initialTitle = this.el.nativeElement.innerText.trim()
    }

    this.currentTitle = this.initialTitle
    this.currentFontSize = this.initialFontSize

    // Apply initial styles
    this.updateDisplay()
  }

  ngOnDestroy() {
    this.removeEditForm()
  }

  @HostListener('click')
  onClick() {
    if (!this.isEditing) {
      this.startEditing()
    }
  }

  private startEditing(): void {
    if (this.isEditing) return

    this.isEditing = true
    this.componentRef = this.viewContainerRef.createComponent(
      EditableTitleFormComponent
    )

    // Pass current values to form
    this.componentRef.instance.initialConfig = {
      title: this.currentTitle,
      fontSize: this.currentFontSize,
    }

    // Handle updates
    this.componentRef.instance.updateConfig.subscribe((newConfig) => {
      this.currentTitle = newConfig.title
      this.currentFontSize = newConfig.fontSize
      this.updateDisplay()
      this.removeEditForm()
    })

    // Handle cancel
    this.componentRef.instance.cancelEdit.subscribe(() => {
      this.removeEditForm()
    })
  }

  private removeEditForm(): void {
    if (this.componentRef) {
      this.componentRef.destroy()
      this.componentRef = null
      this.isEditing = false
    }
  }

  private updateDisplay(): void {
    this.renderer.setProperty(
      this.el.nativeElement,
      'innerText',
      this.currentTitle
    )
    this.renderer.setStyle(
      this.el.nativeElement,
      'fontSize',
      `${this.currentFontSize}px`
    )
  }
}
