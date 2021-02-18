import { TestBed } from '@angular/core/testing';
import { SharedSlotService } from '../shared-slot.service';


describe('SharedSlotService', () => {
  let service: SharedSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
