import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerSlotService } from '../services/customer-slot.service';
import { PaginationConstants } from '../shared/constants/pagination-constants';
import { CustomerSlots } from '../shared/customer-slots';
import { ResolverError } from '../shared/resolver-error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customerSlots: CustomerSlots;

  constructor(private customerSlotService: CustomerSlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerSlots: CustomerSlots | ResolverError = this.route.snapshot.data['resolvedCustomerSlots'];

    if (initCustomerSlots instanceof ResolverError) {
    }
    else {
      
      this.customerSlots = initCustomerSlots;
      console.log(" resolver get customer slots " + this.customerSlots);
    }

  }


  onLoad() {
    this.customerSlotService.getCustomerSlotDetails(1, PaginationConstants.PageSize)
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
