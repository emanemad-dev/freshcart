// Categories Page
'use client';

import { useCategories } from '@/features/categories/hooks/useCategories';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { Loader } from '@/shared/components/ui/Loader';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

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
          { label: 'Categories' }
        ]}
        title="Shop by Category"
        description="Explore our product categories"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

