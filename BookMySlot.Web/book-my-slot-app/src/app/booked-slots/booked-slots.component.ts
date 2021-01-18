import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedSlotService } from '../services/booked-slot.service';
import { EmailService } from '../services/email.service';
import { SlotService } from '../services/slot.service';
import { BookedSlot } from '../shared/booked-slot';
import { CancelledSlotInformation } from '../shared/cancelled-slot-information';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
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
  resolverError: ResolverError = new ResolverError();
  bookedBy: string = "10a5b1d6d1a7497eb4b59bf95e0793a2";

  constructor(private bookedSlotService: BookedSlotService, private emailService: EmailService,  private slotService: SlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: BookedSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

    if (initCustomerBookedSlots instanceof ResolverError) {
      this.resolverError = initCustomerBookedSlots;
      if (this.resolverError.statusCode == HttpStatusConstants.NotFound) {
        this.resolverError.errors = [];
      }
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
