# FreshCart 🛒

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-green?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-green?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**FreshCart** - Complete E-Commerce Platform. Full-featured online store with authentication, product catalog, cart, checkout, orders, and more. Built with modern stack, responsive design, animations, and optimized performance.

🌐 **Live Demo:**  

<p align="center">
  <a href="https://freshcart-rose.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit-blue?style=for-the-badge&logo=appveyor" alt="Live Demo">
  </a>
</p>

## 📱 All Pages & Routes (Complete List)

| Route                            | Description       | Key Components                                                                                  |
| -------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| `/`                              | Home              | HeroSection, FeatureSection, CategoriesPreview, PromoCards, FeaturedProducts, NewsletterSection |
| `/products`                      | Products List     | ProductHero, ProductGrid, Filters                                                               |
| `/products/[id]`                 | Product Detail    | ProductDetailHero, ProductMainSection, ProductTabs (Reviews/Shipping)                           |
| `/categories`                    | Categories        | CategoryHero, CategoryCard                                                                      |
| `/categories/[id]`               | Category Detail   | Subcategories, Products Grid                                                                    |
| `/categories/[id]/subcategories` | Subcategories     | Dynamic listing                                                                                 |
| `/brands`                        | Brands List       | BrandHero, BrandCard                                                                            |
| `/brands/[id]`                   | Brand Detail      | Brand products                                                                                  |
| `/cart`                          | Shopping Cart     | CartHero, CartCard, CartItem                                                                    |
| `/wishlist`                      | Wishlist          | WishlistHero, EmptyWishlist                                                                     |
| `/checkout`                      | Checkout          | OrderSummary, ShippingForm, PaymentMethod                                                       |
| `/orders`                        | Orders History    | OrderHero, OrderCard, Filters, EmptyOrders                                                      |
| `/profile`                       | User Profile      | Addresses, Order summary                                                                        |
| `/search`                        | Search Products   | Search results                                                                                  |
| `/contact`                       | Contact Us        | ContactHero                                                                                     |
| `(auth)/forgot-password`         | Forgot Password   | ForgotPasswordForm                                                                              |
| `(auth)/reset-password`          | Reset Password    | ResetPasswordForm                                                                               |
| `(auth)/verify-reset-code`       | Verify Reset Code | VerifyResetCodeForm                                                                             |
| `/login`, `/register`            | Auth (via routes) | LoginForm, RegisterForm                                                                         |

**API Routes** (`app/api/`): Auth (signin/signup/forgot/reset/verify), Addresses (CRUD), Wishlist, etc.

## ✨ All Implemented Features (Detailed)

- **Authentication (Full Flow)**: Login/Register, Forgot Password, Email verification code, Reset Password. Components: LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm, VerifyResetCodeForm. Hooks: `useAuth()`. Services: `auth.service.ts`. Store: `auth.store.ts` (Zustand).
- **Products Management**: Browse/Filter/Search, Detail view w/ images/reviews/shipping/rating. Components: ProductCard, ProductGrid, ProductDetails, ReviewsTab, ShippingTab, StarRating, QuantitySelector, TabNavigation. Hook: `useProducts()`. Service: `product.service.ts`.
- **Categories & Brands**: List, detail, subcategories. Components: CategoryCard, BrandCard, Subcategories. Hooks: `useCategories()`, `useBrands()`.
- **Cart**: Add/Remove/Update qty, total calc, clear. Components: CartItem, CartCard. Hook: `useCart()`. Service/Store: `cart.service.ts/store.ts`.
- **Wishlist**: Add/Remove/Clear all. Components: WishlistHero, EmptyWishlist. Hook: `useWishlist()`.
- **Orders**: List/Filter/Empty state. Components: OrderCard, Filters, EmptyOrders, OrderHero. Hook: `useOrders()`. Service: `orders.service.ts`.
- **Checkout**: Summary, shipping/address, payment selection. Components: OrderSummary, ShippingForm, PaymentMethod.
- **Profile/Addresses**: Manage addresses. Hook: `useAddresses()`. Service: `addresses.service.ts`.
- **Reviews**: Full reviews system. Hook: `useReviews()`. Service: `reviews.service.ts`.
- **UI/UX**: Heroes (ProductHero/CartHero/etc.), Navbar/TopBar/Footer, Glassmorphism cards, Float/Blob/Pulse animations, Responsive grid.
- **Home Sections**: Hero, Features, Categories preview, Promos, Featured products, Newsletter.
- **Performance**: Infinite scroll? Caching, optimistic updates via React Query, Debounce search (`useDebounce`).

## 🛠️ Complete Tech Stack & Tools (w/ Versions)

| Category             | Tools/Libraries (Versions)                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Core Framework**   | Next.js 16.1.6 (App Router), React 19.2.3, React DOM 19.2.3                                                |
| **Language**         | TypeScript 5.x                                                                                             |
| **Styling**          | Tailwind CSS 4 (@tailwindcss/postcss 4), PostCSS, Geist Sans/Mono fonts, Custom animations (CSS keyframes) |
| **State Management** | Zustand 5.0.11 (auth/cart/wishlist stores)                                                                 |
| **Data Fetching**    | @tanstack/react-query 5.90.21 (`shared/lib/queryClient.ts`), Axios 1.13.6 (interceptors for token)         |
| **UI/Animations**    | Framer Motion 12.35.2 (motion.div), Lucide React 0.577.0 (icons), React Icons 5.6.0                        |
| **Notifications**    | React Hot Toast 2.6.0                                                                                      |
| **Dev Tools**        | ESLint 9 (eslint.config.mjs, eslint-config-next 16.1.6), tsconfig.json                                     |
| **Utils**            | Next/Image (remotePatterns), `useDebounce.ts`, `shared/lib/helpers.ts`, `routes.ts`                        |
| **Backend**          | External API `https://ecommerce.routemisr.com/api/v1` (PHP/Laravel/MySQL)                                  |

## 🚀 Local Setup

```bash
npm install
npm run dev  # http://localhost:3000
npm run build && npm run start  # Production
npm run lint  # Code quality
```

**Prerequisites**: Node.js 18+.

## 🔌 Dependencies & Notes

- All in `package.json` (no extras).
- Token: localStorage via Axios interceptor.
- Images: Optimized from API domain.

## 👨‍💻 Developer Guide

- **Structure**: `app/` (pages/API), `features/` (domain: hooks/services/stores/types), `shared/` (UI/utils), `providers/AppProviders.tsx`.
- **Best Practices**: Custom hooks (`use*`), typed services, Zustand slices, React Query mutations/queries.
- **Extend**: Add API routes in `app/api/`, features in `features/`.

**License**: MIT.

⭐ Star · 📝 Issues · 🐛 Bugs
