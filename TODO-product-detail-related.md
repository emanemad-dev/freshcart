# Product Detail - "You May Also Like" Section

**Task**: Add "You May Also Like" section to `/products/[id]` showing **same category products** (exclude current product).

**Current structure** (from VSCode): app/products/[id]/page.tsx + ProductDetailHero.tsx

**Plan**:

1. Read page.tsx → find category ID from product data
2. Add `useProducts({ categoryId, limit: 4, exclude current _id })` below product details
3. Style as horizontal carousel/grid "You may also like"
4. Responsive, same ProductCard component

**Files**:

- Edit `app/products/[id]/page.tsx`
- Reuse `useProducts` hook + ProductCard

**Progress: 2/4**

**Analysis**:

- `app/products/[id]/page.tsx`: Has `product.category`, `useProduct(id)`
- `useProducts()`: Supports `categoryId` param
- Need: `useProducts({ categoryId: product.category._id, limit: 4, sort: 'random' })`
- Exclude current product via frontend filter `relatedProducts.filter(p => p._id !== product._id)`

**Plan**:

1. Add "You May Also Like" section **after ProductTabs**
2. Grid 4 products, horizontal scroll mobile
3. Use existing ProductCard component

**Ready to implement**
