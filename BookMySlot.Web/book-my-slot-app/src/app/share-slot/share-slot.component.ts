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

  public slotDetails: SlotDetails;
  public timeZones: string[];
  public slotMinDate: Date;
  public slotMaxDate: Date;


  ngOnInit(): void {

    this.slotMinDate = new Date();
    this.slotMaxDate = new Date();
    this.slotMaxDate.setDate(this.slotMaxDate.getDate() + 30);
    
    this.timeZones = this.timezoneService.getTimeZones();

    this.slotDetails = new SlotDetails();
    //this.slotDetails.id = "00000000-0000-0000-0000-000000000000";
    //this.slotDetails.title = "test";
    this.slotDetails.timeZone = "India Standard Time";
    this.slotDetails.slotDate = new Date();
    this.slotDetails.startTime = this.slotDetails.slotDate;
    this.slotDetails.endTime = this.slotDetails.slotDate;

    console.log("slotDetails" + this.slotDetails);
  }

  saveSlot(slotDetailsForm: NgForm, slotDetails: SlotDetails) {
    slotDetailsForm.control.markAllAsTouched();
    console.log(slotDetailsForm.value);  
    console.log(slotDetailsForm.valid);  

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

}
