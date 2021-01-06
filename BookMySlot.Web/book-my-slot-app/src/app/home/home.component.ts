import { Component, OnInit } from '@angular/core';
import { CustomerSlotService } from '../services/customer-slot.service';
import { CustomerSlots } from '../shared/customer-slots';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customerSlots: CustomerSlots;

  constructor(private customerSlotService: CustomerSlotService) { }

  ngOnInit(): void {

    this.customerSlotService.getCustomerSlotDetails(0,1)
      .subscribe(
        (data: CustomerSlots) => {
          console.log("get customer slots " + data);
          this.customerSlots = data;
          console.log(this.customerSlots);
        },
        (err: any) => console.log(err)
    );

  }

}
