import { Component, OnInit } from '@angular/core';
import { fromEvent, noop, Observable, Observer, of, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { ResolverError } from '../shared/resolver-error';
import { SearchCustomer } from '../shared/search-customer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { SearchConstants } from '../shared/constants/search-constants';


@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  searchText: string = '';
  searchedCustomers$: Observable<SearchCustomer[] | ResolverError>;

  searchedCustomers: SearchCustomer[] = [];
  searchedErrors: string[] = [];

  searchConstants = SearchConstants;
  
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {


    let searchBox = document.getElementById('search-customer-box');

    let typeahead = fromEvent(searchBox, 'input').pipe(


      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),

      debounceTime(1000),
      distinctUntilChanged(),


      switchMap((term: string) => {
        this.searchedErrors = [];
        this.searchText = term;
        if (!term || term.length < this.searchConstants.SearchCustomerMinimumCharacters) {
          return of([]);
        }
        return this.searchService.searchCustomers(term).pipe(
          catchError((err: ResolverError) => {
            this.searchedErrors = err.errors;
            return of([]);
          })
        );
      }),
    );



    typeahead.subscribe(
      (data: SearchCustomer[]) => {
        console.log("success");
        this.searchedCustomers = data;
      },
      //(err: ResolverError) => {
      //  console.log("fail");
      //  console.log(err);
      //  this.searchedCustomers = []
      //  //this.searchedCustomers = err.errors;
      //},
      //() => {
      //  console.log("complete");
      //  //this.searchedCustomers = err.errors;
      //},
    );


  }







  onSearchSelectedCustomer(id: string) {
    console.log(id);
  }






}
