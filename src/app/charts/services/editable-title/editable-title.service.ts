import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { EditableTitleInterface } from '../../types/editable-title.interface'

@Injectable({
  providedIn: 'root',
})
export class EditableTitleService {
  // BehaviorSubject
  private titleConfigSubject = new BehaviorSubject<EditableTitleInterface>({
    title: '',
    fontSize: 24,
  })

  // creates an observable from behavior subject above
  titleConfig$ = this.titleConfigSubject.asObservable()

  // using next method after user adds new data to subject
  updateConfig(config: EditableTitleInterface): void {
    this.titleConfigSubject.next(config)
  }

  // Returns confings
  getCurrentConfig(): EditableTitleInterface {
    return this.titleConfigSubject.value
  }
}
