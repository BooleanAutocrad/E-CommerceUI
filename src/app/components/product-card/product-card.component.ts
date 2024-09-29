import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { Status } from 'src/app/models/toastENUM';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/sharedService/ToastService/toast.service';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';
import { ProductDTO } from 'src/app/models/cart/ProductDTO';
import { Cart } from 'src/app/models/cart/Cart';
import { CartService } from 'src/app/service/cart-service/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;

  @Input()
  productsInCart!: ProductDTO[];
  cart: Cart | undefined | null;
  private previousCart: Cart | undefined;

  constructor(
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private router: Router,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
  }

  disableIncreaseButton(product: Product): boolean {
    return product.productStock === this.getProductQuantity(product.productId);
  }

  isProductInCart(productId: number): boolean {
    if (!this.productsInCart) {
      return false;
    }
    return this.productsInCart.some((item) => item.productId === productId);
  }
  

  increaseQuantity(product: Product) {
    this.cartItemService.addProductToCartAndIncreaseQuantityIfExists(
      product.productId,
      1
    );
    this.cartItemCountService.increaseNumberOfProducts(
      1,
      product.productPrice,
      product.productId,
      product.productName
    );
  }

  decreaseQuantity(product: Product) {
    const productInCart = this.productsInCart.find(
      (item) => item.productId === product.productId
    );
    if (productInCart){
      const updatedStock = productInCart.productCount - 1;
      this.cartItemService.addProductToCart(product.productId, updatedStock);
    }
    this.cartItemCountService.decreaseNumberOfProducts(
      1,
      product.productPrice,
      product.productId
    );
  }

  getProductQuantity(productId: number): number {
    const productInCart = this.productsInCart.find(
      (item) => item.productId === productId
    );
    return productInCart ? productInCart.productCount : 0;
  }

  addToCart(product: Product) {
    if (!this.checkIfUserLoggedIn()) {
      this.toastService.showToast(
        'Login Required',
        'Please login to add product to cart',
        Status.Error,
        'Just now',
        ''
      );
      this.router.navigate(['/login']);
    }
    this.cartItemService.addProductToCartAndIncreaseQuantityIfExists(
      product.productId,
      1
    );
    this.cartItemCountService.increaseNumberOfProducts(
      1,
      product.productPrice,
      product.productId,
      product.productName
    );
    this.toastService.showToast(
      'Product added to cart',
      `${product.productName} added to cart`,
      Status.Success,
      'Just now',
      ''
    );
  }

  private checkIfUserLoggedIn(): boolean {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    if (userObj !== null) {
      return true;
    } else {
      return false;
    }
  }

  openProductDetails(productId: number) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '60vw',
      height: '86vh',
      data: {
        productId: productId,
        productsInCart: this.productsInCart,
      },
    });
  }
}
