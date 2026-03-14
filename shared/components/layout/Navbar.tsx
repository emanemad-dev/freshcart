"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useState, useEffect } from "react";
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

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setProfileModalOpen(false);
  };

  return (
    <>
      <nav
        className={`w-full bg-white border-b border-gray-100 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 shadow-lg backdrop-blur-md z-50"
            : "relative"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3"
              onClick={handleLinkClick}
            >
              <img
                src="/logo.png"
                alt="FreshCart"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                FreshCart
              </span>
            </Link>

            {/* Mobile Search Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <FaSearch className="w-5 h-5 text-gray-600" />
              </button>

              {/* Mobile Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg hover:bg-emerald-50 transition-all"
                onClick={handleLinkClick}
              >
                <FaShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-lg hover:bg-red-50 transition-all"
                onClick={handleLinkClick}
              >
                <FaHeart className="w-5 h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Desktop Search - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 mx-8 max-w-2xl relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base bg-white/80 backdrop-blur-sm"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Desktop Nav - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all py-2 px-3 rounded-lg ${
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
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50 transition-all">
                  Categories{" "}
                  <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link
                    href="/categories"
                    className="block px-5 py-3 text-sm font-semibold border-b border-gray-100 hover:bg-emerald-50 transition-colors"
                  >
                    All Categories
                  </Link>
                  <div className="max-h-64 overflow-y-auto">
                    {categoriesWithProducts.slice(0, 12).map((category) => (
                      <Link
                        key={category._id}
                        href={`/products?categoryId=${category._id}`}
                        className="block px-5 py-2.5 text-sm hover:bg-emerald-50 transition-colors border-b border-gray-50 last:border-b-0"
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
                className="text-sm font-medium text-gray-700 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50 transition-all"
              >
                Brands
              </Link>

              {/* Desktop Icons */}
              <div className="flex items-center gap-3">
                <Link
                  href="/cart"
                  className="relative p-2 rounded-lg hover:bg-emerald-50 transition-all"
                >
                  <FaShoppingCart className="w-5 h-5 text-gray-700 hover:text-emerald-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/wishlist"
                  className="relative p-2 rounded-lg hover:bg-red-50 transition-all"
                >
                  <FaHeart className="w-5 h-5 text-gray-700 hover:text-red-500" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/orders"
                  className="p-2 rounded-lg hover:bg-emerald-50 transition-all"
                >
                  <FaBox className="w-5 h-5 text-gray-700 hover:text-emerald-600" />
                </Link>
              </div>

              {/* Support */}
              <Link
                href="/contact"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <FaHeadphonesAlt className="text-emerald-500" />
                <span>Support</span>
              </Link>

              {/* Desktop Auth */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-all"
                    onClick={() => setProfileModalOpen(!profileModalOpen)}
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-emerald-600 text-sm" />
                    </div>
                    <div className="hidden xl:block">
                      <p className="font-semibold text-xs text-gray-800">
                        {user?.name || "User"}
                      </p>
                    </div>
                  </button>

                  {profileModalOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-5 pb-3 border-b">
                        <div className="flex items-center gap-3 py-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FaUser className="text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-gray-800">
                              {user?.name}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-emerald-50 transition-colors text-sm"
                          onClick={() => setProfileModalOpen(false)}
                        >
                          <FaUser className="w-4 text-emerald-600" />
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-emerald-50 transition-colors text-sm"
                          onClick={() => setProfileModalOpen(false)}
                        >
                          <FaBox className="w-4 text-emerald-600" />
                          Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-emerald-50 transition-colors text-sm"
                          onClick={() => setProfileModalOpen(false)}
                        >
                          <FaHeart className="w-4 text-emerald-600" />
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            setProfileModalOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium border-t mt-2"
                        >
                          <FaSignOutAlt className="w-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <FaSignInAlt />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search Bar - Shows when search is toggled */}
          {searchOpen && (
            <div className="lg:hidden py-3 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base"
                  autoFocus
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="fixed top-0 left-0 w-full h-full bg-white lg:hidden z-50 overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={handleLinkClick}
                    >
                      <img
                        src="/logo.png"
                        alt="FreshCart"
                        className="w-8 h-8"
                      />
                      <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                        FreshCart
                      </span>
                    </Link>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <FaTimes className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="p-4 space-y-3">
                  {/* Main Links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-3 px-4 text-base font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Categories Accordion */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    >
                      Categories
                      <FaAngleDown
                        className={`w-5 h-5 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${categoriesOpen ? "max-h-96" : "max-h-0"}`}
                    >
                      <div className="px-6 py-3 space-y-2">
                        <Link
                          href="/categories"
                          className="block py-2 text-sm hover:text-emerald-600 transition-colors"
                          onClick={handleLinkClick}
                        >
                          All Categories
                        </Link>
                        {categoriesWithProducts.slice(0, 10).map((category) => (
                          <Link
                            key={category._id}
                            href={`/products?categoryId=${category._id}`}
                            className="block py-2 text-sm hover:text-emerald-600 transition-colors pl-3 border-l-4 border-transparent hover:border-emerald-400"
                            onClick={handleLinkClick}
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
                    className="block py-3 px-4 text-base font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    onClick={handleLinkClick}
                  >
                    Brands
                  </Link>

                  {/* Support */}
                  <Link
                    href="/contact"
                    className="block py-3 px-4 text-base font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-3"
                    onClick={handleLinkClick}
                  >
                    <FaHeadphonesAlt className="text-emerald-500" />
                    Support
                  </Link>

                  {/* Orders */}
                  <Link
                    href="/orders"
                    className="block py-3 px-4 text-base font-semibold text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-3"
                    onClick={handleLinkClick}
                  >
                    <FaBox className="text-emerald-500" />
                    Orders
                  </Link>

                  {/* Mobile Auth */}
                  <div className="pt-4 border-t border-gray-100">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-800">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/profile"
                            className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-all text-sm font-medium"
                            onClick={handleLinkClick}
                          >
                            <FaUser className="text-emerald-600" />
                            Profile
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-all text-sm font-medium"
                            onClick={handleLinkClick}
                          >
                            <FaHeart className="text-red-500" />
                            Wishlist
                          </Link>
                        </div>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all text-sm font-medium"
                        >
                          <FaSignOutAlt />
                          Log Out
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        onClick={handleLinkClick}
                      >
                        <FaSignInAlt />
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Placeholder */}
      {isSticky && <div className="h-14 sm:h-16 md:h-20"></div>}
    </>
  );
};
