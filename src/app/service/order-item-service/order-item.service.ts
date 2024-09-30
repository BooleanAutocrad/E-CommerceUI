import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient, private cartItemCountService: CartItemCountService) {}

  buyNow(quantity: number, productId: number ,cartItemId: number): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/cartitem/buynow/user/${userObj.userId}/cartItemId/${cartItemId}`;
    var orderItem = {
      quantity: quantity,
      product:{productId: productId}
    }

    this.http.post<void>(url, orderItem).subscribe(
      () =>{
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
  }

}
