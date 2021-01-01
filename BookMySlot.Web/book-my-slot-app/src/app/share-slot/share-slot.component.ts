import { Component, OnInit } from '@angular/core';
import { SlotService } from '../services/slot.service';
import { SlotDetails } from '../shared/slot-details';

@Component({
  selector: 'app-share-slot',
  templateUrl: './share-slot.component.html',
  styleUrls: ['./share-slot.component.css']
})
export class ShareSlotComponent implements OnInit {

  constructor(private slotService: SlotService) { }

  ngOnInit(): void {
  }

  saveSlot(slotDetails: SlotDetails) {

    this.slotService.saveSlotDetails(slotDetails)
      .subscribe(
        (data: string) => {
          console.log("saved slot Details" + data);
        },
        (err: any) => console.log(err)
      );
  }

}
