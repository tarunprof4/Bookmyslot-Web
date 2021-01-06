import { TestBed } from '@angular/core/testing';

import { CustomerSlotService } from './customer-slot.service';

describe('CustomerSlotService', () => {
  let service: CustomerSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
