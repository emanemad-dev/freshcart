"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export function PromoCards() {
  return (
    <section className="py-16 w-full bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/30 ">
      <div className="w-full px-4 ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6  mx-auto">
          {/* card1 */}
          <Link href="/products" className="block w-full group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 md:p-10 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-300 rounded-full blur-3xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <span className="text-white bg-white/20 backdrop-blur-sm rounded-full px-5 py-1.5 text-sm font-medium border border-white/30">
                    🔥 Deal of the Day
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  Fresh Organic Fruits
                </h3>
                <p className="text-emerald-100 font-medium mb-4 max-w-md">
                  Get up to 40% off on selected organic fruits. Freshly picked
                  and delivered to your doorstep.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                  <span className="text-white font-bold text-3xl md:text-4xl py-2">
                    40% OFF
                  </span>
                  <span className="text-emerald-100 font-medium">
                    Use code:{" "}
                    <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg ml-1">
                      ORGANIC40
                    </span>
                  </span>
                </div>

                <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 text-lg font-semibold flex items-center gap-2 group/btn shadow-md hover:shadow-xl">
                  <span>Shop Now</span>
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <circle cx="50" cy="50" r="40" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
          </Link>

          {/* card2 */}
          <Link href="/products" className="block w-full group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full bg-gradient-to-br from-amber-500 to-orange-600 p-8 md:p-10 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-300 rounded-full blur-3xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <span className="text-white bg-white/20 backdrop-blur-sm rounded-full px-5 py-1.5 text-sm font-medium border border-white/30">
                    🔥 New Arrivals
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  Exotic Vegetables
                </h3>
                <p className="text-amber-100 font-medium mb-4 max-w-md">
                  Discover our latest collection of premium vegetables from
                  around the world.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                  <span className="text-white font-bold text-3xl md:text-4xl py-2">
                    25% OFF
                  </span>
                  <span className="text-amber-100 font-medium">
                    Use code:{" "}
                    <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg ml-1">
                      FRESH25
                    </span>
                  </span>
                </div>

                <button className="bg-white text-amber-600 px-6 py-3 rounded-xl hover:bg-amber-50 transition-all duration-300 text-lg font-semibold flex items-center gap-2 group/btn shadow-md hover:shadow-xl">
                  <span>Explore Now</span>
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <circle cx="50" cy="50" r="40" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
