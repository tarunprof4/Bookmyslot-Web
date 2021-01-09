import { TestBed } from '@angular/core/testing';

import { SharedSlotResolverService } from './shared-slot-resolver.service';

describe('SharedSlotResolverService', () => {
  let service: SharedSlotResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSlotResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
