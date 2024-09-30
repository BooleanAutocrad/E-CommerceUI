import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDetails } from 'src/app/models/product/productDetails';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { ProductService } from 'src/app/service/product-service/product.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ToastComponent } from '../toast/toast.component';
import { Status } from 'src/app/models/toastENUM';
import { Tooltip } from 'bootstrap';
import { ToastService } from 'src/app/shared/sharedService/ToastService/toast.service';
import { ProductDTO } from 'src/app/models/cart/ProductDTO';
import { Product } from 'src/app/models/product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  productId: number;
  productsInCart: ProductDTO[] ;
  product!: ProductDetails;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  checkIfProductInStockIfNoThenDisable :boolean= false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private toastService: ToastService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductDetailsComponent>
  ) {
    this.productId = data.productId;
    this.productsInCart = data.productsInCart;
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
    if(this.isProductInCart(product.productId)){
      this.productsInCart = this.productsInCart.map((item) => {
        if (item.productId === product.productId) {
          return {
            ...item,
            productCount: item.productCount + 1,
          };
        }
        return item;
      });
    } else {
      this.productsInCart.push({
        productId: product.productId,
        productName: product.productName,
        productCount: 1,
      });
    }

    this.checkIfProductInStockIfNoThenDisable = false;
    
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
    if (productInCart) {
      const updatedStock = productInCart.productCount - 1;
      this.cartItemService.addProductToCart(product.productId, updatedStock);
      if(updatedStock === 0){
        this.checkIfProductInStockIfNoThenDisable = true;
      }
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
  getProductDetails() {
    this.productService
      .getProductDetailsByProductId(this.productId)
      .subscribe((data) => {
        this.product = data;
      });
  }

  addToCart(product: ProductDetails) {

    if (!this.checkIfUserLoggedIn()) {
      this.toastService.showToast(
        'Login Required',
        'Please login to add product to cart',
        Status.Error,
        'Just now',
        ''
      );
      this.router.navigate(['/login']);
      this.dialogRef.close();
      return;      
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

    this.productsInCart.push({
      productId: product.productId,
      productName: product.productName,
      productCount: 1,
    });
    
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

  onReviewChange(review: any) {
    this.getProductDetails();
  }
}
