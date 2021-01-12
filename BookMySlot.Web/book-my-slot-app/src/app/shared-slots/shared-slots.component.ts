import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../services/email.service';
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

  sharedSlotBy: string = "10a5b1d6d1a7497eb4b59bf95e0793a2";

  constructor(private sharedSlotService: SharedSlotService, private emailService: EmailService, private slotService: SlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: ShareSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

    if (initCustomerBookedSlots instanceof ResolverError) {
    }
    else {

      this.customerBookedSlots = initCustomerBookedSlots;
      console.log(" resolver get customer booked slots " + this.customerBookedSlots);
    }
  }




  


  onResendEmail(sharedSlotModelInformation: string,) {
    this.emailService.resendSlotInformation(sharedSlotModelInformation, this.sharedSlotBy)
      .subscribe(
        (data: boolean) => {
          console.log(data);
        },
        (err: any) => console.log(err)
      );
  }


  onBookedSlotCancel(sharedSlotModelInformation: string, index: number) {
    

    this.slotService.cancelSlot(sharedSlotModelInformation, this.sharedSlotBy)
      .subscribe(
        (data: boolean) => {
          this.customerBookedSlots.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

  onYetToBeBookedSlotCancel(sharedSlotModelInformation: string, index: number) {
    

    this.slotService.cancelSlot(sharedSlotModelInformation, this.sharedSlotBy)
      .subscribe(
        (data: boolean) => {
          this.customerYetToBeBookedSlots.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }


  getBookedSlots() {
    

    this.sharedSlotService.getCustomerBookedSlots(this.sharedSlotBy)
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
    

    this.sharedSlotService.getCustomerYetToBeBookedSlots(this.sharedSlotBy)
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
    

    this.sharedSlotService.getCustomerCompletedSlots(this.sharedSlotBy)
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
    

    this.sharedSlotService.getCustomerCancelledSlots(this.sharedSlotBy)
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
