# Cart Delete Button Fix

Status: 🔄 In Progress

## Steps:

### 1. ✅ Create TODO-cart-delete-fix.md **(Current)**

### 2. ✅ Edit `features/cart/hooks/useCart.ts`

- Fix `remove()` param: `string itemId` (not CartItem)
- Extract server item ID correctly
- Pass **string** to `removeFromCartMutation.mutateAsync(itemId)`

### 3. ✅ Edit `app/cart/page.tsx`

- Update `confirmDeleteItem`: `remove(deleteItemId!)`
- Fix `remove` call signature

### 4. ✅ Test Fix

```
npm run dev
1. Login → Add 2 items to cart
2. /cart → Click trash → Confirm → ✅ Network: DELETE /api/v2/cart/{ITEM_ID}
3. Backend 200 OK, item removed from server cart
```

### 5. ✅ Cleanup & Complete

- Remove console.logs if added
- Update TODO ✅
- attempt_completion

**Root Cause**: `remove(item)` passes `{cartId, productId}` object to mutation expecting `string itemId`
