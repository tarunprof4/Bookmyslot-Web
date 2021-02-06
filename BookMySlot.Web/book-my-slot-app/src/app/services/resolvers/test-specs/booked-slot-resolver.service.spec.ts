import { TestBed } from '@angular/core/testing';
import { BookedSlotResolverService } from '../booked-slot-resolver.service';



describe('BookedSlotResolverService', () => {
  let service: BookedSlotResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedSlotResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
