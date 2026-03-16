"use client";

import { FaStar } from "react-icons/fa";
import { FC } from "react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StarRating: FC<StarRatingProps> = ({
  rating = 0,
  size = "md",
  className = "",
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const starSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <FaStar
          key={i}
          className={`${starSize} fill-yellow-400 text-yellow-400 ${className}`}
        />,
      );
    } else {
      stars.push(
        <FaStar key={i} className={`${starSize} text-gray-300 ${className}`} />,
      );
    }
  }
  return <div className="flex">{stars}</div>;
};
