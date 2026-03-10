// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuthStore } from "@/features/auth/store/auth.store";
// import { useCategories } from "@/features/categories/hooks/useCategories";
// import { useProducts } from "@/features/products/hooks/useProducts";
// import { useState } from "react";
// import {
//   FaSearch,
//   FaShoppingCart,
//   FaBox,
//   FaChevronDown,
//   FaHeart,
//   FaSignInAlt,
// } from "react-icons/fa";

// export const Navbar = () => {
//   const pathname = usePathname();
//   const { isAuthenticated, logout, user } = useAuthStore();
//   const { data: categories } = useCategories();
//   const { data: productsData } = useProducts({ limit: 1000 });
//   const [searchQuery, setSearchQuery] = useState("");

//   const categoryIdsWithProducts = new Set(
//     productsData?.data?.map((p) => p.category?._id).filter(Boolean) || [],
//   );

//   const categoriesWithProducts =
//     categories?.filter((cat) => categoryIdsWithProducts.has(cat._id)) || [];

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/products", label: "Shop" },
//   ];

//   return (
//     <nav className="bg-white shadow-sm" style={{ height: "72px" }}>
//       <div className="container mx-auto px-4 h-full flex items-center justify-between">
//         {/* Logo + Optional Image */}
//         <Link href="/" className="flex items-center gap-2">
//           <img
//             src="/logo.png"
//             alt="FreshCart Logo"
//             className="w-8 h-8 object-contain"
//           />
//           <span className="text-2xl font-bold text-primary">FreshCart</span>
//         </Link>

//         {/* Search Bar */}
//         <div className="flex-1 max-w-2xl mx-8 relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search for products, brands and more..."
//             className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
//           />
//           <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//         </div>

//         {/* Navigation Links & Icons */}
//         <div className="flex items-center gap-6">
//           {/* Nav Links */}
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-sm transition-colors ${
//                 pathname === link.href
//                   ? "text-primary font-semibold border-b-2 border-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}

//           {/* Categories Dropdown */}
//           <div className="relative group">
//             <Link
//               href="/categories"
//               className={`flex items-center gap-1 text-sm transition-colors ${
//                 pathname === "/categories"
//                   ? "text-primary font-semibold border-b-2 border-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//             >
//               Categories <FaChevronDown className="w-4 h-4" />
//             </Link>
//             <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//               <Link
//                 href="/categories"
//                 className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary font-medium border-b border-gray-100"
//               >
//                 All Categories
//               </Link>
//               {categoriesWithProducts.map((category) => (
//                 <Link
//                   key={category._id}
//                   href={`/products?categoryId=${category._id}`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
//                 >
//                   {category.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Brands Link */}
//           <Link
//             href="/brands"
//             className={`text-sm transition-colors ${
//               pathname === "/brands"
//                 ? "text-primary font-semibold border-b-2 border-primary"
//                 : "text-gray-600 hover:text-primary"
//             }`}
//           >
//             Brands
//           </Link>

//           {/* Cart */}
//           <Link href="/cart" className="relative group">
//             <FaShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
//             <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               0
//             </span>
//           </Link>

//           {/* Wishlist */}
//           <Link href="/wishlist" className="group">
//             <FaHeart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
//           </Link>

//           {/* Orders */}
//           <Link href="/orders" className="group">
//             <FaBox className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
//           </Link>

//           {/* Support */}
//           <div className="border-l pl-6 ml-2">
//             <div className="flex flex-col">
//               <span className="text-xs text-gray-400">Support</span>
//               <span className="text-sm font-medium text-gray-700">
//                 24/7 Help
//               </span>
//             </div>
//           </div>

//           {/* Auth Buttons */}
//           <div className="flex items-center gap-3 ml-2">
//             {isAuthenticated ? (
//               <>
//                 <span className="text-sm text-gray-600">
//                   Hello, {user?.name}
//                 </span>
//                 <button
//                   onClick={logout}
//                   className="text-sm text-red-600 hover:text-red-700"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 href="/login"
//                 className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
//               >
//                 <FaSignInAlt /> Sign In
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

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
} from "react-icons/fa";

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts({ limit: 1000 });
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="bg-white shadow-sm fixed w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-green-600">FreshCart</span>
          </Link>

          {/* Search - hidden on small */}
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

          {/* Desktop Menu */}
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

            {/* Categories */}
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

            {/* Icons */}
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
            {/* Support */}
            <div className="border-l pl-4 ml-2 hidden lg:flex items-center">
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400">Support</span>
                <span className="text-sm font-medium text-gray-700">
                  24/7 Help
                </span>
              </div>
            </div>
            {/* Auth */}
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Hello, {user?.name}
                </span>
                <button onClick={logout} className="text-sm text-red-600">
                  Logout
                </button>
              </>
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

          {/* Mobile button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-gray-600"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Search */}
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
      </div>

      {/* Mobile Menu */}
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
              <div className="text-sm font-medium text-gray-700">24/7 Help</div>
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
    </nav>
  );
};
