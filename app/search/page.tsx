"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useBrands } from "@/features/brands/hooks/useBrands";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { Loader } from "@/shared/components/ui/Loader";
import {
  FaSearch,
  FaTh,
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaFilter,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaSort,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get params from URL
  const searchQuery = searchParams.get("search") || "";
  const categoryIds = searchParams.getAll("categoryId");
  const brandIds = searchParams.getAll("brandId");
  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "12";
  const sortParam = searchParams.get("sort") || "relevance";

  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid");
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    parseInt(limitParam),
  );
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState(sortParam);

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle window resize for responsive filter
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  // Prepare filters for API
  const filters = {
    search: searchQuery,
    categoryId: categoryIds.length > 0 ? categoryIds : undefined,
    brandId: brandIds.length > 0 ? brandIds : undefined,
    page: parseInt(pageParam),
    limit: parseInt(limitParam),
    sort: sortParam,
    ...(minPrice && { minPrice: parseInt(minPrice) }),
    ...(maxPrice && { maxPrice: parseInt(maxPrice) }),
  };

  const {
    data: productsData,
    isLoading,
    refetch,
    error,
  } = useProducts(filters);

  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  // Handle multi-select for categories and brands
  const handleMultiFilterChange = (
    type: string,
    value: string,
    checked: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.delete(type);

    if (type === "categoryId") {
      categoryIds.forEach((id) => {
        if (id !== value) {
          params.append(type, id);
        }
      });
      if (checked) {
        params.append(type, value);
      }
    } else if (type === "brandId") {
      brandIds.forEach((id) => {
        if (id !== value) {
          params.append(type, id);
        }
      });
      if (checked) {
        params.append(type, value);
      }
    }

    params.set("page", "1");
    if (searchQuery) {
      params.set("search", searchQuery);
    }

    router.push(`/search?${params.toString()}`);
  };

  // Remove single filter
  const removeFilter = (type: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === "search") {
      params.delete("search");
    } else if (type === "categoryId" && value) {
      const newCategoryIds = categoryIds.filter((id) => id !== value);
      params.delete("categoryId");
      newCategoryIds.forEach((id) => params.append("categoryId", id));
    } else if (type === "brandId" && value) {
      const newBrandIds = brandIds.filter((id) => id !== value);
      params.delete("brandId");
      newBrandIds.forEach((id) => params.append("brandId", id));
    } else if (type === "price") {
      setMinPrice("");
      setMaxPrice("");
      setSelectedPrice("");
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const handlePriceChange = () => {
    if (minPrice || maxPrice) {
      const params = new URLSearchParams(searchParams);
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice");
      params.set("page", "1");
      router.push(`/search?${params.toString()}`);
    }
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    router.push(`/search?${params.toString()}`);
    setSelectedPrice("");
    setMinPrice("");
    setMaxPrice("");
  };

  // Check if a category is selected
  const isCategorySelected = (catId: string) => categoryIds.includes(catId);
  const isBrandSelected = (brandId: string) => brandIds.includes(brandId);

  // Price options
  const priceOptions = [
    { label: "Under 500", value: "0-500", icon: "💰" },
    { label: "Under 1K", value: "0-1000", icon: "💵" },
    { label: "Under 5K", value: "0-5000", icon: "💎" },
  ];

  // Sort options
  const sortOptions = [
    { value: "relevance", label: "✨ Relevance", icon: "🎯" },
    { value: "price-asc", label: "💰 Price: Low to High", icon: "⬆️" },
    { value: "price-desc", label: "💎 Price: High to Low", icon: "⬇️" },
    { value: "newest", label: "🆕 Newest First", icon: "🌟" },
    { value: "rating", label: "⭐ Top Rated", icon: "🏆" },
    { value: "popularity", label: "🔥 Most Popular", icon: "📈" },
  ];

  // Items per page options
  const itemsPerPageOptions = [8, 12, 16, 20, 24, 32, 48];

  const products = productsData?.data || [];

  // Extract pagination from metadata
  const metadata = productsData?.metadata || {
    currentPage: 1,
    numberOfPages: 1,
    limit: 12,
  };

  // Calculate total products from results
  const totalProducts = productsData?.results || 0;

  // Create pagination object for our component
  const pagination = {
    currentPage: metadata.currentPage,
    totalPages: metadata.numberOfPages,
    total: totalProducts,
    limit: metadata.limit,
  };

  // Get selected filters count
  const selectedFiltersCount =
    categoryIds.length +
    brandIds.length +
    (selectedPrice ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0);

  // Get active filters for display
  const getActiveFilters = () => {
    const filters = [];

    if (searchQuery) {
      filters.push({
        type: "search",
        label: `"${searchQuery}"`,
        icon: <FaSearch className="w-3 h-3" />,
        onRemove: () => removeFilter("search"),
      });
    }

    categoryIds.forEach((id) => {
      const category = categories?.find((cat) => cat._id === id);
      if (category) {
        filters.push({
          type: "category",
          id,
          label: category.name,
          icon: "📁",
          onRemove: () => removeFilter("categoryId", id),
        });
      }
    });

    brandIds.forEach((id) => {
      const brand = brands?.find((b) => b._id === id);
      if (brand) {
        filters.push({
          type: "brand",
          id,
          label: brand.name,
          icon: "🏷️",
          onRemove: () => removeFilter("brandId", id),
        });
      }
    });

    if (minPrice || maxPrice) {
      let priceLabel = "";
      if (minPrice && maxPrice) {
        priceLabel = `EGP ${minPrice} - EGP ${maxPrice}`;
      } else if (minPrice) {
        priceLabel = `Min: EGP ${minPrice}`;
      } else if (maxPrice) {
        priceLabel = `Max: EGP ${maxPrice}`;
      }
      filters.push({
        type: "price",
        label: priceLabel,
        icon: "💰",
        onRemove: () => removeFilter("price"),
      });
    } else if (selectedPrice) {
      const priceOption = priceOptions.find((p) => p.value === selectedPrice);
      filters.push({
        type: "price",
        label: priceOption?.label || selectedPrice,
        icon: "💰",
        onRemove: () => removeFilter("price"),
      });
    }

    return filters;
  };

  // Get search title
  const getSearchTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (categoryIds.length > 0) {
      const selectedCategories = categories?.filter((cat) =>
        categoryIds.includes(cat._id),
      );
      if (selectedCategories?.length === 1) {
        return `${selectedCategories[0].name}`;
      } else if (selectedCategories?.length > 1) {
        return `${selectedCategories.length} Categories`;
      }
    } else if (brandIds.length > 0) {
      const selectedBrands = brands?.filter((brand) =>
        brandIds.includes(brand._id),
      );
      if (selectedBrands?.length === 1) {
        return `${selectedBrands[0].name}`;
      } else if (selectedBrands?.length > 1) {
        return `${selectedBrands.length} Brands`;
      }
    }
    return "All Products";
  };

  // Grid classes based on view mode
  const getGridClasses = () => {
    if (viewMode === "grid") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    } else {
      return "flex flex-col gap-4";
    }
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const current = pagination.currentPage;
    const total = pagination.totalPages;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const activeFilters = getActiveFilters();

  // Show loader while mounting to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {getSearchTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <p className="text-gray-600">
              <span className="font-semibold text-emerald-600 text-2xl mr-2">
                {pagination.total}
              </span>
              {pagination.total === 1 ? "product" : "products"} found
            </p>
            {selectedFiltersCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
              >
                {selectedFiltersCount} active filter
                {selectedFiltersCount > 1 ? "s" : ""}
              </motion.span>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center gap-2">
              <FaFilter className="text-emerald-500" />
              <span className="font-medium">Filters</span>
              {selectedFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                  {selectedFiltersCount}
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isFilterOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="text-gray-400" />
            </motion.div>
          </button>
        </div>

        {/* Enhanced Active Filters Bar */}
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-500 mr-2 flex items-center gap-1">
                <FaFilter className="w-3 h-3" />
                Active Filters:
              </span>
              <AnimatePresence>
                {activeFilters.map((filter, index) => (
                  <motion.span
                    key={`${filter.type}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-xl text-sm border border-emerald-200/50 shadow-sm hover:shadow-md transition-all group"
                  >
                    <span className="text-xs">{filter.icon}</span>
                    <span className="font-medium">{filter.label}</span>
                    <button
                      onClick={filter.onRemove}
                      className="ml-1 hover:bg-emerald-200/50 rounded-full p-0.5 transition-colors group-hover:bg-emerald-200/50"
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors ml-auto flex items-center gap-1"
              >
                <FaUndo className="w-3 h-3" />
                Clear All
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar Filters */}
          <AnimatePresence>
            {(isFilterOpen || isLargeScreen) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-80 flex-shrink-0"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                      <FaFilter className="text-emerald-500" />
                      Filter Products
                    </h2>
                    {selectedFiltersCount > 0 && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
                        {selectedFiltersCount} active
                      </span>
                    )}
                  </div>

                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                      <span>Categories</span>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {categoryIds.length} selected
                      </span>
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {categories?.map((cat) => (
                        <motion.label
                          key={cat._id}
                          whileHover={{ x: 4 }}
                          className={`flex items-center gap-2 cursor-pointer p-2 rounded-xl transition-all ${
                            isCategorySelected(cat._id)
                              ? "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isCategorySelected(cat._id)}
                              onChange={(e) =>
                                handleMultiFilterChange(
                                  "categoryId",
                                  cat._id,
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                            />
                            {isCategorySelected(cat._id) && (
                              <FaCheck className="absolute -top-1 -right-1 w-3 h-3 text-emerald-500 bg-white rounded-full shadow-sm" />
                            )}
                          </div>
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {cat.name}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {cat.productCount || 0}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Price Range */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            EGP
                          </span>
                          <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onBlur={handlePriceChange}
                            className="w-full pl-12 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                          />
                        </div>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            EGP
                          </span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onBlur={handlePriceChange}
                            className="w-full pl-12 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
                          <input
                            type="radio"
                            name="price"
                            value=""
                            checked={selectedPrice === ""}
                            onChange={() => {
                              setSelectedPrice("");
                              setMinPrice("");
                              setMaxPrice("");
                              const params = new URLSearchParams(searchParams);
                              params.delete("minPrice");
                              params.delete("maxPrice");
                              params.set("page", "1");
                              router.push(`/search?${params.toString()}`);
                            }}
                            className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-600">
                            No Limit
                          </span>
                        </label>
                        {priceOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all"
                          >
                            <input
                              type="radio"
                              name="price"
                              value={option.value}
                              checked={selectedPrice === option.value}
                              onChange={() => {
                                setSelectedPrice(option.value);
                                setMinPrice("");
                                setMaxPrice("");
                                const [min, max] = option.value.split("-");
                                const params = new URLSearchParams(
                                  searchParams,
                                );
                                params.set("minPrice", min);
                                params.set("maxPrice", max);
                                params.set("page", "1");
                                router.push(`/search?${params.toString()}`);
                              }}
                              className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <span>{option.icon}</span>
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Brands */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                      <span>Brands</span>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {brandIds.length} selected
                      </span>
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {brands?.map((brand) => (
                        <motion.label
                          key={brand._id}
                          whileHover={{ x: 4 }}
                          className={`flex items-center gap-2 cursor-pointer p-2 rounded-xl transition-all ${
                            isBrandSelected(brand._id)
                              ? "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isBrandSelected(brand._id)}
                              onChange={(e) =>
                                handleMultiFilterChange(
                                  "brandId",
                                  brand._id,
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                            />
                            {isBrandSelected(brand._id) && (
                              <FaCheck className="absolute -top-1 -right-1 w-3 h-3 text-emerald-500 bg-white rounded-full shadow-sm" />
                            )}
                          </div>
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {brand.name}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {brand.productCount || 0}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Clear Button */}
                  <motion.button
                    onClick={clearFilters}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Clear All Filters{" "}
                    {selectedFiltersCount > 0 && `(${selectedFiltersCount})`}
                  </motion.button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <FaTruck className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                        <span className="text-xs text-gray-500">
                          Free Shipping
                        </span>
                      </div>
                      <div className="text-center">
                        <FaShieldAlt className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                        <span className="text-xs text-gray-500">
                          Secure Payment
                        </span>
                      </div>
                      <div className="text-center">
                        <FaUndo className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                        <span className="text-xs text-gray-500">
                          Easy Returns
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1">
            {/* Enhanced Sort Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 mb-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {pagination.total > 0 ? (
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <span className="font-semibold text-emerald-600">
                        {(pagination.currentPage - 1) * pagination.limit + 1}
                      </span>
                      {" - "}
                      <span className="font-semibold text-emerald-600">
                        {Math.min(
                          pagination.currentPage * pagination.limit,
                          pagination.total,
                        )}
                      </span>
                      {" of "}
                      <span className="font-semibold text-gray-900">
                        {pagination.total}
                      </span>{" "}
                      products
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                      No products found
                    </span>
                  )}

                  {/* Items Per Page */}
                  {pagination.total > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Show:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) =>
                          handleItemsPerPageChange(parseInt(e.target.value))
                        }
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                      >
                        {itemsPerPageOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  {pagination.total > 0 && (
                    <div className="flex items-center gap-2">
                      <FaSort className="text-gray-400" />
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      title="Grid View"
                    >
                      <FaTh className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("row")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "row"
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      title="List View"
                    >
                      <FaList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid/Row */}
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader size="lg" />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className={getGridClasses()}>
                  {products.map((product, index) => (
                    <div
                      key={product._id}
                      className={viewMode === "row" ? "w-full" : ""}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={addToCart}
                        variant={viewMode === "row" ? "horizontal" : "vertical"}
                      />
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination - Now using correct metadata */}
                {pagination.totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50"
                  >
                    <div className="text-sm text-gray-500 order-2 sm:order-1">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </div>

                    <div className="flex items-center gap-2 order-1 sm:order-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={pagination.currentPage === 1}
                        className={`p-2 rounded-xl border transition-all ${
                          pagination.currentPage === 1
                            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                            : "border-gray-300 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 bg-white"
                        }`}
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </motion.button>

                      <div className="flex items-center gap-1">
                        {getPaginationNumbers().map((page, index) =>
                          page === "..." ? (
                            <span
                              key={`dots-${index}`}
                              className="px-3 py-2 text-gray-400"
                            >
                              ...
                            </span>
                          ) : (
                            <motion.button
                              key={page}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePageChange(page as number)}
                              className={`min-w-[40px] h-10 rounded-xl text-sm font-medium transition-all ${
                                pagination.currentPage === page
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 bg-white"
                              }`}
                            >
                              {page}
                            </motion.button>
                          ),
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                        className={`p-2 rounded-xl border transition-all ${
                          pagination.currentPage === pagination.totalPages
                            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                            : "border-gray-300 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 bg-white"
                        }`}
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="text-sm text-gray-500 order-3">
                      Total {pagination.total} products
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              // Enhanced No Results
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200/50 text-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaSearch className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  No Products Found
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try
                  adjusting your filters or search term.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Clear All Filters
                    {selectedFiltersCount > 0 && ` (${selectedFiltersCount})`}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/products")}
                    className="px-8 py-3 bg-white text-emerald-600 font-medium rounded-xl border-2 border-emerald-500 hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    Browse All Products
                  </motion.button>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
