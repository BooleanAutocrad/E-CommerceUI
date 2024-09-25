import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ToastComponent } from '../toast/toast.component';
import { Status } from 'src/app/models/toastENUM';
import { Tooltip } from 'bootstrap';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements AfterViewInit {
  @Input()
  product!: Product;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => {
      return new Tooltip(tooltipTriggerEl);
    });
  }

  addToCart(product: Product) {
    this.cartItemService.addProductToCartAndIncreaseQuantityIfExists(
      product.productId,
      1
    );
    this.cartItemCountService.increaseNumberOfProducts(1, product.productPrice);
    this.toastComponent.showToast(
      'Product added to cart',
      `${product.productName} added to cart`,
      Status.Success,
      'Just now',
      ''
    );
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
