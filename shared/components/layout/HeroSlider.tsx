"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/hero-1.jpg",
    title: "Fresh Fashion Collection",
    subtitle: "Summer Sale - 50% Off",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "/hero-2.jpg",
    title: "Electronics Deals",
    subtitle: "Latest Gadgets Up to 30% Off",
    cta: "Explore",
  },
  {
    id: 3,
    image: "/hero-3.jpg",
    title: "Home & Garden",
    subtitle: "Everything for Your Home",
    cta: "View All",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const current = slides[currentSlide];

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full relative"
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover brightness-90"
            priority
          />

          {/* Light Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-400/5 to-emerald-500/10" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 container mx-auto h-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                {current.title}
              </h1>
              <p className="text-xl md:text-2xl mb-12 opacity-95 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
                {current.subtitle}
              </p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white/95 backdrop-blur-sm text-emerald-700 font-bold text-xl rounded-3xl shadow-2xl border border-white/50 hover:bg-white hover:shadow-3xl transition-all duration-300 min-w-[200px]"
                  >
                    {current.cta}
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white font-bold text-xl rounded-3xl shadow-xl border border-white/40 hover:bg-white/30 hover:shadow-2xl transition-all duration-300 min-w-[200px]"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full text-white hover:text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl w-14 h-14 flex items-center justify-center group"
      >
        <FaChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full text-white hover:text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl w-14 h-14 flex items-center justify-center group"
      >
        <FaChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/70 hover:scale-110"
            }`}
          >
            <FaCircle
              className={`w-3 h-3 text-white opacity-0 pointer-events-none`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
