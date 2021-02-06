import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerSlotService } from '../services/customer-slot.service';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { PaginationConstants } from '../shared/constants/pagination-constants';
import { CustomerSlots } from '../shared/customer-slots';
import { ResolverError } from '../shared/resolver-error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  customerSlots: CustomerSlots[] = [];
  resolverError: ResolverError = new ResolverError();

  constructor(private customerSlotService: CustomerSlotService, private route: ActivatedRoute, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.Home);
    let initCustomerSlots: CustomerSlots[] | ResolverError = this.route.snapshot.data['resolvedHomeSlots'];

    if (initCustomerSlots instanceof ResolverError) {
      this.resolverError = initCustomerSlots;
      if (this.resolverError.statusCode == HttpStatusConstants.NotFound) {
        this.resolverError.errors = [];
      }

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

  getFeeds() {
    this.customerSlotService.getDistinctCustomersNearestSlotFromToday(1, PaginationConstants.PageSize)
      .subscribe(
        (data: CustomerSlots[]) => {
          console.log("get customer slots " + data);
          this.customerSlots = data;
          console.log(this.customerSlots);
        },
        (err: any) => console.log(err)
      );
  }
}
