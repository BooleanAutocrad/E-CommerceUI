import { Component, Input } from '@angular/core';
import { ProductDetails } from 'src/app/models/product/productDetails';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input()
  product!: ProductDetails;

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((x, i) => i + 1);
  }
  getCountPercentage(rating: number, totalRating: number): number {
    if (totalRating === 0) {
      return 0;
    } else {
      return parseFloat(((rating / totalRating) * 100).toFixed(1));
    }
  }
}
