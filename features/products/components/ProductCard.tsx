import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaEye ,FaRetweet } from 'react-icons/fa';
import { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const demoData = {
  category: "Women's Fashion",
  name: "Woman Shawl",
  rating: 4.8,
  reviews: 9,
  price: 149,
  currency: "EGP"
};

export const ProductCard = ({ product, onAddToCart, onAddToWishlist }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const renderRatingStars = () => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">⭐</span>
      ))}
    </div>
  );

  const renderDiscountBadge = () => {
    if (!product.priceAfterDiscount) return null;
    
    const discountPercentage = Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100
    );
    
    return (
      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        -{discountPercentage}%
      </div>
    );
  };

  const renderQuickActions = () => (
  <div className="absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500">
    <button
      onClick={handleWishlist}
      className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-gray-700 hover:text-red-500"
      aria-label="Add to wishlist"
    >
      {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
    </button>

    <button
      onClick={handleQuickView}
      className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-gray-700 hover:text-green-500"
      aria-label="Quick view"
    >
      <FaEye />
    </button>

    <button
      onClick={(e) => { e.preventDefault(); alert('Share clicked!'); }}
      className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-gray-700 hover:text-blue-500"
      aria-label="Share product"
    >
      <FaRetweet />
    </button>
  </div>
);

  return (
    <div className="group relative">
      <Link href={`/products/${product._id}`} className="block">
        <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 border-3 border-gray-100">
          
          <div className="relative h-64 w-full overflow-hidden bg-gray-50">
            <Image
              src={product.imageCover || "https://via.placeholder.com/400"}
              alt={product.title || demoData.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {renderQuickActions()}
            {renderDiscountBadge()}
          </div>

          <div className="p-5">
            <p className="text-sm text-gray-500 mb-1">{demoData.category}</p>
            
            <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
              {product.title || demoData.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              {renderRatingStars()}
              <span className="text-sm text-gray-600">
                {demoData.rating} ({demoData.reviews})
              </span>
            </div>

            <div className="flex justify-between items-baseline mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">{demoData.price}</span>
                <span className="text-sm text-gray-500">{demoData.currency}</span>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md hover:shadow-lg"
                aria-label="Add to cart"
              >
                <span className="text-white text-xl font-bold leading-none">+</span>
              </button>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};