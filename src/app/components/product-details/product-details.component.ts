import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductDetails } from 'src/app/models/product/productDetails';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { ProductService } from 'src/app/service/product-service/product.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ToastComponent } from '../toast/toast.component';
import { Status } from 'src/app/models/toastENUM';
import { Tooltip } from 'bootstrap';
import { ToastService } from 'src/app/shared/sharedService/ToastService/toast.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  productId: number;
  product!: ProductDetails;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private toastService: ToastService,
    public dialog: MatDialog
  ) {
    this.productId = data.productId;
  }
  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => {
      return new Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService
      .getProductDetailsByProductId(this.productId)
      .subscribe((data) => {
        this.product = data;
        console.log(data);
      });
  }

  addToCart(product: ProductDetails) {
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

  onReviewChange(review: any) {
    this.getProductDetails();
  }
}
