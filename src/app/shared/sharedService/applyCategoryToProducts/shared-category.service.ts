import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCategoryService {
  private categoryIdSource = new BehaviorSubject<number | null>(null);
  currentCategoryId$ = this.categoryIdSource.asObservable();

  changeCategory(categoryId: number): void {
    this.categoryIdSource.next(categoryId);
  }
 
}
    