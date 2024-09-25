import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';

@Injectable({
  providedIn: 'root'
})
export class CartItemCountService {
  private numberOfProductsSource = new BehaviorSubject<CartItemCountAndTotalAmount>({
    cartItemCount: 0,
    cartTotalAmount: 0
  });
  currentNumberOfProducts = this.numberOfProductsSource.asObservable();

  constructor() { }

  changeNumberOfProducts(data: CartItemCountAndTotalAmount) {
    this.numberOfProductsSource.next(data);
  }

  increaseNumberOfProducts(updateCount: number, pricePerItem: number) {
    const currentData = this.numberOfProductsSource.value;
    const updatedData = {
      cartItemCount: currentData.cartItemCount + updateCount,
      cartTotalAmount: currentData.cartTotalAmount + (updateCount * pricePerItem)
    };
    this.numberOfProductsSource.next(updatedData);
  }

  decreaseNumberOfProducts(updateCount: number, pricePerItem: number) {
    const currentData = this.numberOfProductsSource.value;
    const updatedData = {
      cartItemCount: currentData.cartItemCount - updateCount,
      cartTotalAmount: currentData.cartTotalAmount - (updateCount * pricePerItem)
    };
    this.numberOfProductsSource.next(updatedData);
  }
}
