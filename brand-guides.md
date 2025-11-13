# UAGC Brand Guidelines

## Logo Specifications

### Official University Logo

The University of Arizona Global Campus logo consists of 8 distinct SVG path elements that must all be included for proper display:

#### Logo Dimensions
- **Width:** 180px
- **Height:** 32px
- **ViewBox:** `0 0 181 32`
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

### On Light Backgrounds (homepage.html, thank-you.html)

**Fill Colors:**
- Paths 1, 2, 5, 8: `#0C234B` (Arizona Blue)
- Paths 3, 6, 7: `#FFFFFF` (White)
- Path 4: `#AB0520` (Arizona Red - always red)

```html
<svg width="180" height="32" viewBox="0 0 181 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Path 1: GLOBAL CAMPUS - Dark Blue -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M176.815 27.2242..." fill="#0C234B"/>
    
    <!-- Path 2: THE UNIVERSITY OF ARIZONA - Dark Blue -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M166.694 11.8638..." fill="#0C234B"/>
    
    <!-- Path 3: A Background - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48744 0L6.48388..." fill="white"/>
    
    <!-- Path 4: A Red Accent - Arizona Red (ALWAYS) -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6962 3.82214..." fill="#AB0520"/>
    
    <!-- Path 5: A Outline - Dark Blue -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9409 3.92059..." fill="#0C234B"/>
    
    <!-- Path 6: Registered Trademark - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M36.3989 27.5712..." fill="white"/>
    
    <!-- Path 7: A Inner Triangle - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9345 17.6724..." fill="white"/>
    
    <!-- Path 8: Vertical Separator - Dark Blue -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M41.1172 31.9999..." fill="#0C234B"/>
</svg>
```

### On Dark Backgrounds (index.html)

**Fill Colors:**
- Paths 1, 2, 5, 8: `#FFFFFF` (White) - Changed from blue
- Paths 3, 6, 7: `#FFFFFF` (White) - Stays white
- Path 4: `#AB0520` (Arizona Red - always red)

```html
<svg width="180" height="32" viewBox="0 0 181 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Path 1: GLOBAL CAMPUS - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M176.815 27.2242..." fill="white"/>
    
    <!-- Path 2: THE UNIVERSITY OF ARIZONA - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M166.694 11.8638..." fill="white"/>
    
    <!-- Path 3: A Background - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48744 0L6.48388..." fill="white"/>
    
    <!-- Path 4: A Red Accent - Arizona Red (ALWAYS) -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6962 3.82214..." fill="#AB0520"/>
    
    <!-- Path 5: A Outline - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9409 3.92059..." fill="white"/>
    
    <!-- Path 6: Registered Trademark - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M36.3989 27.5712..." fill="white"/>
    
    <!-- Path 7: A Inner Triangle - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9345 17.6724..." fill="white"/>
    
    <!-- Path 8: Vertical Separator - White -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M41.1172 31.9999..." fill="white"/>
</svg>
```

---

## Logo Usage Rules

### ✅ DO:
- Always include all 8 path elements
- Maintain the 180x32 dimension ratio when scaling
- Use Arizona Red (#AB0520) for the "A" accent (Path 4) on ALL backgrounds
- Convert #0C234B fills to white when placing on dark backgrounds
- Ensure minimum size of 90px width for readability
- Provide adequate clear space (minimum 16px) around logo

### ❌ DON'T:
- Remove any of the 8 path elements
- Change the Arizona Red accent color
- Distort the aspect ratio
- Use filters or CSS transforms to modify colors
- Place logo on busy or patterned backgrounds without sufficient contrast
- Use the logo smaller than 90px width

---

## File Locations

| File | Background | Logo Type |
|------|------------|-----------|
| `homepage.html` | Light (white) | Dark blue text + white A |
| `thank-you.html` | Light (white) | Dark blue text + white A |
| `index.html` | Dark (gradient blue) | White text + white A |

---

## Accessibility

### Contrast Ratios
- White logo on dark background: >7:1 (WCAG AAA)
- Dark blue (#0C234B) on white: >10:1 (WCAG AAA)
- Red accent visible on all backgrounds

### Alt Text
Use: `"University of Arizona Global Campus"`

---

## Technical Notes

- SVG format ensures crisp display at all resolutions
- No external fonts required - paths are embedded
- All 8 paths must render for complete logo
- Arizona Red (#AB0520) is the only color that never changes
- Logo maintains brand consistency across all platforms

---

## Quick Reference: Color Conversion

When converting logo between backgrounds:

**Light → Dark Background:**
- Change `fill="#0C234B"` to `fill="white"` (Paths 1, 2, 5, 8)
- Keep `fill="white"` as is (Paths 3, 6, 7)
- Keep `fill="#AB0520"` as is (Path 4 - ALWAYS)

**Dark → Light Background:**
- Change `fill="white"` to `fill="#0C234B"` (Paths 1, 2, 5, 8 only)
- Keep `fill="white"` for Paths 3, 6, 7
- Keep `fill="#AB0520"` as is (Path 4 - ALWAYS)

---

*Last Updated: November 13, 2025*

