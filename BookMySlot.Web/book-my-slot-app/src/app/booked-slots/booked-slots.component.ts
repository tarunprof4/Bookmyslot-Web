import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedSlotService } from '../services/booked-slot.service';
import { SlotService } from '../services/slot.service';
import { BookedSlot } from '../shared/booked-slot';
import { CancelledSlotInformation } from '../shared/cancelled-slot-information';
import { ResolverError } from '../shared/resolver-error';

@Component({
  selector: 'app-booked-slots',
  templateUrl: './booked-slots.component.html',
  styleUrls: ['./booked-slots.component.css']
})
export class BookedSlotsComponent implements OnInit {

  customerBookedSlots: BookedSlot[] = [];
  customerCompletedSlots: BookedSlot[] = [];
  customerCancelledSlots: CancelledSlotInformation[] = [];

  constructor(private bookedSlotService: BookedSlotService, private slotService: SlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: BookedSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

    if (initCustomerBookedSlots instanceof ResolverError) {
    }
    else {

      this.customerBookedSlots = initCustomerBookedSlots;
      console.log(" resolver get customer booked slots " + this.customerBookedSlots);
    }
  }


  onResendEmail() {

  }


  onBookedSlotCancel() {

    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.slotService.cancelSlot("", key)
      .subscribe(
        (data: boolean) => {
          console.log("deleted slot " + data);
        },
        (err: any) => console.log(err)
      );


  }



  getBookedSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.bookedSlotService.getCustomerBookedSlots(key)
      .subscribe(
        (data: BookedSlot[]) => {
          this.customerBookedSlots = data;

          console.log("got getBookedSlots " + this.customerBookedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );

  }

  

  getCompletedSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";

    this.bookedSlotService.getCustomerCompletedSlots(key)
      .subscribe(
        (data: BookedSlot[]) => {
          this.customerCompletedSlots = data;

          console.log("got getCompletedSlots " + this.customerCompletedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );


  }

  getCancelledSlots() {
    var key = "26eca53c21344dea874c99cc1df9ceef";
    this.bookedSlotService.getCustomerCancelledSlots(key)
      .subscribe(
        (data: CancelledSlotInformation[]) => {
          this.customerCancelledSlots = data;

          console.log("got getCompletedSlots " + this.customerCompletedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );


  }

}
