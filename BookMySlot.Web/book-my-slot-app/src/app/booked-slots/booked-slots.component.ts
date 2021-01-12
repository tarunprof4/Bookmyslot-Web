import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedSlotService } from '../services/booked-slot.service';
import { EmailService } from '../services/email.service';
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
  bookedBy: string = "26eca53c21344dea874c99cc1df9ceef";

  constructor(private bookedSlotService: BookedSlotService, private emailService: EmailService,  private slotService: SlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: BookedSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

    if (initCustomerBookedSlots instanceof ResolverError) {
    }
    else {

      this.customerBookedSlots = initCustomerBookedSlots;
      console.log(" resolver get customer booked slots " + this.customerBookedSlots);
    }
  }


  onResendEmail(bookedSlotModelInformation: string) {
    this.emailService.resendSlotInformation(bookedSlotModelInformation, this.bookedBy)
      .subscribe(
        (data: boolean) => {
          console.log(data);
        },
        (err: any) => console.log(err)
      );
  }


  onBookedSlotCancel(bookedSlotModelInformation: string, index: number) {

    this.slotService.cancelSlot(bookedSlotModelInformation, this.bookedBy)
      .subscribe(
        (data: boolean) => {
          this.customerBookedSlots.splice(index, 1);
        },
        (err: any) => console.log(err)
      );


  }



  getBookedSlots() {


    this.bookedSlotService.getCustomerBookedSlots(this.bookedBy)
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
    this.bookedSlotService.getCustomerCompletedSlots(this.bookedBy)
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
    this.bookedSlotService.getCustomerCancelledSlots(this.bookedBy)
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
