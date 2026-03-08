// Brands Hook
import { useQuery } from '@tanstack/react-query';
import { brandsService } from '../api/brands.service';

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: brandsService.getBrands,
  });
};

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => brandsService.getBrandById(id),
    enabled: !!id,
  });
};

