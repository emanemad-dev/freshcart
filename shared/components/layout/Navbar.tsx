// Navbar Component
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBox, FaChevronDown, FaHeart } from 'react-icons/fa';

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts({ limit: 1000 });
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique category IDs from products
  const categoryIdsWithProducts = new Set(
    productsData?.data?.map(p => p.category?._id).filter(Boolean) || []
  );

  // Filter categories that have products
  const categoriesWithProducts = categories?.filter(
    cat => categoryIdsWithProducts.has(cat._id)
  ) || [];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
  ];

  return (
    <nav className="bg-white shadow-sm" style={{ height: '72px', opacity: 1 }}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            FreshCart
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm hover:text-primary transition-colors ${
                    pathname === link.href ? 'text-primary font-medium' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            {/* Categories Dropdown */}
            <div className="relative group">
              <Link
                href="/categories"
                className={`flex items-center gap-1 text-sm hover:text-primary transition-colors ${
                  pathname === '/categories' ? 'text-primary font-medium' : 'text-gray-600'
                }`}
              >
                Categories
                <FaChevronDown className="w-4 h-4" />
              </Link>
              
              {/* Dropdown Menu - show on group hover */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/categories"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors font-medium border-b border-gray-100"
                >
                  All Categories
                </Link>
                {categoriesWithProducts.map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?categoryId=${category._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/brands"
              className={`text-sm hover:text-primary transition-colors ${
                pathname === '/brands' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
            >
              Brands
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <FaShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative group">
              <FaHeart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
            </Link>

            {/* Orders Icon */}
            <Link href="/orders" className="group">
              <FaBox className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
            </Link>

            {/* Support Section */}
            <div className="border-l pl-6 ml-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Support</span>
                <span className="text-sm font-medium text-gray-700">24/7 Help</span>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-2">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">Hello, {user?.name}</span>
                  <button 
                    onClick={logout}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
