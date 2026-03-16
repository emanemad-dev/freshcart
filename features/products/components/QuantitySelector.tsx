"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
  className?: string;
}

export const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  maxQuantity,
  className = "",
}) => {
  return (
    <motion.div
      className={`glass-card p-2 rounded-2xl border border-white/30 ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
        <motion.button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="px-4 py-3 hover:bg-emerald-500/20 text-emerald-600 font-bold text-xl transition-all flex-1 disabled:opacity-50"
          disabled={quantity <= 1}
          whileTap={{ scale: 0.95 }}
        >
          <FaMinus />
        </motion.button>
        <span className="px-6 py-3 text-2xl font-black text-gray-900 min-w-[60px] text-center">
          {quantity}
        </span>
        <motion.button
          onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
          className="px-4 py-3 hover:bg-emerald-500/20 text-emerald-600 font-bold text-xl transition-all flex-1 disabled:opacity-50"
          disabled={quantity >= maxQuantity}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus />
        </motion.button>
      </div>
    </motion.div>
  );
};
