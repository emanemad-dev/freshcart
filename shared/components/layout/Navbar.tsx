"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaShoppingBag,
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

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false); // Close mobile search
    }
  };

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
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 mx-8 max-w-2xl relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base bg-white/80 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 p-1 rounded transition-colors"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>

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
                  <FaShoppingBag className="w-5 h-5 text-gray-700 hover:text-emerald-600" />
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
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-80 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-3 z-50 overflow-hidden"
                      style={{
                        boxShadow:
                          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.1) inset",
                      }}
                    >
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-transparent -z-0" />
                      <div className="absolute top-10 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -z-0" />

                      {/* User Info Section */}
                      <div className="relative px-6 pb-4 border-b border-emerald-100/50">
                        <div className="flex items-center gap-4 py-4">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                              <span className="text-white text-xl font-bold">
                                {user?.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                              {user?.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                              <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="relative px-3 py-2 space-y-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group"
                          onClick={() => setProfileModalOpen(false)}
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                            <FaUser className="w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700">
                              Profile
                            </span>
                            <p className="text-xs text-gray-400">
                              View and edit your profile
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group"
                          onClick={() => setProfileModalOpen(false)}
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                            <FaShoppingBag className="w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700">
                              Orders
                            </span>
                            <p className="text-xs text-gray-400">
                              Track and manage orders
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group"
                          onClick={() => setProfileModalOpen(false)}
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                            <FaHeart className="w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700">
                              Wishlist
                            </span>
                            <p className="text-xs text-gray-400">
                              Your saved items
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* Logout Section */}
                      <div className="relative px-3 pt-2 mt-2 border-t border-emerald-100/50">
                        <button
                          onClick={() => {
                            setProfileModalOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300 group"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <FaSignOutAlt className="w-4 text-red-500 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="text-sm font-medium text-red-600">
                              Log Out
                            </span>
                            <p className="text-xs text-gray-400">
                              Sign out from your account
                            </p>
                          </div>
                        </button>
                      </div>

                      {/* Footer Note */}
                      <div className="px-6 py-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 mt-2">
                        <p className="text-xs text-center text-gray-500">
                          Signed in as{" "}
                          <span className="text-emerald-600 font-medium">
                            {user?.email}
                          </span>
                        </p>
                      </div>
                    </motion.div>
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
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 p-1 rounded transition-colors"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              </form>
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
                    <FaShoppingBag className="text-emerald-500" />
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
