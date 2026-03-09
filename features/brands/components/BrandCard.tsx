// Brand Card Component - نسخة أبسط
import Image from 'next/image';
import Link from 'next/link';
import { Brand } from '../types/brands.types';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <Link href={`/brands/${brand._id}`} className="block group">
      <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 border border-3 border-gray-100">
        
        {/* صورة البراند */}
        {brand.image && (
          <div className="relative h-40 w-full bg-gray-50">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        {/* محتوى الكارد */}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {brand.name}
          </h3>
          
         
        </div>
      </div>
    </Link>
  );
};