# Cart Items Zero in Checkout OrderSummary

**Problem**: `{quantity} × {price}` always shows zero in OrderSummary.tsx

## Plan:

1. Read OrderSummary.tsx → see how it gets data
2. Read useCart.ts → verify items structure has quantity/price
3. Fix data destructuring/mapping

**Progress: 3/3** ✅ Fixed CartItem interface (`price?: number` + `product?`) + destructuring fallback.

**Now**: `{quantity} × {price}` shows correct values from both local/server cart!

**Test**: Add items → /checkout → OrderSummary shows proper qty×price.
