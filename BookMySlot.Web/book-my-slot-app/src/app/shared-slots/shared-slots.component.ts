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


  customerBookedSlots: ShareSlot[] = [];
  customerYetToBeBookedSlots: ShareSlot[] = [];
  customerCompletedSlots: ShareSlot[] = [];
  customerCancelledSlots: ShareSlot[] = [];

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




  


  onResendEmail() {

  }


  onBookedSlotCancel() {

  }

  onYetToBeBookedSlotCancel() {

  }


  getBookedSlots() {
    var key = "10a5b1d6d1a7497eb4b59bf95e0793a2";

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
    var key = "10a5b1d6d1a7497eb4b59bf95e0793a2";

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
    var key = "10a5b1d6d1a7497eb4b59bf95e0793a2";

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
    var key = "10a5b1d6d1a7497eb4b59bf95e0793a2";

    this.sharedSlotService.getCustomerCancelledSlots(key)
      .subscribe(
        (data: ShareSlot[]) => {
          this.customerCancelledSlots = data;

          console.log("got getCompletedSlots " + this.customerYetToBeBookedSlots);

          console.log(data);
        },
        (err: any) => console.log(err)
      );

  }

}
