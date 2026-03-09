// Category Card Component
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../types/categories.types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${category._id}`} className="block group">
      <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 border border-gray-100">
        
        {/* صورة الكاتيجوري مع تأثيرات */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={category.image || "https://via.placeholder.com/400x300"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay متدرج عند الهوفر */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* أيقونة أو نص يظهر عند الهوفر */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-50">
            <span className="bg-white/90 text-green-600 px-6 py-3 rounded-full font-semibold text-sm shadow-xl backdrop-blur-sm">
              Shop Now →
            </span>
          </div>
        </div>

        {/* محتوى الكارد */}
        <div className="p-5 text-center">
          <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
            {category.name}
          </h3>
          
          {category.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
              {category.description}
            </p>
          )}
          
          {/* خط سفلي متحرك */}
          {/* <div className="w-12 h-1 bg-green-500 rounded-full mx-auto group-hover:w-20 transition-all duration-500"></div> */}
        </div>

        {/* تأثير إضاءة عند الهوفر */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
        </div>
      </div>
    </Link>
  );
};