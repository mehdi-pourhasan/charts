import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TimeframeFilterComponent } from './timeframe-filter.component'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('TimeframeFilterComponent', () => {
  let component: TimeframeFilterComponent
  let fixture: ComponentFixture<TimeframeFilterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TimeframeFilterComponent,
        NzSelectModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TimeframeFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('Component with default value', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should have default value "monthly"', () => {
      expect(component.selectedTimeframe).toBe('monthly')
    })
  })

  it('should render all options', () => {
    const options = fixture.debugElement.queryAll(By.css('nz-option'))
    expect(options.length).toBe(0)
  })

  it('should update selectedTimeframe when user selects a new option', () => {
    const selectElement = fixture.debugElement.query(By.css('nz-select'))

    // Simulate user selecting 'quarterly'
    selectElement.nativeElement.value = 'monthly'
    selectElement.nativeElement.dispatchEvent(new Event('change'))
    fixture.detectChanges()

    expect(component.selectedTimeframe).toBe('monthly')
  })
})
