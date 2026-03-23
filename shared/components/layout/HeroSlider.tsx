"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/hero-4.jpg",
    title: "Elevate Your Style",
    subtitle:
      "Discover the perfect blend of comfort and elegance with our exclusive Summer Collection 2026.",
    cta: "Shop Products",
    href: "/products",
  },
  {
    id: 2,
    image: "/hero-22.jpg",
    title: "Fresh Drops Every Week",
    subtitle:
      "Stay ahead of the curve with our newest arrivals. From casual wear to formal essentials.",
    cta: "View Brands",
    href: "/brands",
  },
  {
    id: 3,
    image: "/hero-33.jpg",
    title: "Customer Favorites",
    subtitle:
      "Join thousands of happy customers who love our best-selling pieces. Limited stock available.",
    cta: "Explore Categories",
    href: "/categories",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {" "}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover object-center"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

            {/* Inline SVG pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-3 sm:px-6 md:px-12 lg:px-20 z-10">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2 leading-tight max-w-xs sm:max-w-sm md:max-w-lg"
              >
                {slides[current].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-2 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-lg"
              >
                {slides[current].subtitle}
              </motion.p>
              <Link href={slides[current].href}>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-xl hover:shadow-green-500/25 font-semibold text-xs sm:text-sm md:text-base transition-all duration-300"
                >
                  {slides[current].cta} →
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Navigation buttons with SVG arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-1 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 text-white bg-white/20 backdrop-blur-md hover:bg-green-600 rounded-full w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 flex items-center justify-center z-30"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-1 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 text-white bg-white/20 backdrop-blur-md hover:bg-green-600 rounded-full w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 flex items-center justify-center z-30"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 cursor-pointer ${
              current === idx
                ? "w-8 h-2 bg-green-500 rounded-full"
                : "w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full"
            }`}
          />
        ))}
      </div>
      {/* Counter */}
      <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm md:text-sm z-30">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
