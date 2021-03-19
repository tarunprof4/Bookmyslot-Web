import { TestBed } from '@angular/core/testing';
import { LastSharedSlotResolverService } from '../last-shared-slot-resolver.service';


describe('LastBookedSlotResolverService', () => {
  let service: LastSharedSlotResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastSharedSlotResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
