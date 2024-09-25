import { Category } from "./category";
import { RatingCounts } from "./ratingCounts";

export interface Product {
    productId: number;
    productName: string;
    productImageURL: string;
    productPrice: number;
    productStock: number;
    category: Category;
    ratingCounts: RatingCounts;
    averageRating: number;
    userReviewCount: number;
  }