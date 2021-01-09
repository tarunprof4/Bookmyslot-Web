import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedSlotService } from '../services/shared-slot.service';
import { ResolverError } from '../shared/resolver-error';
import { ShareSlot } from '../shared/shared-slot';

@Component({
  selector: 'app-shared-slots',
  templateUrl: './shared-slots.component.html',
  styleUrls: ['./shared-slots.component.css']
})
export class SharedSlotsComponent implements OnInit {


  customerBookedSlots: ShareSlot[];

  constructor(private sharedSlotService: SharedSlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: ShareSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

    if (initCustomerBookedSlots instanceof ResolverError) {
    }
    else {

      this.customerBookedSlots = initCustomerBookedSlots;
      console.log(" resolver get customer booked slots " + this.customerBookedSlots);
    }
  }

}
