import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ToastComponent } from '../toast/toast.component';
import { Status } from 'src/app/models/toastENUM';
import { Tooltip } from 'bootstrap';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/sharedService/ToastService/toast.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product!: Product;

  constructor(
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private router: Router,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {}

  addToCart(product: Product) {
    if(!this.checkIfUserLoggedIn()){
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
    this.cartItemCountService.increaseNumberOfProducts(1, product.productPrice);
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
    if(userObj !== null){
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
      },
    });
  }
}
