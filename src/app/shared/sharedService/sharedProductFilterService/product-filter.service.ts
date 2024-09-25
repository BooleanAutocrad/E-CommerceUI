import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  public filterStateSubject = new BehaviorSubject<any>({
    filterCondition: { condition: 'gt', price: 0.0 },
    categoryId: null,
    searchText: ''
  });

  filterState$ = this.filterStateSubject.asObservable();

  constructor() { }

  updateFilterCondition(condition: any) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      filterCondition: condition
    });
  }

  changeCategory(categoryId: number): void {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      categoryId: categoryId
    });
  }

  updateSearchText(searchText: string) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      searchText: searchText
    });
  }
}
