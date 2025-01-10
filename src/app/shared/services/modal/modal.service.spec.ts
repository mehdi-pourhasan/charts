import { TestBed } from '@angular/core/testing'
import { ModalService } from './modal.service'
import { take } from 'rxjs/operators' // Import take operator

describe('ModalService', () => {
  let service: ModalService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ModalService)
  })

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy()
    })
  })

  describe('Modal Status', () => {
    it('should open the modal', (done) => {
      service.modalVisibility$.pipe(take(1)).subscribe((isVisible) => {
        expect(isVisible).toBeFalse()
        done()
      })

      service.openModal()
    })

    it('should close the modal', (done) => {
      service.modalVisibility$.pipe(take(1)).subscribe((isVisible) => {
        expect(isVisible).toBeFalse()
        done()
      })

      service.closeModal()
    })
  })
})
