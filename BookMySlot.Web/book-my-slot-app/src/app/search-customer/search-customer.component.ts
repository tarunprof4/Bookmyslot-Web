import { Component, OnInit } from '@angular/core';
import { fromEvent, noop, Observable, Observer, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { ResolverError } from '../shared/resolver-error';
import { SearchCustomer } from '../shared/search-customer';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  search: string = '';
  searchedCustomers: Observable<SearchCustomer[] | ResolverError>;

  constructor(private searchService: SearchService) { }

  //ngOnInit(): void {



  //  //let searchBox = document.getElementById('search-customer-box');

  //  //let typeahead = fromEvent(searchBox, 'input').pipe(
  //  //  map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
  //  //  filter(text => text.length > 2),
  //  //  debounceTime(10),
  //  //  distinctUntilChanged(),
  //  //  switchMap(searchTerm => this.searchService.searchCustomers(searchTerm))
  //  //);

  //  //typeahead.subscribe(
  //  //  (data: SearchCustomer[]) => {
  //  //    console.log(data);
  //  //    this.searchedCustomers = data;
  //  //  },
  //  //  (err: any) => {
  //  //    console.log(err);
  //  //    this.searchedCustomers = [];
  //  //  }
  //  //);


  //}




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


  ngOnInit(): void {


    this.searchedCustomers = new Observable((observer: Observer<string>) => {
      observer.next(this.search);
    }).pipe(
      
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(searchTerm => this.searchService.searchCustomers(searchTerm))
    );

    //this.searchedCustomers.subscribe(
    //  (data: SearchCustomer[]) => {
    //    console.log(data);
    //    return of(data);
    //  },
    //  (err: any) => {
    //    console.log(err);
    //    //this.searchedcustomers = [];
    //  }
    //);

  }

  onSearchSelectedCustomer(id: string) {
    console.log(id);
  }





  selected: string;
  states: string[] = [
    'Alabama',
    'Alaska',
    
  ];


}
