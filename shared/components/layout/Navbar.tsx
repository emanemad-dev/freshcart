"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaChevronDown,
  FaHeart,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaHeadphonesAlt,
  FaUser,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts({ limit: 1000 });
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const categoryIdsWithProducts = new Set(
    productsData?.data?.map((p) => p.category?._id).filter(Boolean) || [],
  );

  const categoriesWithProducts =
    categories?.filter((cat) => categoryIdsWithProducts.has(cat._id)) || [];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
  ];

  return (
    <nav className="bg-white shadow-sm w-full z-50">
      <div className="w-full px-2">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-green-600">FreshCart</span>
          </Link>

          <div className="hidden md:flex flex-1 mx-6 max-w-xl relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <Link
                href="/categories"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600"
              >
                Categories <FaChevronDown className="text-xs" />
              </Link>

              <div className="absolute top-full left-0 mt-2 w-56 bg-white border rounded-lg shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <Link
                  href="/categories"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  All Categories
                </Link>

                {categoriesWithProducts.map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?categoryId=${category._id}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/brands"
              className="text-gray-600 hover:text-green-600 text-sm"
            >
              Brands
            </Link>

            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-gray-600 hover:text-green-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/wishlist">
              <FaHeart className="text-gray-600 hover:text-red-500" />
            </Link>

            <Link href="/orders">
              <FaBox className="text-gray-600 hover:text-green-500" />
            </Link>

            <Link
              href="/contact"
              className="border-l pl-4 ml-2 hidden lg:flex items-center gap-3 group"
            >
              <FaHeadphonesAlt className="text-green-500 group-hover:text-green-600 transition-colors" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400">Support</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  Sports
                </span>
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileModalOpen(!profileModalOpen)}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600"
                >
                  <FaUser className="text-lg" />
                </button>

                {profileModalOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 pb-3 border-b">
                      <div className="flex items-center gap-3 py-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-lg text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">
                            {user?.name}
                          </h3>
                          <p className="text-gray-500 text-xs">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileModalOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="text-green-600 w-4" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setProfileModalOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaBox className="text-green-600 w-4" />
                      <span>My Orders</span>
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setProfileModalOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaHeart className="text-green-600 w-4" />
                      <span>My Wishlist</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setProfileModalOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaMapMarkerAlt className="text-green-600 w-4" />
                      <span>Addresses</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setProfileModalOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaCog className="text-green-600 w-4" />
                      <span>Settings</span>
                    </Link>

                    <div className="border-t mt-2 pt-2">
                      <button
                        onClick={() => {
                          setProfileModalOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                      >
                        <FaSignOutAlt className="w-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 flex items-center gap-2 whitespace-nowrap"
              >
                <FaSignInAlt className="text-sm" />
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-gray-600"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-gray-700"
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/categories" className="py-2 text-gray-700">
                Categories
              </Link>

              <Link href="/brands" className="py-2 text-gray-700">
                Brands
              </Link>

              <Link href="/cart" className="py-2 text-gray-700">
                Cart
              </Link>

              <Link href="/wishlist" className="py-2 text-gray-700">
                Wishlist
              </Link>
              <Link
                href="/orders"
                className="py-2 text-gray-700 flex items-center gap-2"
              >
                <FaBox />
                Orders
              </Link>

              <div className="border-t mt-2 pt-3">
                <div className="text-xs text-gray-400">Support</div>
                <div className="text-sm font-medium text-gray-700">
                  24/7 Help
                </div>
              </div>

              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="mt-2 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <FaSignInAlt className="text-sm" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
