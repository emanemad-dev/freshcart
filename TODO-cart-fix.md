# Cart Quantity Update Fix - 404 Error

Status: 🔄 In Progress

## Steps:

### 1. [ ] Create/Update TODO.md ✅ **(Current)**

### 2. [ ] Edit `features/cart/hooks/useCart.ts`

- Enhance `mappedServerItems`: ensure `id: item._id` always set
- Add console.log for debugging serverCart structure

### 3. [ ] Edit `app/cart/page.tsx`

- Improve `itemId` extraction: `item.id || item._id || 'fallback'`
- Add console.log(`${itemId} (${serverCart ? 'server' : 'local'})`)
- Verify Network tab shows **item ID**, not cart ID

### 4. [ ] Test Fix

```
npm run dev
1. Login → Add items to cart
2. /cart → Update quantity → ✅ Network: PUT /cart/{ITEM_ID}
3. Backend response 200
```

### 5. [ ] Cleanup & Complete

- Remove console.logs
- Update TODO ✅
- attempt_completion

**Root Cause**: Using cart ID (`serverCart._id`) instead of cart **item ID** (`products[i]._id`) for PUT /cart/{itemId}
