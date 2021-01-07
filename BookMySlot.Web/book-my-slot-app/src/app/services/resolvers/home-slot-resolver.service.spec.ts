import { TestBed } from '@angular/core/testing';

import { HomeSlotResolverService } from './home-slot-resolver.service';

describe('HomeSlotResolverService', () => {
  let service: HomeSlotResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSlotResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
