import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {

  constructor(private http: HttpClient, private cartItemCountService: CartItemCountService) {}

  addProductToCart(productId: number, quantity: number): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);

    const url = `/cartitem/update/user/${userObj.userId}`;
    const cartItem = {
      product: { productId: productId },
      quantity: quantity,
    };

    this.http.put<void>(url, cartItem).subscribe(
      () => {
      },
      (error) => {
        console.error('Error adding product to cart', error);
      }
    );
  }

  addProductToCartAndIncreaseQuantityIfExists(productId: number, quantity: number): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);


    const url = `/cartitem/add/user/${userObj.userId}`;
    const cartItem = {
      product: { productId: productId },
      quantity: quantity,
    };

    this.http.put<void>(url, cartItem).subscribe(
      () => {
      },
      (error) => {
        console.error('Error adding product to cart', error);
      }
    );
  }

  deleteProductFromCart(cartItemId: number): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userObj.jwtToken}`
    );

    const url = `/cartitem/${cartItemId}`;

    this.http.delete<void>(url, { headers }).subscribe(
      () => {
      },
      (error) => {
        console.error('Error removing product from cart', error);
      }
    );
  }

  checkoutCart(): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userObj.jwtToken}`
    );
    const url = `/cartitem/checkout/user/${userObj.userId}`;
    this.http.post<void>(url, null, { headers }).subscribe(
      () => {
      },
      (error) => {
        console.error('Error checking out cart', error);
      }
    );
  }

  numberOfItemsInCart(): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    if(userObj == null){
      return;
    }

    const url = `/cartitem/count/user/${userObj.userId}`;
    
    this.http.get<CartItemCountAndTotalAmount>(url).subscribe(
      (data: any) => {
        this.cartItemCountService.changeNumberOfProducts(data);
      },
      (error) => {
        console.error('Error fetching number of items in cart:', error);
      }
    );
  }
}
