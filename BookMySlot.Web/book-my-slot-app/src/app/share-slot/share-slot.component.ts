import { Component, OnInit } from '@angular/core';
import { SlotService } from '../services/slot.service';
import { SlotDetails } from '../shared/slot-details';
import { TimezoneService } from '../services/timezone.service';
import { NgForm } from '@angular/forms';
import { SlotConstants } from '../shared/constants/slot-constants';
import { TimezoneConstants } from '../shared/constants/timezone-constants';
import { AppMessagesConstants } from '../shared/constants/app-messages-constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { ModalSuccessComponent } from '../ui-controls/modal-success/modal-success.component';
import { ModalFailureComponent } from '../ui-controls/modal-failure/modal-failure.component';
import { Title } from '@angular/platform-browser';
import { PageTitleConstants } from '../shared/constants/page-title-constants';

@Component({
  selector: 'app-share-slot',
  templateUrl: './share-slot.component.html',
  styleUrls: ['./share-slot.component.css']
})
export class ShareSlotComponent implements OnInit {

  constructor(private slotService: SlotService, private timezoneService: TimezoneService, private modalService: BsModalService, private title: Title) { }

  slotDetails: SlotDetails;
  timeZones: string[];

  slotDate: Date = this.getTodaysDate();
  slotMinDate: Date = this.getTodaysDate();
  slotMaxDate: Date = this.getTodaysDate();
  slotStartTime: Date | undefined = this.getTodaysDate();
  slotEndTime: Date | undefined = this.getTodaysDate();
  slotDuration: number;


  validstartTime = true;
  validendTime = true;

  validationErrors: string[] = [];
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.ShareSlot);
    this.slotDetails = new SlotDetails();
    this.slotDetails.title = "";


    this.timeZones = this.timezoneService.getTimeZones();
    this.slotDetails.timeZone = TimezoneConstants.India;

    this.slotMaxDate.setDate(this.slotMaxDate.getDate() + SlotConstants.SlotLastDateDifference);
    this.slotDate.setDate(this.slotDate.getDate() + SlotConstants.DefaultSlotDateDifference);


    this.slotStartTime.setMinutes(this.slotDate.getMinutes());
    this.slotEndTime.setMinutes(this.slotDate.getMinutes() + SlotConstants.DefaultSlotDurationDifference);

    this.slotDuration = this.getSlotDuration(this.slotStartTime, this.slotEndTime);

  }


  saveSlot(slotDetailsForm: NgForm) {
    this.validationErrors.length = 0;
    this.sanitizeSlotDetails(this.slotDetails);
    slotDetailsForm.control.markAllAsTouched();

    if (!this.ValidateFormDetails(this.slotStartTime, this.slotEndTime)) {
      return;
    }

    if (slotDetailsForm.valid && this.validstartTime && this.validendTime && this.slotDuration && this.slotDuration >= SlotConstants.DefaultSlotDurationDifference) {
      this.slotService.saveSlotDetails(this.slotDetails, this.slotDate, this.slotStartTime, this.slotEndTime)
        .subscribe(
          (data: string) => {
            let successModalComponent = this.modalComponent.getSuccessModalComponent();
            this.bsModalRef = this.modalService.show(ModalSuccessComponent);
            this.bsModalRef.content.title = successModalComponent.title;
            this.bsModalRef.content.bodyItems = successModalComponent.bodyItems;
          },
          (err: any) => {
            console.log(err);
            let failureModalComponent = this.modalComponent.getFailureModalComponent();
            this.bsModalRef = this.modalService.show(ModalFailureComponent);
            this.bsModalRef.content.title = failureModalComponent.title;
            this.bsModalRef.content.bodyItems = err.errors;
          }
        );
    }
  }



  onStartTimechange(slotStartTime: Date): void {
    this.slotDuration = this.getSlotDuration(slotStartTime, this.slotEndTime);
  }


  onEndTimechange(slotEndTime: Date): void {
    this.slotDuration = this.getSlotDuration(this.slotStartTime, slotEndTime);
  }


  private getSlotDuration(slotStartTime: Date, slotEndTime: Date): number {
    if (slotStartTime && slotEndTime) {
      let slotDuration = (slotEndTime.getHours() - slotStartTime.getHours()) * 60 + slotEndTime.getMinutes() - slotStartTime.getMinutes();
      if (slotDuration >= 0) {
        return slotDuration;
      }
    }

    return undefined;
  }


  private getTodaysDate(): Date {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private sanitizeSlotDetails(slotDetails: SlotDetails): void {
    slotDetails.title = slotDetails.title.trim();
  }

  private ValidateFormDetails(slotStartTime: Date, slotEndTime: Date): boolean {
    let areFormDetailsValid = true;
    let slotDuration = this.getSlotDuration(slotStartTime, slotEndTime);
    if (!slotDuration || slotDuration < SlotConstants.DefaultSlotDurationDifference) {
      this.validationErrors.push(AppMessagesConstants.InvalidSlotDuration);

      areFormDetailsValid = false;
    }
    return areFormDetailsValid;
  }
}
