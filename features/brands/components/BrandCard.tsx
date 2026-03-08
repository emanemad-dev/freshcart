// Brand Card Component
import Image from 'next/image';
import Link from 'next/link';
import { Brand } from '../types/brands.types';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <Link href={`/brands/${brand._id}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        {brand.image && (
          <div className="relative h-32 w-full">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain p-4"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-center">{brand.name}</h3>
        </div>
      </div>
    </Link>
  );
};

