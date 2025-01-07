import { Component, DebugElement } from '@angular/core'
import { EditableTitleDirective } from './editable-title.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditableTitleService } from '../../services/editable-title/editable-title.service'
import { By } from '@angular/platform-browser'

@Component({
  template: `
    <h1 appEditableTitle [editableTitle]="'Test Title'" [fontSize]="24">
      Test Title
    </h1>
  `,
})
class TestComponent {}

describe('EditableTitleDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let directiveElement: DebugElement
  let titleService: EditableTitleService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [EditableTitleDirective],
      providers: [EditableTitleService],
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    directiveElement = fixture.debugElement.query(
      By.directive(EditableTitleDirective)
    )
    titleService = TestBed.inject(EditableTitleService)
    fixture.detectChanges()
  })

  it('should properly apply directive', () => {
    expect(directiveElement).toBeTruthy()
  })

  it('should set cursor to pointer', () => {
    expect(directiveElement.nativeElement.style.cursor).toBe('pointer')
  })

  it('should show edit form on click', () => {
    directiveElement.nativeElement.click()
    fixture.detectChanges()

    const editForm = fixture.debugElement.query(By.css('.edit-container'))
    expect(editForm).toBeTruthy()
  })

  it('should apply service updates to DOM', () => {
    const newConfig = {
      title: 'Updated Title',
      fontSize: 32,
    }

    titleService.updateConfig(newConfig)
    fixture.detectChanges()

    expect(directiveElement.nativeElement.innerText).toBe('Updated Title')
    expect(directiveElement.nativeElement.style.fontSize).toBe('32px')
  })

  it('should cleanup subscription on destroy', () => {
    const subscription = spyOn(
      titleService['titleConfigSubject'],
      'unsubscribe'
    )
    fixture.destroy()
    expect(subscription).toHaveBeenCalled()
  })
})
