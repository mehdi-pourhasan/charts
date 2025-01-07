import { TestBed } from '@angular/core/testing'

import { EditableTitleService } from './editable-title.service'
import { EditableTitleInterface } from '../../types/editable-title.interface'

describe('EditableTitleService', () => {
  let service: EditableTitleService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditableTitleService],
    })
    service = TestBed.inject(EditableTitleService)
  })

  it('should create the service', () => {
    expect(service).toBeTruthy()
  })

  it('should have correct default values', () => {
    const defaultConfig = service.getCurrentConfig()
    expect(defaultConfig).toEqual({
      title: '',
      fontSize: 24,
    })
  })

  it('should update config with new configurations', (done) => {
    const newConfig: EditableTitleInterface = {
      title: 'test title',
      fontSize: 23,
    }

    service.titleConfig$.subscribe((config) => {
      expect(config).toEqual(newConfig)
      done()
    })

    service.updateConfig(newConfig)
  })
})
