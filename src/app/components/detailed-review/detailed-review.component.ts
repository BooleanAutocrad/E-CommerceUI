import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { ProductDetails } from 'src/app/models/product/productDetails';
import { Review } from 'src/app/models/product/review';
import { User } from 'src/app/models/product/user';
import { ReviewService } from 'src/app/service/review-service/review.service';

@Component({
  selector: 'app-detailed-review',
  templateUrl: './detailed-review.component.html',
  styleUrls: ['./detailed-review.component.css'],
})
export class DetailedReviewComponent implements OnInit, AfterViewInit {
  @Input()
  product!: ProductDetails;

  editingReview: Review | null = null;
  hoveredRating: number | null = null;
  originalReviewData: Partial<Review> | null = null;
  userHasOrderedProduct: boolean = false;

  addingNewReview = false;
  newReview: any = null;
  currentUser: User | null = null;

  constructor(private reviewService: ReviewService) {}
  ngOnInit(): void {
    this.reviewService
      .checkIfUserHasOrderedProduct(this.product.productId)
      .subscribe((result) => {
        this.userHasOrderedProduct = result;
      });
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => {
      return new Tooltip(tooltipTriggerEl);
    });

    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
  }

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((x, i) => i + 1);
  }

  checkIfCurrentUserCanEditReview(user: User): boolean {
    return this.currentUser?.userId === user.userId;
  }

  isEditing(review: Review): boolean {
    return this.editingReview === review;
  }

  editReview(review: Review): void {
    this.originalReviewData = { ...review };
    this.editingReview = review;
  }

  updateRating(review: Review, rating: number): void {
    review.rating = rating;
  }

  saveReview(review: Review): void {
    this.reviewService.editReview(review, this.product.productId);
    console.log('Saving review:', review);
    this.editingReview = null;
    this.originalReviewData = null;
  }

  cancelEdit(review: Review): void {
    if (this.originalReviewData) {
      review.rating = this.originalReviewData.rating!;
      review.review = this.originalReviewData.review!;
    }
    this.editingReview = null;
    this.originalReviewData = null;
  }

  resetHover(): void {
    this.hoveredRating = null;
  }

  addReview(): void {
    this.addingNewReview = true;
    this.newReview = {
      user: {
        userId: this.currentUser!.userId,
        userName: this.currentUser!.userName,
      },
      rating: 0,
      review: '',
      reviewId: 0,
    };
  }

  submitNewReview(): void {
    this.product.reviews.push(this.newReview);
    this.reviewService
      .addReview(this.newReview, this.product.productId)
      .subscribe(() => {
        console.log('New review added:', this.newReview);
      });
      this.addingNewReview = false;
  }

  cancelAddReview(): void {
    this.addingNewReview = false;
    this.newReview = null;
  }

  hasUserReviewed(): boolean {
    return this.product.reviews.some(
      (review) => review.user.userId === this.currentUser?.userId
    );
  }
}
