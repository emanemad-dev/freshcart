// Product Types
export interface Product {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  image?: string;
  name?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  subcategoryId?: string;
  brandId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductListResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Product[];
}

