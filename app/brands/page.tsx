// Brands Page
'use client';

import { useBrands } from '@/features/brands/hooks/useBrands';
import { BrandCard } from '@/features/brands/components/BrandCard';
import { Loader } from '@/shared/components/ui/Loader';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { FaCrown } from 'react-icons/fa';

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
    <>
      <PageHeader 
        breadcrumbs={[
          { label: 'Brands' }
        ]}
        title="Top Brands"
        description="Shop from your favorite brands"
        icon={<FaCrown />}
        backgroundColor="bg-purple-600"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {brands?.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </>
  );
}


