"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export function PromoCards() {
  return (
    <section className="py-12 w-full bg-gray-50 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* card1 */}
        <Link href="/products" className="flex-1">
          <div className="bg-gradient-to-r from-[#00BC7D] to-[#007A55] p-10 rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-500 cursor-pointer h-full">
            <div className="flex items-center mb-6">
              <p className="text-white bg-white/30 rounded-full px-5 py-1">
                🔥 Deal of the Day
              </p>
            </div>

            <h3 className="text-3xl font-bold mb-3 text-white">
              Fresh Organic Fruits
            </h3>
            <p className="text-white/70 font-semibold mb-4">
              Get up to 40% off on selected organic fruits
            </p>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-white font-bold text-3xl py-2">
                40% OFF
              </span>
              <span className="text-white/70 font-semibold">
                Use code:{" "}
                <span className="font-bold text-white">ORGANIC40</span>
              </span>
            </div>

            <button className="bg-white text-green-500 px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-semibold flex items-center gap-2">
              Shop Now
              <FaArrowRight />
            </button>
          </div>
        </Link>
        {/* card2 */}
        <Link href="/products" className="flex-1">
          <div className="bg-gradient-to-r from-[#FF8904] to-[#FF2056] p-10 rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-500 cursor-pointer h-full">
            <div className="flex items-center mb-6">
              <p className="text-white bg-white/30 rounded-full px-5 py-1">
                🔥New Arrivals
              </p>
            </div>

            <h3 className="text-3xl font-bold mb-3 text-white">
              Exotic Vegetables
            </h3>
            <p className="text-white/70 font-semibold mb-4">
              Discover our latest collection of premium vegetables
            </p>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-white font-bold text-3xl py-2">
                25% OFF
              </span>
              <span className="text-white/70 font-semibold">
                Use code:{" "}
                <span className="font-bold text-white">ORGANIC40</span>
              </span>
            </div>

            <button className="bg-white text-orange-500 px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-semibold flex items-center gap-2">
              Explore Now
              <FaArrowRight />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}

