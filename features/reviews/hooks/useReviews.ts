import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService, GetReviewsParams } from '../api/reviews.service';
import { Review } from '../types/reviews.types';

export const useReviews = (productId?: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewsService.getReviews(productId!),
    enabled: !!productId,
  });
};

export const useCreateReview = (productId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; review: string }) => reviewsService.createReview(productId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });
};

export const useDeleteReview = (productId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => reviewsService.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });
};

