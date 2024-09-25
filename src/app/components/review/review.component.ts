import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  @Input()
  product!: Product;

  constructor(public dialog: MatDialog) { }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((x, i) => i + 1);
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
