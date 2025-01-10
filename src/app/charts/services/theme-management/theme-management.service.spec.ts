import { TestBed } from '@angular/core/testing'
import { ThemeManagementService } from './theme-management.service'

describe('ThemeManagementService', () => {
  let service: ThemeManagementService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ThemeManagementService)
  })

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy()
    })
  })

  describe('themes', () => {
    it('should register all themes on init', () => {
      const availableThemes = service.getAvailableThemes()
      expect(availableThemes.length).toBeGreaterThan(0)
    })

    it('should return available themes', () => {
      const availableThemes = service.getAvailableThemes()
      expect(availableThemes).toContain('dark')
      expect(availableThemes).toContain('vintage')
      expect(availableThemes).toContain('macarons')
    })
  })
})
