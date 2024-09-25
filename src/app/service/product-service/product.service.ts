import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ProductDetails } from 'src/app/models/product/productDetails';
import { ProductFilterService } from 'src/app/shared/sharedService/sharedProductFilterService/product-filter.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private productFilterService: ProductFilterService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/dashboard/product');
  }

  getProductForCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      '/dashboard/product/category/' + categoryId
    );
  }

  getProductDetailsByProductId(productId: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>('/dashboard/product/' + productId);
  }

  getProductsAfterFilter(): Observable<Product[]> {

    const filterState = this.productFilterService.filterStateSubject.getValue();
  
    const { filterCondition, searchText , categoryId} = filterState;

    if(searchText === '' && filterCondition.price === 0.0 && categoryId != null){
      return this.getProductForCategory(categoryId);
    }

    if(searchText === '' && filterCondition.price === 0.0 && categoryId === null){
      return this.getProducts();
    }

    if(categoryId === null){
      filterCondition.categoryId = 0;
    }else{
      filterCondition.categoryId = categoryId;
    }

    const params = new HttpParams().set('searchText', searchText);
    return this.http.post<Product[]>('/dashboard/product/search', filterCondition, {
      params,
    });
  }
}
