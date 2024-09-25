import { Category } from "./category";
import { RatingCounts } from "./ratingCounts";
import { Review } from "./review";

export interface ProductDetails {
    productId: number;
    productName: string;
    productImageURL: string;
    productPrice: number;
    productStock: number;
    category: Category;
    reviews: Review[];
    ratingCounts: RatingCounts;
    averageRating: number;
    userReviewCount: number;
    orderCount: number;
  }