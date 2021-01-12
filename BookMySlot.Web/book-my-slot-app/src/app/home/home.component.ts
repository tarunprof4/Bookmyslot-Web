import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private getFeed: boolean = true;
  private paginationIndex: number = PaginationConstants.StartPage;
  customerSlots: CustomerSlots[];

  constructor(private customerSlotService: CustomerSlotService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let initCustomerSlots: CustomerSlots[] | ResolverError = this.route.snapshot.data['resolvedHomeSlots'];

    if (initCustomerSlots instanceof ResolverError) {
    }
    else {

      this.customerSlots = initCustomerSlots;
      console.log(" resolver get all customer slots " + this.customerSlots);
    }

  }


  onBook(customerSlotInformation: string) {
    console.log("customer slot info " + customerSlotInformation);
    this.router.navigate(['/book-slot/' + customerSlotInformation]);
    
  }

  onScroll() {
    console.log('scrolled!!');
  }

  getFeeds() {

    if (this.getFeed) {

      this.paginationIndex = this.paginationIndex + 1;
      this.customerSlotService.getDistinctCustomersNearestSlotFromToday(this.paginationIndex, PaginationConstants.PageSize)
        .subscribe(
          (data: CustomerSlots[]) => {
            this.customerSlots = this.customerSlots.concat(data);
          },
          (err: any) => {
            console.log("no more records");
            this.getFeed = false;
          }
        );



    }


  }
}
