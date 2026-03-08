// Brands Page
'use client';

import { useBrands } from '@/features/brands/hooks/useBrands';
import { BrandCard } from '@/features/brands/components/BrandCard';
import { Loader } from '@/shared/components/ui/Loader';

export default function BrandsPage() {
  const { data: brands, isLoading } = useBrands();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {brands?.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}

