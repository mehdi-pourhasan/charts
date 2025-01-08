import { TestBed } from '@angular/core/testing';

import { ThemeManagementService } from './theme-management.service';

describe('ThemeManagementService', () => {
  let service: ThemeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
