import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cart } from 'src/app/models/cart/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private http: HttpClient) {}

  getCartForUser(): Observable<Cart> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/cart/user/${userObj.userId}`;
    return this.http.get<Cart>(url);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
