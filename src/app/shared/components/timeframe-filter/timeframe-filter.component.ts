import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select'

@Component({
  selector: 'app-timeframe-filter',
  standalone: true,
  imports: [FormsModule, NzSelectModule],
  template: `
    <div class="filter-container">
      <label class="timeframeTitle" for="timeFrame">Select Time Frame:</label>
      <nz-select
        [(ngModel)]="selectedTimeframe"
        (ngModelChange)="onTimeframeChanged()"
        nzPlaceHolder="Choose a Timeframe"
        style="width: 200px"
      >
        <nz-option nzValue="weekly" nzLabel="Weekly"></nz-option>
        <nz-option nzValue="monthly" nzLabel="Monthly"></nz-option>
        <nz-option nzValue="quarterly" nzLabel="Quarterly"></nz-option>
        <nz-option nzValue="semiannual" nzLabel="Semiannual"></nz-option>
        <nz-option nzValue="annual" nzLabel="Annual"></nz-option>
      </nz-select>
    </div>
  `,
  styleUrl: './timeframe-filter.component.css',
})
export class TimeframeFilterComponent {
  @Output() private timeframeChanged = new EventEmitter<
    'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  >()

  public selectedTimeframe:
    | 'weekly'
    | 'monthly'
    | 'quarterly'
    | 'semiannual'
    | 'annual' = 'monthly' // Default value

  // توی متد پایین هرکدوم از ایتم های بالا که انتخاب میشن
  // توسط Output به بیرون ارسال میشوند

  public onTimeframeChanged(): void {
    this.timeframeChanged.emit(this.selectedTimeframe)
  }
}
