# Design Style: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**Extracted At**: 2026-04-08

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background, dark base |
| --color-header-bg | #0B0F12 | 80% | Header background (semi-transparent) |
| --color-gradient-start | #00101A | 100% | Left gradient overlay (horizontal) |
| --color-gradient-bottom-solid | #00101A | 100% | Bottom gradient overlay solid end (22.48%) |
| --color-gradient-bottom-fade | #001320 | 0% | Bottom gradient overlay transparent end (51.74%) |
| --color-text-white | #FFFFFF | 100% | Body text, language label, logo |
| --color-button-bg | #FFEA9E | 100% | Login button background |
| --color-button-text | #00101A | 100% | Login button text |
| --color-divider | #2E3940 | 100% | Footer top border |
| --color-error | #FF6B6B | 100% | Error message text |
| --color-button-hover | #FFE07A | 100% | Login button hover background |
| --color-button-active | #FFD54F | 100% | Login button active/pressed background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-body-desc | Montserrat | 20px | 700 (italic) | 40px | 0.5px |
| --text-button-login | Montserrat | 22px | 700 | 28px | 0px |
| --text-language | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0px |
| --text-error | Montserrat | 14px | 500 | 20px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-header-px | 144px | Header horizontal padding |
| --spacing-header-py | 12px | Header vertical padding |
| --spacing-hero-px | 144px | Hero section horizontal padding |
| --spacing-hero-py | 96px | Hero section vertical padding |
| --spacing-hero-gap | 80px | Gap between key visual and content |
| --spacing-content-gap | 24px | Gap between description and button |
| --spacing-content-left | 16px | Left padding on content block |
| --spacing-footer-px | 90px | Footer horizontal padding |
| --spacing-footer-py | 40px | Footer vertical padding |
| --spacing-button-px | 24px | Button horizontal padding |
| --spacing-button-py | 16px | Button vertical padding |
| --spacing-button-icon-gap | 8px | Gap between button text and icon |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-button | 8px | Login button |
| --radius-language | 4px | Language selector button |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-button-hover | 0 4px 12px rgba(255, 234, 158, 0.3) | Login button hover elevation |

