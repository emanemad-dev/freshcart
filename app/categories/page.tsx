// Categories Page
'use client';

import { useCategories } from '@/features/categories/hooks/useCategories';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { Loader } from '@/shared/components/ui/Loader';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

