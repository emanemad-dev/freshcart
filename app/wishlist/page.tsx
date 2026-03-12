"use client";

import Link from "next/link";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { WishlistCard } from "@/features/wishlist/components/WishlistCard";
import { useCart } from "@/features/cart/hooks/useCart";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { WishlistHero } from "./WishlistHero";
import { EmptyWishlist } from "./EmptyWishlist";
import {
  FaHeart,
  FaShoppingCart,
  FaArrowRight,
  FaTrashAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();
  const { add: addToCart } = useCart();

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      clear();
    }
  };

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <>
      <WishlistHero itemsLength={items.length} onClearAll={handleClearAll} />

      <section className="container mx-auto px-4 -mt-20 md:-mt-32 pb-24 md:pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {items
            .filter((item) => item?.product)
            .map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <WishlistCard
                  item={item}
                  onRemove={remove}
                  onAddToCart={addToCart}
                />
              </motion.div>
            ))}
        </motion.div>

        {items.length > 4 && (
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <FaShoppingCart className="w-5 h-5" />
              Browse More Products
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