No other box-shadows are used in the default design. Elevation is primarily achieved through layered gradients and opacity.

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Full viewport desktop |
| height | 1024px | Full viewport height |
| background | #00101A | Dark base background |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Login Screen (1440 x 1024, bg: #00101A)                                │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  A_Header (w: 1440, h: 80, bg: rgba(11,15,18,0.8))                │  │
│  │  padding: 12px 144px, flex, justify: space-between, align: center  │  │
│  │  ┌──────────┐                                       ┌──────────┐  │  │
│  │  │ A.1_Logo │                                       │A.2_Lang  │  │  │
│  │  │ 52x48px  │                                       │ 108x56px │  │  │
│  │  └──────────┘                                       └──────────┘  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  C_Keyvisual (1441x1022, background artwork, z-index: 1)          │  │
│  │  + Rectangle 57 (gradient overlay left-to-right)                   │  │
│  │  + Cover (gradient overlay bottom-to-top)                          │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  B_Bìa (w: 1440, h: 845, padding: 96px 144px)                     │  │
│  │  flex-direction: column, gap: 120px                                │  │
│  │                                                                    │  │
│  │  ┌──────────────────────────────────────┐                          │  │
│  │  │  B.1_Key Visual                      │                          │  │
│  │  │  "ROOT FURTHER" logo image           │                          │  │
│  │  │  451 x 200px                         │                          │  │
│  │  └──────────────────────────────────────┘                          │  │
│  │               ↕ gap: 80px                                          │  │
│  │  ┌──────────────────────────────────────┐                          │  │
│  │  │  Frame 550 (w: 496, padding-left: 16)│                          │  │
│  │  │  flex-direction: column, gap: 24px   │                          │  │
│  │  │                                      │                          │  │
│  │  │  B.2_content (480 x 80px)            │                          │  │
│  │  │  "Bắt đầu hành trình của bạn..."    │                          │  │
│  │  │  20px/40px Montserrat Bold, #FFF     │                          │  │
│  │  │                                      │                          │  │
│  │  │  B.3_Login (305 x 60px)              │                          │  │
│  │  │  "LOGIN With Google" + Google icon   │                          │  │
│  │  │  bg: #FFEA9E, radius: 8px            │                          │  │
│  │  └──────────────────────────────────────┘                          │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  D_Footer (w: 1440, border-top: 1px #2E3940, padding: 40px 90px)  │  │
│  │  flex, align: center, justify: space-between                       │  │
│  │  "Bản quyền thuộc về Sun* © 2025"                                 │  │
│  │  16px Montserrat Alternates Bold, #FFF                             │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header - Header Navigation Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14391 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(11, 15, 18, 0.8) | `background-color: rgba(11, 15, 18, 0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | fixed | `position: fixed; top: 0; z-index: 50` |

---

### A.1_Logo - Sun Annual Awards Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:2166 | - |
| width | 52px | `width: 52px` |
| height | 56px | `height: 56px` |
| content | Logo image (cover) | `background: url(...) 50% / cover no-repeat` |

**Interaction**: None (static logo)

---

### A.2_Language - Language Selector Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:1601 | - |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| gap | 2px | `gap: 2px` |
| cursor | pointer | `cursor: pointer` |

**Children**:
- Flag icon (VN): 24x24px, contains 20x15px flag SVG
- Text "VN": 16px Montserrat Bold, #FFFFFF, letter-spacing 0.15px
- Chevron down icon: 24x24px

**States:**
| State | Changes |
|-------|---------|
| Default | Transparent background |
| Hover | bg: rgba(255, 255, 255, 0.1), cursor pointer |
| Focus | outline: 2px solid rgba(255, 255, 255, 0.5), outline-offset: 2px |
| Active | Opens language dropdown (linked: Dropdown-ngon ngu, screen ID: hUyaaugye2) |

---

### B.1_Key Visual - ROOT FURTHER Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2939:9548 | - |
| width | 451px | `width: 451px` |
| height | 200px | `height: 200px` |
| content | Logo image | `background: url(...) 50% / cover no-repeat` |
| aspect-ratio | 115/51 | `aspect-ratio: 115 / 51` |

---

### B.2_content - Description Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14753 | - |
| width | 480px | `width: 480px` |
| height | 80px | `height: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| font-style | italic | `font-style: italic` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | left | `text-align: left` |

**Content**:
- Line 1: "Bắt đầu hành trình của bạn cùng SAA 2025."
- Line 2: "Đăng nhập để khám phá!"

> **Note**: The italic style is visually confirmed from the Figma screenshot (text leans right vs. upright button text). The Figma style API did not surface a `fontStyle` property — verify in Figma if needed. Use `Montserrat Bold Italic` variant via `next/font/google`.

---

### B.3_Login - Login With Google Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14426 | - |
| width | 305px | `width: 305px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Button text**:
- Text: "LOGIN With Google"
- Font: Montserrat 22px/28px, weight 700
- Color: #00101A (dark)
- Text-align: center

**Button icon**:
- Google icon: 24x24px, positioned after text

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E, text: #00101A |
| Hover | bg: #FFE07A, transform: translateY(-1px), box-shadow: 0 4px 12px rgba(255, 234, 158, 0.3) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px (keyboard navigation indicator) |
| Active | bg: #FFD54F, transform: translateY(0), triggers Google OAuth flow |
| Disabled | bg: #FFEA9E, opacity: 0.6, cursor: not-allowed, shows loading spinner replacing Google icon |

---

### Error Message (below Login Button) — Not in Figma, derived from spec

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | N/A (not in Figma) | - |
| margin-top | 12px | `margin-top: 12px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| line-height | 20px | `line-height: 20px` |
| color | #FF6B6B | `color: #FF6B6B` |
| text-align | left | `text-align: left` |

**Visibility**: Only shown when `errorMessage` state is non-null. Hidden by default.

---

### D_Footer - Copyright Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14447 | - |
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |

**Footer text**:
- Content: "Bản quyền thuộc về Sun* © 2025"
- Font: Montserrat Alternates 16px/24px, weight 700
- Color: #FFFFFF
- Text-align: center

---

### Background Layers

#### C_Keyvisual - Background Artwork
| Property | Value |
|----------|-------|
| **Node ID** | 662:14388 |
| width | 1441px |
| height | 1022px |
| content | Full-bleed artwork image |
| z-index | 1 (behind content) |

#### Rectangle 57 - Left Gradient Overlay
| Property | Value |
|----------|-------|
| **Node ID** | 662:14392 |
| width | 1442px |
| height | 1024px |
| background | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0) 100%)` |

#### Cover - Bottom Gradient Overlay
| Property | Value |
|----------|-------|
| **Node ID** | 662:14390 |
| width | 1440px |
| height | 1093px |
| background | `linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0.00) 51.74%)` |

---

## Component Hierarchy with Styles

```
Login (1440x1024, bg: #00101A)
├── C_Keyvisual (absolute, 1441x1022, background artwork image)
│   └── image 1 (artwork, cover)
├── Rectangle 57 (absolute, gradient left→right: #00101A → transparent)
├── Cover (absolute, gradient bottom→top: #00101A → transparent)
├── A_Header (absolute, top: 0, w: 100%, h: 80px, bg: rgba(11,15,18,0.8))
│   │  padding: 12px 144px, flex, space-between, items-center
│   ├── A.1_Logo (52x56px)
│   │   └── LOGO instance (52x48px, image cover)
│   └── A.2_Language (108x56px)
│       └── Button instance (108x56px, padding: 16px, radius: 4px)
│           ├── Flag icon VN (24x24px)
│           ├── Text "VN" (16px Montserrat Bold, #FFF)
│           └── Chevron down (24x24px)
├── B_Bia (absolute, w: 1440, h: 845, padding: 96px 144px)
│   │  flex-col, gap: 120px
│   └── Frame 487 (w: 1152, h: 653, flex-col, gap: 80px, justify: center)
│       ├── B.1_Key Visual (w: 1152, h: 200)
│       │   └── ROOT FURTHER logo (451x200px, image cover)
│       └── Frame 550 (w: 496, h: 164, flex-col, gap: 24px, pl: 16px)
│           ├── B.2_content (480x80px, 20px/40px Montserrat Bold, #FFF)
│           └── B.3_Login (305x60px)
│               └── Button-IC (305x60px, bg: #FFEA9E, radius: 8px, p: 16px 24px)
│                   ├── Text "LOGIN With Google" (22px/28px Montserrat Bold, #00101A)
│                   └── Google icon (24x24px)
└── D_Footer (absolute, bottom: 0, w: 100%, border-top: 1px #2E3940)
    │  padding: 40px 90px, flex, space-between, items-center
    └── Text "Bản quyền thuộc về Sun* © 2025" (16px Montserrat Alternates Bold, #FFF)
```

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
| A_Header | padding: 12px 16px, h: 64px |
| A.1_Logo | Scale down to 40x36px |
| A.2_Language | Compact: icon + chevron only or smaller |
| B_Bia | padding: 48px 16px |
| B.1_Key Visual | width: 100%, max-width: 280px, height: auto |
| B.2_content | font-size: 16px, line-height: 28px, width: 100% |
| B.3_Login | width: 100%, max-width: 305px |
| D_Footer | padding: 24px 16px, text center |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| A_Header | padding: 12px 48px |
| B_Bia | padding: 64px 48px |
| B.1_Key Visual | width: 360px, height: auto |
| B.2_content | font-size: 18px, line-height: 36px |
| D_Footer | padding: 32px 48px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | Use Figma values as specified above |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| MM_MEDIA_Logo | 52x48px | - | Sun Annual Awards logo (image) |
| MM_MEDIA_VN | 20x15px | - | Vietnam flag icon |
| MM_MEDIA_Down | 24x24px | #FFFFFF | Chevron down arrow |
| MM_MEDIA_Google | 24x24px | - | Google brand icon |
| MM_MEDIA_Root Further Logo | 451x200px | - | ROOT FURTHER title image |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| B.3_Login Button | background-color, transform | 150ms | ease-in-out | Hover |
| B.3_Login Button | opacity | 200ms | ease-in-out | Disabled state |
| A.2_Language | background-color | 150ms | ease-in-out | Hover |
| Language Dropdown | opacity, transform | 150ms | ease-out | Toggle |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Login Page | 662:14387 | `min-h-screen bg-[#00101A] relative overflow-hidden` | `<LoginPage />` |
| Header | 662:14391 | `fixed top-0 w-full h-20 bg-[#0B0F12]/80 px-36 flex items-center justify-between z-50` | `<Header />` |
| Logo | I662:14391;186:2166 | `w-[52px] h-[56px]` | `<Logo />` |
| Language Selector | I662:14391;186:1601 | `flex items-center gap-0.5 px-4 py-4 rounded cursor-pointer` | `<LanguageSelector />` |
| Key Visual Image | 2939:9548 | `w-[451px] h-[200px] object-cover` | `<Image />` (next/image) |
| Description Text | 662:14753 | `text-xl font-bold italic leading-[40px] tracking-[0.5px] text-white font-montserrat` | `<p>` |
| Login Button | 662:14426 | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg` | `<LoginButton />` |
| Button Text | I662:14426;186:1935 | `text-[22px] font-bold leading-7 text-[#00101A] font-montserrat` | `<span>` |
| Google Icon | I662:14426;186:1766 | `w-6 h-6` | `<GoogleIcon />` |
| Footer | 662:14447 | `w-full border-t border-[#2E3940] px-[90px] py-10 flex items-center justify-between` | `<Footer />` |
| Footer Text | I662:14447;342:1413 | `text-base font-bold text-white font-montserrat-alternates` | `<span>` |
| Background Artwork | 662:14388 | `absolute inset-0 w-full h-full object-cover` | `<Image />` (next/image) |
| Left Gradient | 662:14392 | `absolute inset-0` + inline style: `background: linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)` | `<div>` |
| Bottom Gradient | 662:14390 | `absolute inset-0` + inline style: `background: linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)` | `<div>` |
| Error Message | N/A | `mt-3 text-sm font-medium text-[#FF6B6B] font-montserrat` | `<p>` (conditionally rendered) |
| Loading Spinner | N/A | `w-6 h-6 animate-spin` | `<LoadingSpinner />` (replaces Google icon in disabled state) |

---

## Notes

- All fonts use **Montserrat** (body/buttons) and **Montserrat Alternates** (footer). Both MUST be loaded via Google Fonts or `next/font/google`.
- The background is composed of 3 layers: artwork image + left gradient + bottom gradient. Use absolute positioning with z-index to stack them.
- The Login button uses the Google brand color icon. Follow Google's branding guidelines for the icon.
- The header is semi-transparent (80% opacity dark) and overlays the background artwork.
- Color contrast: White text (#FFFFFF) on dark background (#00101A) exceeds WCAG AAA ratio (>7:1).
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
