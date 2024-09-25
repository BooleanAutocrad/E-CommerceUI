import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/service/product-service/product.service';
import { SharedCategoryService } from 'src/app/shared/sharedService/applyCategoryToProducts/shared-category.service';
import { ProductFilterService } from 'src/app/shared/sharedService/sharedProductFilterService/product-filter.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  currentFilterCondition: any;

  constructor(
    private productService: ProductService,
    private productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    
    this.productFilterService.filterState$.subscribe((state) => {
      this.callGetProductsAfterFilter();
    });

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
      // console.log('Price:', condition.price);
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
