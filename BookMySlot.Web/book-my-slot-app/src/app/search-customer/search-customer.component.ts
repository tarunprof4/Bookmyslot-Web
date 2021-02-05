import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SearchCustomer } from '../shared/search-customer';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  searchedCustomers: SearchCustomer[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }




  onSearch(searchKey: string) {
    this.searchService.searchCustomers(searchKey)
      .subscribe(
        (data: SearchCustomer[]) => {
          this.searchedCustomers = data;
        },
        (err: any) => {
          this.searchedCustomers = [];
        }
      );
  }

}
