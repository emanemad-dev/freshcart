// Category Card Component
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../types/categories.types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${category._id}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </div>
      </div>
    </Link>
  );
};

