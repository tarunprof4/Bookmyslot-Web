import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
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



    //let searchBox = document.getElementById('search-customer-box');

    //let typeahead = fromEvent(searchBox, 'input').pipe(
    //  map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
    //  filter(text => text.length > 2),
    //  debounceTime(10),
    //  distinctUntilChanged(),
    //  switchMap(searchTerm => ajax(`/api/endpoint?search=${searchTerm}`))
    //);

    //typeahead.subscribe(data => {
    //  // Handle the data from the API
    //});


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



  onSearchSelectedCustomer(id: string) {
    console.log(id);
  }




}
