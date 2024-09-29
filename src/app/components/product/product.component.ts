import { Component, OnInit } from '@angular/core';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';
import { ProductDTO } from 'src/app/models/cart/ProductDTO';
import { Product } from 'src/app/models/product/product';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { ProductService } from 'src/app/service/product-service/product.service';
import { SharedCategoryService } from 'src/app/shared/sharedService/applyCategoryToProducts/shared-category.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ProductFilterService } from 'src/app/shared/sharedService/sharedProductFilterService/product-filter.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productsInCart!: ProductDTO[];

  currentFilterCondition: any;

  constructor(
    private productService: ProductService,
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    this.cartItemService.numberOfItemsInCart();
    
    this.productFilterService.filterState$.subscribe((state) => {
      this.callGetProductsAfterFilter();
    });

    this.cartItemCountService.currentNumberOfProducts.subscribe(
      (data: CartItemCountAndTotalAmount) => {
        this.productsInCart = data.products;
      }
    );

  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  getProductForCategory(categoryId: number): void {
    this.productService.getProductForCategory(categoryId).subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  getProductsAfterFilter(condition: any): void {
    if (condition && condition.price) {
      condition.price = parseFloat(condition.price);
      this.callGetProductsAfterFilter();
    }
  }

  callGetProductsAfterFilter() {
    this.productService.getProductsAfterFilter().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
