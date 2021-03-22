import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookedSlotService } from '../services/booked-slot.service';
import { EmailService } from '../services/email.service';
import { SlotService } from '../services/slot.service';
import { BookedSlot } from '../shared/booked-slot';
import { CancelledSlotInformation } from '../shared/cancelled-slot-information';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { RoutingConstants } from '../shared/constants/routing-constants';
import { ResolverError } from '../shared/resolver-error';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { ModalFailureComponent } from '../ui-controls/modal-failure/modal-failure.component';
import { ModalSuccessComponent } from '../ui-controls/modal-success/modal-success.component';

@Component({
  selector: 'app-booked-slots',
  templateUrl: './booked-slots.component.html',
  styleUrls: ['./booked-slots.component.css']
})
export class BookedSlotsComponent implements OnInit {

  routingConstants = RoutingConstants;
  customerBookedSlots: BookedSlot = new BookedSlot();
  customerCompletedSlots: BookedSlot = new BookedSlot();
  customerCancelledSlots: CancelledSlotInformation[] = [];
  resolverError: ResolverError = new ResolverError();
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  constructor(private bookedSlotService: BookedSlotService, private emailService: EmailService, private slotService: SlotService, private route: ActivatedRoute, private modalService: BsModalService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.BookedSlots);
    let initCustomerBookedSlots: BookedSlot | ResolverError = this.route.snapshot.data['resolvedCustomerBookedSlots'];

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
    this.emailService.resendSlotInformation(bookedSlotModelInformation)
      .subscribe(
        (data: boolean) => {
          this.showSuccessModal();
        },
        (err: any) => {
          this.showFailureModal(err);
        }
      );
  }


  onBookedSlotCancel(bookedSlotModelInformation: string, index: number) {

    this.slotService.cancelSlot(bookedSlotModelInformation)
      .subscribe(
        (data: boolean) => {
          this.customerBookedSlots.bookedSlotModels.splice(index, 1);
          this.showSuccessModal();
        },
        (err: any) => {
          this.showFailureModal(err);
        }
      );


  }



  getBookedSlots() {


    this.bookedSlotService.getCustomerBookedSlots()
      .subscribe(
        (data: BookedSlot) => {
          this.customerBookedSlots = data;
        },
        (err: any) => {
          this.customerBookedSlots.bookedSlotModels = [];
          if (err.statusCode != HttpStatusConstants.NotFound) {
            this.showFailureModal(err);
          }
        }
      );

  }

  getCompletedSlots() {
    this.bookedSlotService.getCustomerCompletedSlots()
      .subscribe(
        (data: BookedSlot) => {
          this.customerCompletedSlots = data;
        },
        (err: any) => {
          this.customerCompletedSlots.bookedSlotModels = [];
          if (err.statusCode != HttpStatusConstants.NotFound) {
            this.showFailureModal(err);
          }
        }
      );


  }

  getCancelledSlots() {
    this.bookedSlotService.getCustomerCancelledSlots()
      .subscribe(
        (data: CancelledSlotInformation[]) => {
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
