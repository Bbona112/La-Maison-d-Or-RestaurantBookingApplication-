# Error Fixes Documentation

## Issue: Konva.js Canvas Module Error

### Problem
When building the Next.js application, the build was failing with:
```
Module not found: Can't resolve 'canvas'
```

This error occurred because Konva.js tries to use the Node.js `canvas` module during server-side rendering, which is not available in the browser environment that Next.js targets.

### Solution Applied

#### 1. Updated `next.config.js`
Added webpack configuration to handle the canvas module:
- Set `canvas: false` in resolve.fallback for client-side builds
- Added canvas to externals for server-side builds
- This prevents Next.js from trying to bundle the canvas module

#### 2. Dynamic Imports
Used Next.js dynamic imports with `ssr: false` to ensure Konva components only load on the client side:
- In `app/page.tsx`: Dynamically import `RestaurantLayout` component
- In `components/RestaurantLayout.tsx`: Use `useEffect` to load Konva components only on client
- In `components/TableShape.tsx`: Use `useEffect` to load Konva components only on client
- In `components/Seat.tsx`: Use `useEffect` to load Konva components only on client

#### 3. Client-Side Only Rendering
- Added `'use client'` directive to all components using Konva
- Used `useState` and `useEffect` to ensure Konva components only render after client-side hydration
- Added loading states while Konva components are being loaded

### Files Modified

1. **next.config.js**
   - Added webpack configuration for canvas module handling

2. **app/page.tsx**
   - Changed to dynamic import for RestaurantLayout component

3. **components/RestaurantLayout.tsx**
   - Added client-side only rendering logic
   - Used useEffect to load Konva components dynamically

4. **components/TableShape.tsx**
   - Added useEffect to load Konva components dynamically

5. **components/Seat.tsx**
   - Added useEffect to load Konva components dynamically

### Result

✅ Build now completes successfully
✅ Application works correctly in both development and production
✅ Konva.js components load only on the client side
✅ No SSR errors related to canvas module

### Testing

To verify the fix:
```bash
npm run build
```

The build should complete without errors.

### Notes

- The dynamic loading approach ensures Konva.js is never executed during server-side rendering
- There may be a brief loading state when the floor plan first appears (this is expected)
- All Konva functionality works correctly once the components are loaded on the client side


