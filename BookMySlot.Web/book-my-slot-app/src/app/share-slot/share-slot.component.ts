import { Component, OnInit } from '@angular/core';
import { SlotService } from '../services/slot.service';
import { SlotDetails } from '../shared/slot-details';
import { TimezoneService } from '../services/timezone.service';
import { NgForm } from '@angular/forms';
import { SlotConstants } from '../shared/constants/slot-constants';
import { TimezoneConstants } from '../shared/constants/timezone-constants';

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
    this.slotDetails.title = "";
    this.slotDetails.slotDate = this.getTodaysDate();


    this.timeZones = this.timezoneService.getTimeZones();
    this.slotDetails.timeZone = TimezoneConstants.India;

    this.slotMaxDate.setDate(this.slotMaxDate.getDate() + SlotConstants.SlotLastDateDifference);
    this.slotDetails.slotDate.setDate(this.slotDetails.slotDate.getDate() + SlotConstants.SlotDateDifference);


    this.slotStartTime.setMinutes(this.slotDetails.slotDate.getMinutes());
    this.slotEndTime.setMinutes(this.slotDetails.slotDate.getMinutes() + SlotConstants.SlotEndTimeDifference);

    this.slotDuration = this.getSlotDuration(this.slotStartTime, this.slotEndTime);
    
  }

 
  saveSlot(slotDetailsForm: NgForm) {
    this.sanitizeSlotDetails(this.slotDetails);
    slotDetailsForm.control.markAllAsTouched();
    
    if (slotDetailsForm.valid && this.validstartTime && this.validendTime && this.slotDuration && this.slotDuration >= SlotConstants.SlotEndTimeDifference) {
      this.slotService.saveSlotDetails(this.slotDetails, this.slotStartTime, this.slotEndTime)
        .subscribe(
          (data: string) => {
            console.log("saved slot Details" + data);
          },
          (err: any) => console.log(err)
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
}
