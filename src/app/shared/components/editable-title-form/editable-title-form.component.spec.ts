import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditableTitleFormComponent } from './editable-title-form.component'
import { FormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('EditableTitleFormComponent', () => {
  let component: EditableTitleFormComponent
  let fixture: ComponentFixture<EditableTitleFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditableTitleFormComponent,
        FormsModule,
        NzInputModule,
        NzButtonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTitleFormComponent)
    component = fixture.componentInstance
    component.initialConfig = {
      title: 'initial title',
      fontSize: 24,
    }
    fixture.detectChanges()
  })

  describe('Component', () => {
    it('should created', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('Form functionality', () => {
    it('should emit update event with new values', () => {
      const newConfig = {
        title: 'new title',
        fontSize: 32,
      }

      spyOn(component.updateConfig, 'emit')
      component.formData = newConfig
      component.onUpdate()

      expect(component.updateConfig.emit).toHaveBeenCalledWith(newConfig)
    })
  })
})
