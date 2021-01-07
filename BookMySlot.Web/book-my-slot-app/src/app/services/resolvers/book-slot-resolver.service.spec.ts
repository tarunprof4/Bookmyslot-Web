import { TestBed } from '@angular/core/testing';

import { BookSlotResolverService } from './book-slot-resolver.service';

describe('BookSlotResolverService', () => {
  let service: BookSlotResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSlotResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
