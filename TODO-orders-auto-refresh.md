# Orders Auto-Refresh Fix

**Problem**: Orders don't update after creation (requires manual refresh)

## Analysis:

- checkout/page.tsx → useCheckout() → createCashOrderMutation → NO `invalidateQueries(['orders'])`
- orders/hooks/useOrders.ts → useOrders() queryKey=['orders', userId], has proper invalidation in other mutations
- Fix: Add queryClient.invalidateQueries({ queryKey: ['orders'] }) to useCheckout success

## Files to edit:

1. `features/checkout/hooks/useCheckout.ts` - Add import useQueryClient + invalidate

## Steps:

- [ ] 1. Read useCheckout.ts (done)
- [ ] 2. Edit useCheckout.ts → add invalidateQueries on create success
- [ ] 3. Test: Create order → /orders auto-refreshes with new order
- [ ] 4. Complete

**Progress: 3/4** ✅ Added `useQueryClient().invalidateQueries({ queryKey: ['orders'] })` to BOTH cash/card mutations in `useCheckout.ts`.
