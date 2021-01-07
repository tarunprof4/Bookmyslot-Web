import { TestBed } from '@angular/core/testing';

import { CustomerSlotResolverService } from './customer-slot-resolver.service';

describe('CustomerSlotResolverService', () => {
  let service: CustomerSlotResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSlotResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
