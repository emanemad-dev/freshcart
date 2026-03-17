"use client";

import { FC } from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { StarRating } from './StarRating';
import type { Review } from '../../reviews/types/reviews.types';
import type { Product } from '../types/product.types';
import type { User } from '../../auth/types/auth.types';

interface ReviewsTabProps {
  product: Product;
  reviews: Review[];
  reviewsLoading: boolean;
  rating: number;
  hoverRating: number;
  reviewName: string;
  reviewComment: string;
  createReviewMutation: any; // Use proper mutation type from React Query
  onRatingChange: (rating: number) => void;
  onHoverRatingChange: (rating: number) => void;
  onReviewNameChange: (name: string) => void;
  onReviewCommentChange: (comment: string) => void;
  onSubmitReview: (e: React.FormEvent) => void;
  onDeleteReview: (reviewId: string) => void;
  onCancel: () => void;
  formatDate: (dateString: string) => string;
  isOwner: (review: Review) => boolean;
  currentUser: User | null | undefined;
}

export const ReviewsTab: FC<ReviewsTabProps> = ({
  product,
  reviews,
  reviewsLoading,
  rating,
  hoverRating,
  reviewName,
  reviewComment,
  createReviewMutation,
  onRatingChange,
  onHoverRatingChange,
  onReviewNameChange,
  onReviewCommentChange,
  onSubmitReview,
  onDeleteReview,
  onCancel,
  formatDate,
  isOwner,
  currentUser,
}) => {
  return (
    <div className=\"space-y-8\">
      {/* Write a Review Form */}
      <div className=\"bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm\">
        <h3 className=\"text-md font-semibold text-gray-900 mb-4\">
          Write a Review
        </h3>

        <form className=\"space-y-4\" onSubmit={onSubmitReview}>
          {/* Rating Stars */}
          <div>
            <label className=\"block text-sm text-gray-600 mb-2\">
              Your Rating *
            </label>
            <div className=\"flex items-center gap-2\">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type=\"button\"
                  onClick={() => onRatingChange(star)}
                  onMouseEnter={() => onHoverRatingChange(star)}
                  onMouseLeave={() => onHoverRatingChange(0)}
                  className=\"focus:outline-none\"
                >
                  <FaStar
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? \"text-yellow-400\"
                        : \"text-gray-300\"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className=\"block text-sm text-gray-600 mb-2\">
              Your Name
            </label>
            <input
              type=\"text\"
              value={reviewName}
              onChange={(e) => onReviewNameChange(e.target.value)}
              placeholder=\"Enter your name (optional)\"
              className=\"w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors\"
            />
          </div>

          {/* Comment */}
          <div>
            <label className=\"block text-sm text-gray-600 mb-2\">
              Your Review *
            </label>
            <textarea
              value={reviewComment}
              onChange={(e) => onReviewCommentChange(e.target.value)}
              rows={4}
              placeholder=\"Share your thoughts about this product...\"
              className=\"w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none\"
              required
            />
          </div>

          {/* Actions */}
          <div className=\"flex items-center gap-3 pt-2\">
            <button
              type=\"submit\"
              disabled={createReviewMutation.isPending || !rating}
              className=\"px-6 py-3 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors\"
            >
              {createReviewMutation.isPending
                ? \"Submitting...\"
                : \"Submit Review\"}
            </button>
            <button
              type=\"button\"
              onClick={onCancel}
              className=\"px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors\"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Rating Summary */}
      <div className=\"bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm\">
        <h3 className=\"text-md font-semibold text-gray-900 mb-4\">
          Customer Reviews
        </h3>

        <div className=\"flex items-center justify-between mb-6\">
          <div className=\"flex items-center gap-3\">
            <span className=\"text-3xl font-bold text-gray-900\">
              {product.ratingsAverage?.toFixed(1) || \"4.8\"}
            </span>
            <div className=\"flex flex-col\">
              <StarRating rating={product.ratingsAverage || 4.8} />
              <span className=\"text-xs text-gray-500 mt-1\">
                Based on {product.ratingsQuantity || 0} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Rating bars */}
        <div className=\"space-y-3\">
          {[5, 4, 3].map((stars) => (
            <div key={stars} className=\"flex items-center gap-3\">
              <span className=\"text-sm w-12 text-gray-600\">
                {stars} star
              </span>
              <div className=\"flex-1 h-2 bg-gray-200 rounded-full overflow-hidden\">
                <div
                  className=\"h-full bg-emerald-500\"
                  style={{ width: `${Math.random() * 30 + 70}%` }}
                />
              </div>
              <span className=\"text-sm w-12 text-gray-600\">
                {Math.round(Math.random() * 20 + 80)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className=\"bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm\">
        <h3 className=\"text-md font-semibold text-gray-900 mb-4\">
          Reviews ({reviews.length})
        </h3>

        {reviewsLoading ? (
          <div className=\"text-center py-12 text-gray-500\">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className=\"text-center py-12 text-gray-500\">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className=\"space-y-6 max-h-96 overflow-y-auto\">
            {reviews.map((review: Review, index: number) => (
              <div
                key={review._id}
                className={
                  index !== reviews.length - 1
                    ? \"border-b border-gray-200 pb-6\"
                    : \"\"
                }
              >
                <div className=\"flex items-center justify-between mb-3\">
                  <div className=\"flex items-center gap-3\">
                    <div className=\"w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center\">
                      <span className=\"text-sm font-medium text-gray-600\">
                        {review.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className=\"font-medium text-gray-900\">
                        {review.user.name}
                      </span>
                      <div className=\"flex items-center gap-2 mt-1\">
                        <StarRating rating={review.rating} size=\"sm\" />
                        <span className=\"text-xs text-gray-400\">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isOwner(review) && (
                    <button
                      onClick={() => onDeleteReview(review._id)}
                      className=\"p-1 text-red-500 hover:text-red-700 transition-colors\"
                      title=\"Delete your review\"
                    >
                      <FaTrash className=\"w-4 h-4\" />
                    </button>
                  )}
                </div>
                <p className=\"text-gray-600 text-sm leading-relaxed pl-11\">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}

        {reviews.length > 5 && (
          <button className=\"mt-6 w-full py-3 text-sm font-medium text-emerald-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors\">
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
};
