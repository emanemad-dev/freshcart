"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight transform transition-transform duration-700 hover:scale-105">
          Welcome to FreshCart
        </h1>

        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90 transition-opacity duration-500 hover:opacity-100">
          Your one-stop shop for all your needs. Fresh products, great prices,
          fast delivery.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="text-green-600 border-white 
             hover:bg-white hover:text-green-700 
             transition-transform duration-500 ease-in-out 
             shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Shop Now
            </Button>
          </Link>

          <Link href="/categories">
            <Button
              size="lg"
              className="bg-transparent text-white border border-white 
             hover:bg-white hover:text-green-700 
             transition-transform duration-500 ease-in-out 
             shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-green-700/20 via-green-600/10 to-green-800/30 pointer-events-none animate-pulse-slow"></div>
    </section>
  );
}

