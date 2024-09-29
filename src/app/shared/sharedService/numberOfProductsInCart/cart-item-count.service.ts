import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';
import { ProductDTO } from 'src/app/models/cart/ProductDTO';

@Injectable({
  providedIn: 'root',
})
export class CartItemCountService {
  private numberOfProductsSource =
    new BehaviorSubject<CartItemCountAndTotalAmount>({
      cartItemCount: 0,
      cartTotalAmount: 0,
      products: [],
    });
  currentNumberOfProducts = this.numberOfProductsSource.asObservable();

  constructor() {}

  changeNumberOfProducts(data: CartItemCountAndTotalAmount) {
    this.numberOfProductsSource.next(data);
  }

  increaseNumberOfProducts(
    updateCount: number,
    pricePerItem: number,
    productId: number,
    productName: string
  ) {
    const currentData = this.numberOfProductsSource.value;
    const updatedProducts = Array.isArray(currentData.products)
      ? [...currentData.products]
      : [];

    const existingProduct = updatedProducts.find(
      (p) => p.productId === productId
    );

    if (!existingProduct) {
      const newProduct: ProductDTO = {
        productId,
        productName,
        productCount: updateCount,
      };
      updatedProducts.push(newProduct);
    } else {
      existingProduct.productCount += updateCount;
    }

    const updatedData = {
      cartItemCount: currentData.cartItemCount + updateCount,
      cartTotalAmount: currentData.cartTotalAmount + updateCount * pricePerItem,
      products: updatedProducts,
    };
    this.numberOfProductsSource.next(updatedData);
  }

  decreaseNumberOfProducts(
    updateCount: number,
    pricePerItem: number,
    productId: number
  ) {
    const currentData = this.numberOfProductsSource.value;
    const updatedProducts = Array.isArray(currentData.products)
      ? [...currentData.products]
      : [];

    const productIndex = updatedProducts.findIndex(
      (p) => p.productId === productId
    );

    if (productIndex > -1) {
      const existingProduct = updatedProducts[productIndex];
      existingProduct.productCount -= updateCount;
      if (existingProduct.productCount <= 0) {
        updatedProducts.splice(productIndex, 1);
      }
    }

    const updatedData = {
      cartItemCount: currentData.cartItemCount - updateCount,
      cartTotalAmount: currentData.cartTotalAmount - updateCount * pricePerItem,
      products: updatedProducts,
    };

    this.numberOfProductsSource.next(updatedData);
  }
}
