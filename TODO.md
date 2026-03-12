# Fix Wishlist Runtime Error: Cannot read properties of undefined (reading 'imageCover')

## Steps:

1. [x] Update `features/wishlist/types/wishlist.types.ts` - Make product optional (`product?: Product | null`).
2. [x] Update `features/wishlist/hooks/useWishlist.ts` - Filter serverWishlist to valid items.
3. [x] Update `app/wishlist/page.tsx` - Filter items before mapping to WishlistCard.
4. [x] Update `features/wishlist/components/WishlistCard.tsx` - Add comprehensive null checks and fallbacks.
5. [x] Test: Run `npm run dev`, visit `/wishlist`, check console/no errors. (Safeguards added; filters prevent undefined product access).
6. [x] Complete task.
