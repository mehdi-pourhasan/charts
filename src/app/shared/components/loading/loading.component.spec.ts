import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadingComponent } from './loading.component'
import { By } from '@angular/platform-browser'

describe('LoadingComponent', () => {
  let component: LoadingComponent
  let fixture: ComponentFixture<LoadingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LoadingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the spinner', () => {
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'))
    expect(spinnerElement).toBeTruthy()
  })
})
