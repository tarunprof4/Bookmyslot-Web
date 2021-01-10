import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedSlotService } from '../services/shared-slot.service';
import { SlotService } from '../services/slot.service';
import { CancelledSlotDetails } from '../shared/cancelled-slot-details';
import { ResolverError } from '../shared/resolver-error';
import { ShareSlot } from '../shared/shared-slot';

@Component({
  selector: 'app-shared-slots',
  templateUrl: './shared-slots.component.html',
  styleUrls: ['./shared-slots.component.css']
})
export class SharedSlotsComponent implements OnInit {


  customerBookedSlots: ShareSlot[] = [];
  customerYetToBeBookedSlots: ShareSlot[] = [];
  customerCompletedSlots: ShareSlot[] = [];
  customerCancelledSlots: CancelledSlotDetails[] = [];

  constructor(private sharedSlotService: SharedSlotService, private slotService: SlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: ShareSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

    if (initCustomerBookedSlots instanceof ResolverError) {
    }
    else {

      this.customerBookedSlots = initCustomerBookedSlots;
      console.log(" resolver get customer booked slots " + this.customerBookedSlots);
    }
  }




  


  onResendEmail() {

  }


  onBookedSlotCancel(sharedSlotModelInformation: string) {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.slotService.cancelSlot(sharedSlotModelInformation, key)
      .subscribe(
        (data: boolean) => {
          console.log("deleted slot " + data);
        },
        (err: any) => console.log(err)
      );
  }

  onYetToBeBookedSlotCancel(sharedSlotModelInformation: string) {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.slotService.cancelSlot(sharedSlotModelInformation, key)
      .subscribe(
        (data: boolean) => {
          console.log("deleted slot " + data);
        },
        (err: any) => console.log(err)
      );
  }


  getBookedSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.sharedSlotService.getCustomerBookedSlots(key)
      .subscribe(
        (data: ShareSlot[]) => {
          this.customerBookedSlots = data;

          console.log("got getBookedSlots " + this.customerYetToBeBookedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );

  }

  getYetToBeBookedSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.sharedSlotService.getCustomerYetToBeBookedSlots(key)
      .subscribe(
        (data: ShareSlot[]) => {
          this.customerYetToBeBookedSlots = data;

          console.log("got getYetToBeBooked " + this.customerYetToBeBookedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );

  }

  getCompletedSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.sharedSlotService.getCustomerCompletedSlots(key)
      .subscribe(
        (data: ShareSlot[]) => {
          this.customerCompletedSlots = data;

          console.log("got getCompletedSlots " + this.customerYetToBeBookedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );


  }

  getCancelledSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.sharedSlotService.getCustomerCancelledSlots(key)
      .subscribe(
        (data: CancelledSlotDetails[]) => {
          this.customerCancelledSlots = data;

          console.log("got getCompletedSlots " + this.customerYetToBeBookedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );

  }

}
