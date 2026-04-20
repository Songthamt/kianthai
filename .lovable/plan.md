

## Problem
On print, the worksheet appears small and offset to the right because:
1. `.a4-sheet` has inline styles (`width: min(100%, 640px)`, `aspectRatio`, `padding: clamp(...)`) that **override** the `@media print` CSS rules (inline styles win over stylesheet rules without `!important` on each property).
2. The wrapper chain (`flex-1 flex justify-center items-start p-3 md:p-8`) adds padding/centering that stays during print, pushing content off-center.
3. Row heights use on-screen pixel values rather than scaling to the printed page.

## Fix Plan

**1. `src/components/WorksheetPreview.tsx`**
- Move all sizing/padding from inline `style` to CSS classes so `@media print` can cleanly override them.
- Keep on-screen visual unchanged via a screen-only class.
- Add a `print:` reset on the outer wrapper: remove padding, remove flex centering, full width.

**2. `src/styles.css` — `@media print` block**
- Force `.no-print-wrapper` to `display: block; padding: 0; margin: 0; width: 100%; height: 100%`.
- Force `.a4-sheet` with `!important` on every property that has an inline counterpart: `width: 100% !important; height: 100% !important; aspect-ratio: auto !important; padding: 10mm 12mm !important; margin: 0 !important; box-shadow: none; border-radius: 0`.
- Ensure `@page` margin stays `0` (already set) and orientation continues to follow `--page-orientation`.
- Make tracing rows fill the page evenly: distribute available height by using `flex: 1` on each row in print so 8 rows always span the full A4 height regardless of on-screen `fontSize`.
- Keep guideline `!important` colors as already done.

**3. Hide non-printing chrome reliably**
- Confirm the mobile sticky print bar and toggle bar both have `no-print` (they do) and that the root `flex md:flex-row h-screen overflow-hidden` doesn't clip print output — add `@media print { html, body, #root { height: auto !important; overflow: visible !important; } .no-print { display: none !important; } }`.

## Result
After these changes, the print preview will show the worksheet filling the entire A4 page with even row spacing and proper margins, regardless of the on-screen preview size or device.

