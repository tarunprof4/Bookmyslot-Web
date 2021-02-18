import { TestBed } from '@angular/core/testing';
import { BookedSlotService } from '../booked-slot.service';


describe('BookedSlotService', () => {
  let service: BookedSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
