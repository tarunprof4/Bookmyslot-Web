import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerSlotService } from '../services/customer-slot.service';
import { CustomerSlots } from '../shared/customer-slots';
import { ResolverError } from '../shared/resolver-error';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit {

  initCustomerAvailableSlots: CustomerSlots;

  constructor(private customerSlotService: CustomerSlotService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let initCustomerAvailableSlots: CustomerSlots | ResolverError = this.route.snapshot.data['resolvedBookCustomerSlots'];

    if (initCustomerAvailableSlots instanceof ResolverError) {
    }
    else {

      this.initCustomerAvailableSlots = initCustomerAvailableSlots;
      console.log(" resolver get customer slots " + this.initCustomerAvailableSlots);
    }



  }

}
