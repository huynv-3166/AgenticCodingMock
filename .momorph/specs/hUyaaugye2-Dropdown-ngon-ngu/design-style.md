# Design Style: Language Dropdown (Dropdown-ngon ngu)

**Frame ID**: `hUyaaugye2`
**Frame Name**: `Dropdown-ngon ngu`
**Figma File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-10

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background (var: --Details-Container-2) |
| --color-dropdown-border | #998C5F | 100% | Dropdown container border (var: --Details-Border) |
| --color-selected-bg | #FFEA9E | 20% | Selected language item background highlight |
| --color-text-white | #FFFFFF | 100% | Language code text (VN, EN, JA) |

> **Note**: The #696969 background visible in the Figma frame is the canvas color, NOT a rendered overlay. The actual implementation does NOT display a background overlay behind the dropdown.

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-language-code | Montserrat | 16px | 700 (Bold) | 24px | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container inner padding |
| --spacing-item-padding | 16px | Language item internal padding |
| --spacing-icon-text-gap | 4px | Gap between flag icon and language code |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container border radius |
| --radius-item | 4px | Individual language item border radius |
| --radius-selected-bg | 2px | Selected item background border radius |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-dropdown | none | Dropdown uses border instead of shadow |

---

## Layout Specifications

### Container (Dropdown)

