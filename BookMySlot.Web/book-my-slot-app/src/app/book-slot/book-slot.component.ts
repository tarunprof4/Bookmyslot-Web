import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlotSchedulerService } from '../services/slot-scheduler.service';
import { BookSlots } from '../shared/book-slots';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { ResolverError } from '../shared/resolver-error';
import { SlotScheduler } from '../shared/slot-scheduler';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit {

  customerAvailableSlots: BookSlots = new BookSlots();
  resolverError: ResolverError = new ResolverError();

  constructor(private slotSchedulerService: SlotSchedulerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerAvailableSlots.slotModelsInforamtion = [];
    let initCustomerAvailableSlots: BookSlots | ResolverError = this.route.snapshot.data['resolvedBookCustomerSlots'];

    if (initCustomerAvailableSlots instanceof ResolverError) {
      this.resolverError = initCustomerAvailableSlots;
      if (this.resolverError.statusCode == HttpStatusConstants.NotFound) {
        this.resolverError.errors = [];
      }
    }
    else {

      this.customerAvailableSlots = initCustomerAvailableSlots;
      console.log(" resolver get customer slots " + this.customerAvailableSlots);
    }
  }



  onBook(slotInformation: string, index: number) {

    console.log("customer slot info " + index);
    let slotScheduler = new SlotScheduler();
    slotScheduler.slotModelKey = slotInformation;
    
    this.slotSchedulerService.scheduleSlot(slotScheduler)
      .subscribe(
        (data: boolean) => {
          this.customerAvailableSlots.slotModelsInforamtion.splice(index, 1);

          console.log("get customer slots " + data);
          
          console.log(data);
        },
        (err: any) => console.log(err)
      );



  }

}
