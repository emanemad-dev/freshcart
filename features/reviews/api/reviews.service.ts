import { axios } from '@/shared/lib/axios';
import { Review, CreateReviewData, ReviewListResponse, CreateReviewResponse } from '../types/reviews.types';
import { User } from '@/features/auth/types/auth.types';

// No GetReviewsParams needed

export const reviewsService = {
  async getReviews(productId: string): Promise<ReviewListResponse> {
    const response = await axios.get(`/products/${productId}/reviews`);
    return response.data;
  },

  async createReview(productId: string, data: { rating: number; review: string }): Promise<CreateReviewResponse> {
    const response = await axios.post(`/products/${productId}/reviews`, data);
    return response.data;
  },

  async deleteReview(reviewId: string): Promise<void> {
    await axios.delete(`/reviews/${reviewId}`);
  },
};