| Property | Value | Notes |
|----------|-------|-------|
| width | 122px (auto, content-based) | Fits content: 6px padding + 108/110px items + 6px padding |
| height | auto | Based on number of language options |
| padding | 6px | All sides |
| background | #00070C | Dark background |
| border | 1px solid #998C5F | Gold-toned border |
| border-radius | 8px | Rounded corners |
| display | flex | Vertical list layout |
| flex-direction | column | Items stack vertically |
| position | absolute | Positioned relative to trigger button |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────┐
│  Dropdown Container (~122px, bg: #00070C)     │
│  border: 1px solid #998C5F, radius: 8px       │
│  padding: 6px                                 │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │  A.1 Selected: tieng Viet (~110x56px)    │ │
│  │  bg: rgba(255,234,158, 0.2), r: 2px      │ │
│  │  ┌────┐ ┌────┐                           │ │
│  │  │ VN │ │ VN │   padding: 16px           │ │
│  │  │flag│ │text│   gap: 4px                │ │
│  │  └────┘ └────┘                           │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │  A.2 Option: tieng Anh (~110x56px)       │ │
│  │  bg: transparent, r: 4px                 │ │
│  │  ┌────┐ ┌────┐                           │ │
│  │  │ UK │ │ EN │   padding: 16px           │ │
│  │  │flag│ │text│   gap: 4px                │ │
│  │  └────┘ └────┘                           │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │  A.3 Option: tieng Nhat (~110x56px)      │ │
│  │  bg: transparent, r: 4px                 │ │
│  │  ┌────┐ ┌────┐                           │ │
│  │  │ JP │ │ JA │   padding: 16px           │ │
│  │  │flag│ │text│   gap: 4px                │ │
│  │  └────┘ └────┘                           │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

> Note: A.3 (Japanese) is not in the Figma frame but MUST be included per codebase requirements. It follows the same style as A.2.

---

## Component Style Details

### Trigger Button - Language Selector Toggle

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | (in Header component) | - |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 2px | `gap: 2px` (Tailwind: `gap-0.5`) |
| padding | 16px | `padding: 16px` (Tailwind: `px-4 py-4`) |
| border-radius | 4px | `border-radius: var(--radius-language, 4px)` |
| background | transparent | `background: transparent` |
| cursor | pointer | `cursor: pointer` |

**Child Elements:**
- **Flag Icon** (current language): 24x24px, `<Image>` with appropriate flag SVG
- **Language Code Text**: Montserrat 16px/700, white, tracking 0.15px
- **ChevronDown Icon**: 24x24px, white, `<ChevronDownIcon>`

**States:**

| State | Changes |
|-------|---------|
| Default | background: transparent |
| Hover | background: rgba(255, 255, 255, 0.1) (Tailwind: `hover:bg-white/10`) |
| Focus | outline: 2px solid rgba(255, 255, 255, 0.5), outline-offset: 2px |
| Active (dropdown open) | same as hover |

---

### A_Dropdown-List - Language Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `525:11713` | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | flex-start | `align-items: flex-start` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background: var(--Details-Container-2, #00070C)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| position | absolute | `position: absolute` |
| z-index | 50 | `z-index: 50` (Tailwind: `z-50`) |
| min-width | 120px | `min-width: 120px` (ensures consistent width) |

---

### A.1_tieng Viet - Selected Language Item (Vietnamese)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085` | - |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| border-radius | 2px | `border-radius: 2px` |
| background | rgba(255, 234, 158, 0.2) | `background: rgba(255, 234, 158, 0.2)` |
| padding | 16px | `padding: 16px` |
| justify-content | space-between | `justify-content: space-between` |
| cursor | pointer | `cursor: pointer` |

**Inner Content (Frame 485):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085;186:1821;186:1937` | - |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |

**Flag Icon (VN):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085;186:1821;186:1709` | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| Component | IC (VN - Vietnam flag) | `<FlagIcon country="vn" />` |

**Language Code Text (VN):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085;186:1821;186:1439` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

**States:**

| State | Changes |
|-------|---------|
| Default (Selected) | background: rgba(255, 234, 158, 0.2) |
| Hover | background: rgba(255, 234, 158, 0.3) (intensified highlight) |
| Focus | outline: 2px solid rgba(255, 255, 255, 0.5), outline-offset: 2px |

---

### A.2_tieng Anh - Language Option Item (English)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128` | - |
| width | 110px | `width: 110px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background: transparent` |
| padding | 16px | `padding: 16px` |
| cursor | pointer | `cursor: pointer` |

**Inner Content:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128;186:1903;186:1937` | - |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |

**Flag Icon (EN):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128;186:1903;186:1709` | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| Component | IC (GB-NIR - Northern Ireland / UK flag) | `<FlagIcon country="en" />` |

**Language Code Text (EN):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128;186:1903;186:1439` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

**States:**

| State | Changes |
|-------|---------|
| Default | background: transparent |
| Hover | background: rgba(255, 255, 255, 0.1) |
| Focus | outline: 2px solid rgba(255, 255, 255, 0.5), outline-offset: 2px |
| Active | background: rgba(255, 234, 158, 0.2) (same as selected state) |

---

## Component Hierarchy with Styles

```
LanguageSelector (relative container)
├── Trigger Button (flex-row, items-center, gap: 2px, px: 16px, py: 16px, r: 4px, hover: bg-white/10)
│   ├── IC Flag (current language) (24x24px)
│   ├── Text (current lang code) (Montserrat 16px/24px, bold, white)
│   └── ChevronDownIcon (24x24px, white)
│
└── A_Dropdown-List [visible when isOpen=true] (pos: absolute, z: 50, bg: #00070C, border: 1px #998C5F, r: 8px, p: 6px, flex-col)
    ├── A.1_tieng Viet [SELECTED] (~110x56px*, bg: rgba(255,234,158,0.2), r: 2px, p: 16px, flex-row)
    │   ├── IC Flag VN (24x24px, flag icon)
    │   └── Text "VN" (Montserrat 16px/24px, bold, white, ls: 0.15px)
    │
    ├── A.2_tieng Anh [OPTION] (~110x56px*, bg: transparent, r: 4px, p: 16px, flex-row, center)
    │   ├── IC Flag EN/UK (24x24px, flag icon)
    │   └── Text "EN" (Montserrat 16px/24px, bold, white, ls: 0.15px)
    │
    └── A.3_tieng Nhat [OPTION] (~110x56px*, bg: transparent, r: 4px, p: 16px, flex-row, center)
        ├── IC Flag JA (24x24px, flag icon)
        └── Text "JA" (Montserrat 16px/24px, bold, white, ls: 0.15px)
```

> *Width note: Figma shows A.1 as 108px and A.2 as 110px — a 2px discrepancy that is likely a Figma artifact. Implementation should use consistent width (e.g., `w-full` within the container) for all items.

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | - |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dropdown position | Aligned to right edge of header, top: 100% of trigger |
| Item size | Same size (56px height), touch-friendly by default |

#### Tablet & Desktop (>= 768px)

| Component | Changes |
|-----------|---------|
| Dropdown position | Same alignment, no changes |
| No layout changes | Dropdown is compact by design |

---

## Icon Specifications

| Icon Name | Size | Usage | Asset |
|-----------|------|-------|-------|
| Flag VN (Vietnam) | 20x15px (in 24x24 container) | Vietnamese language option | SVG flag component |
| Flag GB-NIR (UK) | 20x15px (in 24x24 container) | English language option | SVG flag component |
| Flag JA (Japan) | 20x15px (in 24x24 container) | Japanese language option (codebase supports 3 languages) | SVG flag component |
| ChevronDown | 24x24px | Trigger button indicator | `ChevronDownIcon` component |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform | 150ms | ease-out | Toggle open/close |
| Language item | background-color | 150ms | ease-in-out | Hover |
| Trigger button | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Trigger Button | (in Header) | `flex items-center gap-0.5 px-4 py-4 rounded-[var(--radius-language)] cursor-pointer hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2` | `<button>` in `<LanguageSelector />` |
| Dropdown Container | 525:11713 | `absolute z-50 right-0 top-full mt-1 bg-[#00070C] border border-[var(--color-border)] rounded-lg p-1.5 flex flex-col min-w-[120px]` | `<ul role="listbox">` in `<LanguageSelector />` |
| Selected Item (VN) | I525:11713;362:6085 | `flex items-center rounded-sm bg-[rgba(255,234,158,0.2)] px-4 py-4 cursor-pointer` | `<li role="option" aria-selected="true">` |
| Option Item (EN) | I525:11713;362:6128 | `flex items-center rounded px-4 py-4 cursor-pointer hover:bg-white/10` | `<li role="option">` |
| Option Item (JA) | (same style as EN) | `flex items-center rounded px-4 py-4 cursor-pointer hover:bg-white/10` | `<li role="option">` |
| Flag Icon | I525:11713;362:6085;186:1821;186:1709 | `w-6 h-6` | `<Image src="/assets/auth/login/{lang}-flag.svg" />` |
| Language Code | I525:11713;362:6085;186:1821;186:1439 | `text-base font-bold text-white tracking-[0.15px] font-[family-name:var(--font-montserrat)]` | `<span>` |
| ChevronDown Icon | (in Trigger) | `w-6 h-6 text-white` | `<ChevronDownIcon />` |

---

## Notes

- The Figma design shows 2 languages (VN, EN), but the codebase already supports 3 languages: `vi`, `en`, `ja` (Vietnamese, English, Japanese). The JA option is not in Figma but MUST be included per codebase requirements.
- Flag icons should use SVG components inside an Icon Component wrapper per constitution standards
- The dropdown uses a gold-themed border (#998C5F) consistent with the SAA 2025 design system
- Selected state uses a warm gold highlight (rgba(255, 234, 158, 0.2)) to indicate the active language
- Font family is Montserrat (Bold 700) for language codes, consistent with navigation text styles
- All colors should use CSS variables for theming support where applicable
- **Existing CSS variables** in `globals.css` that should be reused: `--radius-language: 4px` (trigger button radius), `--color-border: #998C5F` (dropdown border matches project gold border token), `--color-primary: #FFEA9E` (base color for selected highlight)
- The trigger button currently renders the VN flag ONLY when `currentLanguage === "vi"` — it should render the appropriate flag for ALL languages
