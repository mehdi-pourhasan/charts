import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeFilterComponent } from './timeframe-filter.component';

describe('TimeframeFilterComponent', () => {
  let component: TimeframeFilterComponent;
  let fixture: ComponentFixture<TimeframeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeframeFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeframeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
