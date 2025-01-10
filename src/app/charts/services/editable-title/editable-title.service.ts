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

  titleConfig$ = this.titleConfigSubject.asObservable()

  updateConfig(config: EditableTitleInterface): void {
    this.titleConfigSubject.next(config)
  }

  getCurrentConfig(): EditableTitleInterface {
    return this.titleConfigSubject.value
  }
}
