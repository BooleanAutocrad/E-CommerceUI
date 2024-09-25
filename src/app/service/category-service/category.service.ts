import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryIdAndName } from 'src/app/models/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = '/dashboard/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryIdAndName[]> {
    return this.http.get<CategoryIdAndName[]>(this.apiUrl);
  }
}
