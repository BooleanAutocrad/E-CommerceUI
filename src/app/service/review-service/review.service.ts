import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/product/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  editReview(review: Review, productId: number): void {
    const url = '/review/edit';
    var reviewObj = {
      reviewId: review.reviewId,
      review: review.review,
      rating: review.rating,
      user: { userId: review.user.userId },
      product: { productId: productId },
    };
    this.http.put<void>(url, reviewObj).subscribe(
      () => {
        console.log('Review Edited Successfully');
      },
      (error) => {
        console.error('Error editing review', error);
      }
    );
  }
  addReview(review: Review, productId: number) {
    console.log('Review:', review);
    const url = '/review/add';
    var reviewObj = {
      review: review.review,
      rating: review.rating,
      user: { userId: review.user.userId },
      product: { productId: productId },
    };
    return this.http.post<void>(url, reviewObj);
  }

  checkIfUserHasOrderedProduct(productId: number): Observable<boolean> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    return this.http.get<boolean>(`/review/check/product/${productId}/user/${userObj.userId}`);
  }
}
