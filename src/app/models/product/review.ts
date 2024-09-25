import { User } from "./user";

export interface Review {
    reviewId: number;
    review: string;
    rating: number;
    user: User;
  }