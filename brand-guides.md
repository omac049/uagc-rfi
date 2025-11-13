# UAGC Brand Guidelines

## Logo Specifications

### Official University Logo

**Source File:** `UAGC_Main_Horizontal_RGB_FullColor.svg`

The University of Arizona Global Campus logo is the official institutional mark and must be used consistently across all digital properties.

#### Logo Dimensions
- **Original ViewBox:** `0 0 376.2 67.23`
- **Implemented Size:** 220px × 39px (scaled for web)
- **Aspect Ratio:** 5.625:1 (maintain for all sizes)

### Logo Components (8 Required Paths)

1. **Path 1: "GLOBAL CAMPUS" Text** - Main institutional text
2. **Path 2: "THE UNIVERSITY OF ARIZONA" Text** - Secondary institutional text  
3. **Path 3: "A" Logo Background Shape** - Block A background
4. **Path 4: "A" Red Accent** - Signature Arizona red triangle
5. **Path 5: "A" Outline** - Block A border
6. **Path 6: Registered Trademark Symbol** - ® mark
7. **Path 7: "A" Inner Triangle** - Interior white triangle
8. **Path 8: Vertical Separator Line** - Right border divider

---

## Color Specifications

### Brand Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|--------|
| **Arizona Blue** | `#0C234B` | rgb(12, 35, 75) | Primary brand color, text on light backgrounds |
| **Arizona Red** | `#AB0520` | rgb(171, 5, 32) | Signature accent, always used for "A" triangle |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Text on dark backgrounds, logo elements |

---

## Logo Usage by Background

### Official Logo File

All implementations should use the official `UAGC_Main_Horizontal_RGB_FullColor.svg` file which contains:
- Embedded CSS styles for color classes
- `.cls-1{fill:#0c234b;}` - Arizona Blue for text
- `.cls-2{fill:#fff;}` - White for elements  
- `.cls-3{fill:#ab0520;}` - Arizona Red for accent

### On Light Backgrounds (homepage.html, thank-you.html)

**Implementation:** Use the official logo directly without modification.

```html
<svg width="220" height="39" viewBox="0 0 376.2 67.23" xmlns="http://www.w3.org/2000/svg">
    <!-- Official logo SVG content from UAGC_Main_Horizontal_RGB_FullColor.svg -->
</svg>
```

**The logo renders correctly on light backgrounds with:**
- Arizona Blue (#0c234b) for institutional text
- White for "A" logo elements (visible against light background)
- Arizona Red (#ab0520) for signature accent triangle

### On Dark Backgrounds (index.html)

**Implementation:** Place logo in a white background container.

**The Block "A" design requires a white/light background to display correctly.** The white elements in the logo need contrast to be visible.

```html
<div style="background: white; padding: 12px 20px; border-radius: 8px; display: inline-block;">
    <svg width="220" height="39" viewBox="0 0 376.2 67.23" xmlns="http://www.w3.org/2000/svg">
        <!-- Official logo SVG content from UAGC_Main_Horizontal_RGB_FullColor.svg -->
    </svg>
</div>
```

**White Container Specifications:**
- Background: `white`
- Padding: `12px 20px`
- Border Radius: `8px`
- Display: `inline-block`

This ensures the logo displays correctly with proper contrast on dark backgrounds.

---

## Logo Usage Rules

### ✅ DO:
- Use the official `UAGC_Main_Horizontal_RGB_FullColor.svg` logo file
- Add a white background container when placing on dark backgrounds
- Maintain the 220x39px size for web implementations
- Ensure minimum padding of 12px when using white containers
- Maintain the original aspect ratio when scaling

### ❌ DON'T:
- Modify the logo colors or structure
- Place the logo directly on dark backgrounds without a white container
- Remove any of the logo elements
- Distort the aspect ratio
- Use the logo smaller than 110px width for readability
- Place logo on busy or patterned backgrounds without sufficient contrast

---

## File Locations

| File | Background | Logo Implementation |
|------|------------|---------------------|
| `homepage.html` | Light (white) | Official logo directly |
| `thank-you.html` | Light (white) | Official logo directly |
| `index.html` | Dark (gradient blue) | Official logo + white container |
| **Source** | N/A | `UAGC_Main_Horizontal_RGB_FullColor.svg` |

---

## Accessibility

### Contrast Ratios
- White logo on dark background: >7:1 (WCAG AAA)
- Dark blue (#0C234B) on white: >10:1 (WCAG AAA)
- Red accent visible on all backgrounds

### Alt Text
Use: `"University of Arizona Global Campus"`

---

## Technical Implementation Notes

- **Source File:** The official logo file `UAGC_Main_Horizontal_RGB_FullColor.svg` contains all brand colors as embedded CSS classes
- **Block "A" Design:** The logo's white elements require a light background for visibility
- **SVG Format:** Ensures crisp display at all resolutions and scales
- **No External Fonts:** All text is path-based, no font dependencies
- **Arizona Red (#ab0520):** This signature color appears consistently across all backgrounds
- **Responsive:** SVG scales perfectly for mobile and desktop displays

---

## Quick Reference: Implementation Guide

**For Light Backgrounds:**
```html
<!-- Direct implementation -->
<svg width="220" height="39" viewBox="0 0 376.2 67.23" ...>
    <!-- Official logo content -->
</svg>
```

**For Dark Backgrounds:**
```html
<!-- With white container -->
<div style="background: white; padding: 12px 20px; border-radius: 8px; display: inline-block;">
    <svg width="220" height="39" viewBox="0 0 376.2 67.23" ...>
        <!-- Official logo content -->
    </svg>
</div>
```

---

*Last Updated: November 13, 2025*
*Official Logo File: UAGC_Main_Horizontal_RGB_FullColor.svg*

