import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { ResolverError } from '../shared/resolver-error';
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



    let searchBox = document.getElementById('search-customer-box');

    let typeahead = fromEvent(searchBox, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(searchTerm => this.searchService.searchCustomers(searchTerm))
    );

    typeahead.subscribe(
      (data: SearchCustomer[]) => {
        console.log(data);
        this.searchedCustomers = data;
      },
      (err: any) => {
        console.log(err);
        this.searchedCustomers = [];
      }
    );


  }




  //onSearch(searchKey: string): Observable<SearchCustomer[] | ResolverError > {
  //  this.searchService.searchCustomers(searchKey)
  //    .subscribe(
  //      (data: SearchCustomer[]) => {
  //        this.searchedCustomers = data;
  //      },
  //      (err: any) => {
  //        this.searchedCustomers = [];
  //      }
  //    );
  //}



  onSearchSelectedCustomer(id: string) {
    console.log(id);
  }




}
