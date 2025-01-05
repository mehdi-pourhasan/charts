import { Component } from '@angular/core'

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    <div class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './loading.component.css',
})
export class LoadingComponent {}
