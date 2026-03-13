"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
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
  FaAngleDown,
} from "react-icons/fa";

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts({ limit: 1000 });

  // ✅ استخراج cartCount من useCart
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const categoryIdsWithProducts = new Set(
    productsData?.data?.map((p) => p.category?._id).filter(Boolean) || [],
  );

  const categoriesWithProducts =
    categories?.filter((cat) => categoryIdsWithProducts.has(cat._id)) || [];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 bg-white/95 backdrop-blur-md shadow-lg w-full z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={handleLinkClick}
          >
            <img src="/logo.png" alt="FreshCart" className="w-10 h-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              FreshCart
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 mx-8 max-w-2xl relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg bg-white/80 backdrop-blur-sm"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-all py-2 px-3 rounded-lg ${
                  pathname === link.href
                    ? "text-emerald-600 bg-emerald-100"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50 transition-all">
                Categories{" "}
                <FaChevronDown className="text-sm group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link
                  href="/categories"
                  className="block px-6 py-4 text-lg font-semibold border-b border-gray-100 hover:bg-emerald-50 transition-colors"
                >
                  All Categories
                </Link>
                <div className="max-h-64 overflow-y-auto">
                  {categoriesWithProducts.slice(0, 12).map((category) => (
                    <Link
                      key={category._id}
                      href={`/products?categoryId=${category._id}`}
                      className="block px-6 py-3 text-base hover:bg-emerald-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Brands */}
            <Link
              href="/brands"
              className="text-base font-medium text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50 transition-all"
            >
              Brands
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="relative p-2 rounded-xl hover:bg-emerald-50 transition-all"
              >
                <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-emerald-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/wishlist"
                className="relative p-2 rounded-xl hover:bg-red-50 transition-all"
              >
                <FaHeart className="w-6 h-6 text-gray-700 hover:text-red-500" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/orders"
                className="p-2 rounded-xl hover:bg-emerald-50 transition-all"
              >
                <FaBox className="w-6 h-6 text-gray-700 hover:text-emerald-600" />
              </Link>
            </div>

            {/* Support */}
            <Link
              href="/contact"
              className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all hidden xl:flex"
            >
              <FaHeadphonesAlt className="text-emerald-500" />
              <span>Support</span>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all"
                  onClick={() => setProfileModalOpen(!profileModalOpen)}
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-emerald-600 text-lg" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="font-semibold text-sm text-gray-800">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email || ""}</p>
                  </div>
                </button>

                {profileModalOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-6 pb-4 border-b">
                      <div className="flex items-center gap-4 py-4">
                        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <FaUser className="text-2xl text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {user?.name}
                          </h3>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition-colors rounded-xl"
                        onClick={() => setProfileModalOpen(false)}
                      >
                        <FaUser className="w-5 text-emerald-600" />
                        <span className="font-medium text-gray-800">
                          Profile
                        </span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition-colors rounded-xl"
                        onClick={() => setProfileModalOpen(false)}
                      >
                        <FaBox className="w-5 text-emerald-600" />
                        <span className="font-medium text-gray-800">
                          Orders
                        </span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition-colors rounded-xl"
                        onClick={() => setProfileModalOpen(false)}
                      >
                        <FaHeart className="w-5 text-emerald-600" />
                        <span className="font-medium text-gray-800">
                          Wishlist
                        </span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition-colors rounded-xl"
                        onClick={() => setProfileModalOpen(false)}
                      >
                        <FaMapMarkerAlt className="w-5 text-emerald-600" />
                        <span className="font-medium text-gray-800">
                          Addresses
                        </span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition-colors rounded-xl"
                        onClick={() => setProfileModalOpen(false)}
                      >
                        <FaCog className="w-5 text-emerald-600" />
                        <span className="font-medium text-gray-800">
                          Settings
                        </span>
                      </Link>
                      <div className="border-t pt-3 mt-2">
                        <button
                          onClick={() => {
                            setProfileModalOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-4 w-full px-6 py-4 text-red-600 hover:bg-red-50 transition-colors rounded-xl font-medium"
                        >
                          <FaSignOutAlt className="w-5" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <FaSignInAlt />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all text-2xl text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex-1 p-3 rounded-xl border border-gray-200 hover:border-emerald-400 transition-all"
            >
              <FaSearch className="w-6 h-6 mx-auto text-gray-500" />
            </button>
            {searchOpen && (
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-3 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Mobile Overlay Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 left-0 w-full h-full bg-white lg:hidden z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-6">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={handleLinkClick}
                  >
                    <img
                      src="/logo.png"
                      alt="FreshCart"
                      className="w-12 h-12"
                    />
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                      FreshCart
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 text-gray-600"
                  >
                    <FaTimes className="w-8 h-8" />
                  </button>
                </div>
              </div>

              {/* Main Nav */}
              <div className="p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-4 px-4 text-xl font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Categories Accordion */}
                <div>
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="w-full flex items-center justify-between py-4 px-4 text-xl font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
                  >
                    Categories
                    <FaAngleDown
                      className={`w-6 h-6 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${categoriesOpen ? "max-h-96" : "max-h-0"}`}
                  >
                    <div className="px-8 py-4 space-y-2">
                      <Link
                        href="/categories"
                        className="block py-3 text-lg hover:text-emerald-600 transition-colors"
                        onClick={handleLinkClick}
                      >
                        All Categories
                      </Link>
                      {categoriesWithProducts.slice(0, 10).map((category) => (
                        <Link
                          key={category._id}
                          href={`/products?categoryId=${category._id}`}
                          className="block py-3 text-lg hover:text-emerald-600 transition-colors pl-4 border-l-4 border-transparent hover:border-emerald-400"
                          onClick={handleLinkClick}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/brands"
                  className="block py-4 px-4 text-xl font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
                  onClick={handleLinkClick}
                >
                  Brands
                </Link>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <Link
                    href="/cart"
                    className="group flex flex-col items-center p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-all"
                    onClick={handleLinkClick}
                  >
                    <FaShoppingCart className="w-12 h-12 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-lg text-gray-800">
                      Cart
                    </span>
                    {cartCount > 0 && (
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full mt-1 font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/wishlist"
                    className="group flex flex-col items-center p-6 rounded-2xl bg-red-50 hover:bg-red-100 transition-all"
                    onClick={handleLinkClick}
                  >
                    <FaHeart className="w-12 h-12 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-lg text-gray-800">
                      Wishlist
                    </span>
                    {wishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1 font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </div>

                <Link
                  href="/orders"
                  className="block py-4 px-4 text-xl font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all flex items-center gap-3"
                  onClick={handleLinkClick}
                >
                  <FaBox className="w-6 h-6" />
                  Orders
                </Link>
              </div>

              {/* Profile / Auth Section */}
              <div className="p-6 border-t bg-gray-50">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                      <FaUser className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-gray-800 truncate">
                        {user?.name}
                      </h3>
                      <p className="text-lg text-gray-600 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="p-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white transition-all"
                    >
                      <FaSignOutAlt className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xl py-4 px-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                    onClick={handleLinkClick}
                  >
                    <FaSignInAlt className="w-6 h-6" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
