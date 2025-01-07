import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class GenerateRandomColorService {
  generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
}
