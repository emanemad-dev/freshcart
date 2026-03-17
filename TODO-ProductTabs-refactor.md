# TODO: ProductTabs Refactor Plan

Current working directory: g:/freshcart

## Approved Plan Summary

Split `app/products/[id]/components/ProductTabs.tsx` into:

- `features/products/components/TabNavigation.tsx`
- `features/products/components/ProductDetailsTab.tsx`
- `features/products/components/ReviewsTab.tsx`
- `features/products/components/ShippingTab.tsx`

Keep state/logic in main `ProductTabs`, pass props.

## Steps (0/7 ✅)

- ✅ 1. Create `features/products/components/TabNavigation.tsx` (fixed lint - removed unused Product import)
- ✅ 2. Create `features/products/components/ProductDetailsTab.tsx` (fixed lint - removed unused Product import)
- ✅ 3. Create `features/products/components/ReviewsTab.tsx`
- ✅ 4. Create `features/products/components/ShippingTab.tsx`
- ✅ 5. Refactor `app/products/[id]/components/ProductTabs.tsx` to use new components
- [ ] 6. Test tab switching, review form, delete functionality
- [ ] 7. Run `npm run dev` and verify on product page

Progress tracked here after each step.
