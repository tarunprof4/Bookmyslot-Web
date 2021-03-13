import { TestBed } from '@angular/core/testing';

import { CustomerSettingsResolverService } from './customer-settings-resolver.service';

describe('CustomerSettingsResolverService', () => {
  let service: CustomerSettingsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSettingsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
