// Navbar Component
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuthStore();

  const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/brands', label: 'Brands' },
  { href: '/contact', label: 'Contact' },
  { href: '/cart', label: 'Cart' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/orders', label: 'Orders' },
];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            FreshCart
          </Link>
          <div className="flex items-center gap-6">
            {links.map((link) => (
              link.label === 'Products' ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-blue-600 transition-colors text-gray-600"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm hover:text-blue-600 transition-colors ${
                    pathname === link.href ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
          <div className="flex items-center gap-4">
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
                <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

