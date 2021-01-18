import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmailService } from '../services/email.service';
import { SharedSlotService } from '../services/shared-slot.service';
import { SlotService } from '../services/slot.service';
import { CancelledSlotDetails } from '../shared/cancelled-slot-details';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { ResolverError } from '../shared/resolver-error';
import { ShareSlot } from '../shared/shared-slot';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { ModalFailureComponent } from '../ui-controls/modal-failure/modal-failure.component';
import { ModalSuccessComponent } from '../ui-controls/modal-success/modal-success.component';

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
  resolverError: ResolverError = new ResolverError();
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  sharedSlotBy: string = "26eca53c21344dea874c99cc1df9ceef";

  constructor(private sharedSlotService: SharedSlotService, private emailService: EmailService, private slotService: SlotService, private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {

    let initCustomerBookedSlots: ShareSlot[] | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

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







  onResendEmail(sharedSlotModelInformation: string) {
    this.emailService.resendSlotInformation(sharedSlotModelInformation, this.sharedSlotBy)
      .subscribe(
        (data: boolean) => {
          this.showSuccessModal();
        },
        (err: any) => {
          this.showFailureModal(err);
        }
      );
  }


  onBookedSlotCancel(sharedSlotModelInformation: string, index: number) {


    this.slotService.cancelSlot(sharedSlotModelInformation, this.sharedSlotBy)
      .subscribe(
        (data: boolean) => {
          this.customerBookedSlots.splice(index, 1);
          this.showSuccessModal();
        },
        (err: any) => {
          this.showFailureModal(err);
        }
      );
  }

  onYetToBeBookedSlotCancel(sharedSlotModelInformation: string, index: number) {


    this.slotService.cancelSlot(sharedSlotModelInformation, this.sharedSlotBy)
      .subscribe(
        (data: boolean) => {
          this.customerYetToBeBookedSlots.splice(index, 1);
          this.showSuccessModal();
        },
        (err: any) => {
          this.showFailureModal(err);
        }
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
        (err: any) => {
          this.customerBookedSlots = [];
          if (err.statusCode != HttpStatusConstants.NotFound) {
            this.showFailureModal(err);
          }
        }
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
        (err: any) => {
          this.customerYetToBeBookedSlots = [];
          if (err.statusCode != HttpStatusConstants.NotFound) {
            this.showFailureModal(err);
          }
        }
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
        (err: any) => {
          this.customerCompletedSlots = [];
          if (err.statusCode != HttpStatusConstants.NotFound) {
            this.showFailureModal(err);
          }
        }
      );


  }

  getCancelledSlots() {


    this.sharedSlotService.getCustomerCancelledSlots(this.sharedSlotBy)
      .subscribe(
        (data: CancelledSlotDetails[]) => {
          this.customerCancelledSlots = data;
        },
        (err: any) => {
          this.customerCancelledSlots = [];
          if (err.statusCode != HttpStatusConstants.NotFound) {
            this.showFailureModal(err);
          }
        }
      );

  }


  private showSuccessModal() {
    let successModalComponent = this.modalComponent.getSuccessModalComponent();
    this.bsModalRef = this.modalService.show(ModalSuccessComponent);
    this.bsModalRef.content.title = successModalComponent.title;
    this.bsModalRef.content.bodyItems = successModalComponent.bodyItems;
  }

  private showFailureModal(err: any) {
    let failureModalComponent = this.modalComponent.getFailureModalComponent();
    this.bsModalRef = this.modalService.show(ModalFailureComponent);
    this.bsModalRef.content.title = failureModalComponent.title;
    this.bsModalRef.content.bodyItems = err.errors;
  }

}
