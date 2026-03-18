"use client";
import React from "react";
import { HeroSection } from "@/shared/components/layout/HeroSection";
import { FeatureSection } from "@/shared/components/layout/FeatureSection";
import { CategoriesPreview } from "@/shared/components/layout/CategoriesPreview";
import { PromoCards } from "@/shared/components/layout/PromoCards";
import { FeaturedProducts } from "@/shared/components/home/FeaturedProducts";
import { NewsletterSection } from "@/shared/components/layout/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CategoriesPreview />
      <PromoCards />
      <FeaturedProducts />
      <NewsletterSection />
    </>
  );
}
