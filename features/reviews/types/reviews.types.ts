import { User } from '@/features/auth/types/auth.types';
// No Ref needed

export interface Review {
  _id: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  product: string;
}

// CreateReviewData removed, using inline type

export interface ReviewListResponse {
  results: number;
  data: Review[];
}

export interface CreateReviewResponse {
  data: Review;
}

