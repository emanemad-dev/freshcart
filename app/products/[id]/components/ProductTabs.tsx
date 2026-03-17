"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaTrash } from "react-icons/fa";
import {
  FaCheckCircle,
  FaShippingFast,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
import { StarRating } from "@/features/products/components/StarRating";
import {
  useReviews,
  useCreateReview,
  useDeleteReview,
} from "@/features/reviews/hooks/useReviews";
import type { Product } from "@/features/products/types/product.types";
import type { Review } from "@/features/reviews/types/reviews.types";
import type { User } from "@/features/auth/types/auth.types";

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser?: User | null;
}

export const ProductTabs: FC<ProductTabsProps> = ({
  product,
  activeTab,
  onTabChange,
  currentUser,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const { data: reviewsData, isLoading: reviewsLoading } = useReviews(
    product._id,
  );
  const reviews = reviewsData?.data || [];
  const createReviewMutation = useCreateReview(product._id);
  const deleteReviewMutation = useDeleteReview(product._id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !reviewComment.trim()) return;

    const reviewData = {
      rating,
      review: reviewComment.trim(),
    };

    createReviewMutation.mutate(reviewData, {
      onSuccess: () => {
        setRating(0);
        setHoverRating(0);
        setReviewName("");
        setReviewComment("");
      },
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoverRating(0);
    setReviewName("");
    setReviewComment("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOwner = (review: Review) => {
    return currentUser?._id === review.user._id;
  };

  return (
    <div className="mb-8 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-1 border-b">
        <button
          onClick={() => onTabChange("details")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "details"
              ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50 rounded-t-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => onTabChange("reviews")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "reviews"
              ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50 rounded-t-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews ({product.ratingsQuantity || 0})
        </button>
        <button
          onClick={() => onTabChange("shipping")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "shipping"
              ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50 rounded-t-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Shipping & Returns
        </button>
      </div>

      <div className="py-6">
        {activeTab === "details" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About this Product
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                Material Polyester Blend • Colour Name Multicolour • Department
                Women
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Information */}
              <div className="space-y-6">
                <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">
                    Product Information
                  </h3>

                  <div className="divide-y divide-gray-200 text-sm">
                    <div className="flex justify-between py-3">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium text-gray-800">
                        Women's Fashion
                      </span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span className="text-gray-500">Subcategory</span>
                      <span className="font-medium text-gray-800">
                        Women's Clothing
                      </span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span className="text-gray-500">Brand</span>
                      <span className="font-medium text-gray-800">DeFacto</span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span className="text-gray-500">Items Sold</span>
                      <span className="font-medium text-gray-800">
                        3,064+ sold
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>Premium Quality Product</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>100% Authentic Guarantee</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>Fast & Secure Packaging</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>Quality Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Write a Review Form */}
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Write a Review
              </h3>

              <form className="space-y-4" onSubmit={handleSubmitReview}>
                {/* Rating Stars */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name (optional, backend may use current user) */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name (optional)"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={4}
                    placeholder="Share your thoughts about this product..."
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={createReviewMutation.isPending || !rating}
                    className="px-6 py-3 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {createReviewMutation.isPending
                      ? "Submitting..."
                      : "Submit Review"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Rating Summary */}
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Customer Reviews
              </h3>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.ratingsAverage?.toFixed(1) || "4.8"}
                  </span>
                  <div className="flex flex-col">
                    <StarRating rating={product.ratingsAverage || 4.8} />
                    <span className="text-xs text-gray-500 mt-1">
                      Based on {product.ratingsQuantity || 0} reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating bars - static for now, can be dynamic later */}
              <div className="space-y-3">
                {[5, 4, 3].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-12 text-gray-600">
                      {stars} star
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-gray-600">
                      {Math.round(Math.random() * 20 + 80)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Reviews ({reviews.length})
              </h3>

              {reviewsLoading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading reviews...
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No reviews yet. Be the first to review this product!
                </div>
              ) : (
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {reviews.map((review: Review, index: number) => (
                    <div
                      key={review._id}
                      className={
                        index !== reviews.length - 1
                          ? "border-b border-gray-200 pb-6"
                          : ""
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">
                              {review.user.name}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <StarRating rating={review.rating} size="sm" />
                              <span className="text-xs text-gray-400">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {isOwner(review) && (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            disabled={deleteReviewMutation.isPending}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            title="Delete your review"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-11">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {reviews.length > 5 && (
                <button className="mt-6 w-full py-3 text-sm font-medium text-emerald-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  Load More Reviews
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-8">
            {/* Shipping + Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping */}
              <div className="bg-emerald-50 border border-emerald-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 mr-3">
                    <FaShippingFast className=" text-white w-4 h-4" />
                  </span>
                  Shipping Information
                </h3>

                <ul className="space-y-3">
                  {[
                    "Free shipping on orders over $50",
                    "Standard delivery: 3-5 business days",
                    "Express delivery available (1-2 business days)",
                    "Track your order in real-time",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-gray-600 gap-2"
                    >
                      <FaCheckCircle className="text-emerald-600 mt-0.5 w-4 h-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Returns */}
              <div className="bg-emerald-50 border border-emerald-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 mr-3">
                    <FaUndo className="text-white w-4 h-4" />
                  </span>
                  Returns & Refunds
                </h3>

                <ul className="space-y-3">
                  {[
                    "30-day hassle-free returns",
                    "Full refund or exchange available",
                    "Free return shipping on defective items",
                    "Easy online return process",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-gray-600 gap-2"
                    >
                      <FaCheckCircle className="text-emerald-600 mt-0.5 w-4 h-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buyer Protection */}
            <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 p-6 rounded-2xl flex gap-4 items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                <FaShieldAlt className="text-gray-600 w-5 h-5" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Buyer Protection Guarantee
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Get a full refund if your order doesn't arrive or isn't as
                  described. We ensure your shopping experience is safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
