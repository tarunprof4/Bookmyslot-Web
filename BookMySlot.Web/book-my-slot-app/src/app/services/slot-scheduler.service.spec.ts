import { TestBed } from '@angular/core/testing';

import { SlotSchedulerService } from './slot-scheduler.service';

describe('SlotSchedulerService', () => {
  let service: SlotSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
