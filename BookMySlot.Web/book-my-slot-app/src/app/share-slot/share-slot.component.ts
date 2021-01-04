import { Component, OnInit } from '@angular/core';
import { SlotService } from '../services/slot.service';
import { SlotDetails } from '../shared/slot-details';
import { Time } from '@angular/common';
import { TimezoneService } from '../services/timezone.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-share-slot',
  templateUrl: './share-slot.component.html',
  styleUrls: ['./share-slot.component.css']
})
export class ShareSlotComponent implements OnInit {

  constructor(private slotService: SlotService, private timezoneService: TimezoneService) { }

  slotDetails: SlotDetails;
  timeZones: string[];

  slotMinDate: Date = this.getTodaysDate();
  slotMaxDate: Date = this.getTodaysDate();
  slotStartTime: Date | undefined = this.getTodaysDate();
  slotEndTime: Date | undefined = this.getTodaysDate();
  slotDuration: number;


  validstartTime = true;
  validendTime = true;


  ngOnInit(): void {
    this.slotDetails = new SlotDetails();
    this.slotDetails.id = "00000000-0000-0000-0000-000000000000";
    this.slotDetails.title = "";
    this.slotDetails.slotDate = this.getTodaysDate();


    this.timeZones = this.timezoneService.getTimeZones();
    this.slotDetails.timeZone = "India Standard Time";

    this.slotMaxDate.setDate(this.slotMaxDate.getDate() + 30);
    this.slotDetails.slotDate.setDate(this.slotDetails.slotDate.getDate() + 7);


    this.slotStartTime.setMinutes(this.slotDetails.slotDate.getMinutes() + 0);
    this.slotEndTime.setMinutes(this.slotDetails.slotDate.getMinutes() + 20);

    this.slotDuration = this.getSlotDuration(this.slotStartTime, this.slotEndTime);
    console.log("slotDetails" + this.slotDetails);
  }

 
  saveSlot(slotDetailsForm: NgForm) {
    this.sanitizeSlotDetails(this.slotDetails);
    slotDetailsForm.control.markAllAsTouched();
    
    console.log(slotDetailsForm.value);
    console.log("Validity check");
    console.log(slotDetailsForm.valid);

    if (slotDetailsForm.valid && this.validstartTime && this.validendTime && this.slotDuration && this.slotDuration >= 20) {

    }

    else {
      return;
    }


    return;

    this.slotDetails.id = "00000000-0000-0000-0000-000000000000";
    this.slotDetails.title = "test";
    this.slotDetails.timeZone = "India Standard Time";
    this.slotDetails.slotDate = new Date();
    //slotDetails.startTime =  Time(2,2);
    //slotDetails.endTime = "10";

    console.log("slotDetails" + this.slotDetails);
    this.slotService.saveSlotDetails(this.slotDetails)
      .subscribe(
        (data: string) => {
          console.log("saved slot Details" + data);
        },
        (err: any) => console.log(err)
      );
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
}
