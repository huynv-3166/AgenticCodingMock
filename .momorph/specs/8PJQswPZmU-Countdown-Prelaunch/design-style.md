# Design Style: Countdown - Prelaunch Page

**Frame ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `8PJQswPZmU`
**Extracted At**: 2026-04-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-page | #00101A | 100% | Page background (dark navy) |
| --color-bg-gradient-start | #00101A | 100% | Gradient overlay start (bottom-left) |
| --color-bg-gradient-mid | #00121D | 46% | Gradient overlay mid-point |
| --color-bg-gradient-end | #001320 | 0% | Gradient overlay end (transparent) |
| --color-text-primary | #FFFFFF | 100% | Title text, unit labels, digit text |
| --color-digit-border | #FFEA9E | 100% | Digit card border (gold accent) |
| --color-digit-bg-start | #FFFFFF | 100% | Digit card gradient start (top) |
| --color-digit-bg-end | #FFFFFF | 10% | Digit card gradient end (bottom) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-title | Montserrat | 36px | 700 (Bold Italic) | 48px | 0px |
| --text-digit | Digital Numbers | 73.73px | 400 (Regular) | auto | 0% |
| --text-unit-label | Montserrat | 36px | 700 (Bold) | 48px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-padding-x | 144px | Horizontal padding of content area (Bia) |
| --spacing-page-padding-y | 96px | Vertical padding of content area (Bia) |
| --spacing-title-to-timer | 24px | Gap between title and countdown timer |
| --spacing-unit-gap | 60px | Gap between countdown units (Days/Hours/Minutes) |
| --spacing-digit-gap | 21px | Gap between the two digit cards in each unit |
| --spacing-digits-to-label | 21px | Gap between digit cards row and unit label |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-digit-card | 12px | Digit card border radius |
| --border-digit-card | 0.75px solid #FFEA9E | Digit card border (gold) |

### Shadows & Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --digit-card-opacity | 0.5 | Digit card container opacity |
| --digit-card-blur | blur(24.96px) | Digit card backdrop blur (glassmorphism) |
| --digit-card-bg | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Digit card gradient background |

---

## Layout Specifications

### Container (Full Page)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Full Figma frame width |
| height | 1077px | Full Figma frame height |
| background | #00101A | Dark navy background |

### Background Layers

| Layer | Type | Properties |
|-------|------|------------|
| 1 - BG Image | RECTANGLE | `url(<bg-image>) lightgray -142px -789.753px / 109.392% 216.017% no-repeat` — colorful abstract art positioned right |
| 2 - Cover Gradient | RECTANGLE | `linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)` |

### Content Area (Bia)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Full width |
| height | 456px | Content container |
| padding | 96px 144px | Vertical / Horizontal |
| display | flex |  |
| flex-direction | column |  |
| align-items | center |  |
| justify-content | center |  |
| gap | 120px | Between inner sections |
| position | absolute | Positioned over background |
| top | 218px | Vertical offset from top |

### Layout Structure (ASCII)

```
┌─────────────────────────── 1512px ──────────────────────────┐
│ Page (bg: #00101A)                                          │
│                                                             │
│ ┌─────────────────── BG Image Layer ──────────────────────┐ │
│ │ Colorful abstract art (positioned right side)           │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────── Gradient Overlay Layer ──────────────────┐ │
│ │ linear-gradient(18deg, #00101A → transparent)           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌────────── Bia Content (padding: 96px 144px) ───────────┐ │
│ │                                                         │ │
│ │            "Sự kiện sẽ bắt đầu sau"                     │ │
│ │       (Montserrat Bold Italic 36px, white, center)       │ │
│ │                     ↕ 24px                              │ │
│ │  ┌─────────┐  ←60px→  ┌─────────┐  ←60px→  ┌────────┐ │ │
│ │  │ 1_Days  │          │ 2_Hours │          │3_Mins  │ │ │
│ │  │ ┌──┐┌──┐│          │ ┌──┐┌──┐│          │┌──┐┌──┐│ │ │
│ │  │ │00││00││          │ │05││05││          ││20││20││ │ │
│ │  │ └──┘└──┘│          │ └──┘└──┘│          │└──┘└──┘│ │ │
│ │  │  21px   │          │  21px   │          │ 21px   │ │ │
│ │  │  DAYS   │          │  HOURS  │          │MINUTES │ │ │
│ │  └─────────┘          └─────────┘          └────────┘ │ │
│ │     175px                175px               175px      │ │
│ │              ←──── 644px total ────→                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Title Text — "Sự kiện sẽ bắt đầu sau"

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2268:35137` | - |
| width | 1512px (full) | `width: 100%` |
| height | 48px | `height: 48px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| font-style | italic | `font-style: italic` |
| line-height | 48px | `line-height: 48px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

> **Note**: The italic style is visually confirmed from the Figma screenshot (text leans right). The Figma style API did not surface a `fontStyle` property — verify in Figma if needed. Use `Montserrat Bold Italic` variant via `next/font/google`.

---

### Countdown Timer Container (Time)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2268:35138` | - |
| width | 644px | `width: 644px` |
| height | 192px | `height: 192px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 60px | `gap: 60px` |

---

### Countdown Unit (Days / Hours / Minutes)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (Days)** | `2268:35139` | - |
| **Node ID (Hours)** | `2268:35144` | - |
| **Node ID (Minutes)** | `2268:35149` | - |
| width | 175px | `width: 175px` |
| height | 192px | `height: 192px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | flex-start | `align-items: flex-start` |
| gap | 21px | `gap: 21px` |

#### Digit Cards Row (Frame 485)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (Days)** | `2268:35140` | - |
| **Node ID (Hours)** | `2268:35145` | - |
| **Node ID (Minutes)** | `2268:35150` | - |
| width | 175px | `width: 175px` |
| height | 123px | `height: 123px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 21px | `gap: 21px` |

---

### Digit Card (Single digit — Instance of Component `186:2619`)

| Property | Value | CSS |
|----------|-------|-----|
| **Component ID** | `186:2619` | - |
| width | 77px (outer) / 76.8px (inner) | `width: 77px` |
| height | 123px (outer) / 122.88px (inner) | `height: 123px` |

#### Card Background (Rectangle)

| Property | Value | CSS |
|----------|-------|-----|
| width | 76.8px | `width: 76.8px` |
| height | 122.88px | `height: 122.88px` |
| opacity | 0.5 | `opacity: 0.5` |
| background | `linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%)` | `background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid #FFEA9E` |
| border-radius | 12px | `border-radius: 12px` |
| backdrop-filter | blur(24.96px) | `backdrop-filter: blur(24.96px)` |

> **Note**: The glassmorphism effect is created by combining the semi-transparent gradient, border, opacity, and backdrop blur.

#### Digit Text

| Property | Value | CSS |
|----------|-------|-----|
| width | 59px | `width: 59px` |
| height | 95px | `height: 95px` |
| font-family | Digital Numbers | `font-family: 'Digital Numbers', monospace` |
| font-size | 73.73px | `font-size: 73.73px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |
| text-align | left | `text-align: left` |
| position | centered within card | Centered via absolute positioning |

---

### Unit Label (DAYS / HOURS / MINUTES)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (DAYS)** | `2268:35143` | - |
| **Node ID (HOURS)** | `2268:35148` | - |
| **Node ID (MINUTES)** | `2268:35153` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
Countdown - Prelaunch page (1512x1077, bg: #00101A)
├── BG Image (1512x1077, absolute, background-image)
├── Cover Gradient (1512x1077, absolute, linear-gradient 18deg)
└── Bia (1512x456, absolute, top: 218px, p: 96px 144px, flex, col, center, gap: 120px)
    └── Frame 487 (content wrapper)
        └── Frame 523 (content wrapper)
            └── Countdown time (flex, col, center, gap: 24px)
                ├── Title "Sự kiện sẽ bắt đầu sau" (Montserrat 700 italic 36px/48px, white, center)
                └── Time (flex, row, center, gap: 60px, w: 644px)
                    ├── 1_Days (flex, col, gap: 21px, w: 175px)
                    │   ├── Frame 485 (flex, row, gap: 21px)
                    │   │   ├── Digit Card [0] (77x123, glassmorphism)
                    │   │   │   ├── Rectangle (76.8x122.88, gradient bg, border #FFEA9E, r: 12px, blur)
                    │   │   │   └── Text "0" (Digital Numbers 73.73px, white)
                    │   │   └── Digit Card [0] (77x123, glassmorphism)
                    │   │       ├── Rectangle (same as above)
                    │   │       └── Text "0" (Digital Numbers 73.73px, white)
                    │   └── Label "DAYS" (Montserrat 700 36px/48px, white)
                    │
                    ├── 2_Hours (flex, col, gap: 21px, w: 175px)
                    │   ├── Frame 485 (flex, row, gap: 21px)
                    │   │   ├── Digit Card [0] → digit text
                    │   │   └── Digit Card [5] → digit text
                    │   └── Label "HOURS" (Montserrat 700 36px/48px, white)
                    │
                    └── 3_Minutes (flex, col, gap: 21px, w: 175px)
                        ├── Frame 485 (flex, row, gap: 21px)
                        │   ├── Digit Card [2] → digit text
                        │   └── Digit Card [0] → digit text
                        └── Label "MINUTES" (Montserrat 700 36px/48px, white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | infinity |

### Responsive Changes

#### Mobile (< 768px)

| Component | Property | Value |
|-----------|----------|-------|
| Page padding | padding | 48px 24px |
| Title | font-size | 20px |
| Title | line-height | 28px |
| Title | font-style | italic |
| Timer container | flex-direction | row (keep horizontal) |
| Timer container | gap | 16px |
| Digit card | width | 48px |
| Digit card | height | 77px |
| Digit card bg | width | 47.8px |
| Digit card bg | height | 76.8px |
| Digit card bg | border-radius | 8px |
| Digit text | font-size | 44px |
| Unit labels | font-size | 14px |
| Unit labels | line-height | 20px |
| Countdown unit | gap | 8px (digits-to-label) |
| Digit cards row | gap | 8px |
| Background image | object-position | right center, overflow hidden |

#### Tablet (768px - 1023px)

| Component | Property | Value |
|-----------|----------|-------|
| Page padding | padding | 64px 48px |
| Title | font-size | 28px |
| Title | line-height | 36px |
| Title | font-style | italic |
| Timer container | gap | 40px |
| Digit card | width | 60px |
| Digit card | height | 96px |
| Digit card bg | width | 59.8px |
| Digit card bg | height | 95.8px |
| Digit card bg | border-radius | 10px |
| Digit text | font-size | 56px |
| Unit labels | font-size | 24px |
| Unit labels | line-height | 32px |
| Countdown unit | gap | 14px |
| Digit cards row | gap | 14px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | Use Figma values as specified above (designed at 1512px) |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Digit card (flip) | transform, opacity | 300ms | ease-in-out | Every minute tick |
| Digit value | opacity | 200ms | ease-out | Value change |
| Page load | opacity | 500ms | ease-in | Initial render |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page background | `2268:35127` | `bg-[#00101A] relative min-h-screen overflow-hidden` | `<CountdownPrelaunchPage>` |
| BG Image | `2268:35129` | `absolute inset-0 bg-cover bg-no-repeat` | Background `<Image>` or CSS bg |
| Cover Gradient | `2268:35130` | `absolute inset-0` + inline gradient | `<div>` overlay |
| Content Area | `2268:35131` | `relative z-10 flex flex-col items-center justify-center px-36 py-24` | Content wrapper |
| Title | `2268:35137` | `text-white text-center font-bold italic text-4xl leading-[48px] font-montserrat` | `<h1>` |
| Timer container | `2268:35138` | `flex items-center gap-[60px]` | `<CountdownTimer>` |
| Countdown unit | `2268:35139` etc. | `flex flex-col items-start gap-[21px]` | `<CountdownUnit>` |
| Digit cards row | `2268:35140` etc. | `flex items-center gap-[21px]` | Inner wrapper |
| Digit card | Component `186:2619` | Custom glassmorphism styles (see below) | `<DigitCard>` |
| Digit text | Inner text node | `font-['Digital_Numbers'] text-[73.73px] text-white` | `<span>` |
| Unit label | `2268:35143` etc. | `text-white font-bold text-4xl leading-[48px] font-montserrat` | `<span>` |

### Glassmorphism Digit Card CSS

```css
/* Digit card glassmorphism effect */
.digit-card {
  width: 77px;
  height: 123px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.digit-card-bg {
  width: 76.8px;
  height: 122.88px;
  border-radius: 12px;
  border: 0.75px solid #FFEA9E;
  background: linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%);
  opacity: 0.5;
  -webkit-backdrop-filter: blur(24.96px); /* Safari */
  backdrop-filter: blur(24.96px);
  position: absolute;
  inset: 0;
}
```

---

## Notes

- **Font: Digital Numbers** — This is a specialty font that mimics 7-segment LED displays. It must be loaded locally or via a web font service. Fallback: monospace.
- **Font: Montserrat** — Already used across the project (Login, Homepage). Load via `next/font/google`.
- **Background image** — The colorful abstract art (right side) needs to be exported from Figma as a media asset. Use `get_media_files` tool.
- **Glassmorphism** — The digit cards use `backdrop-filter: blur()` which has good modern browser support. Include `-webkit-backdrop-filter` for Safari compatibility.
- All colors should use CSS variables for theming support.
- Prefer Tailwind utility classes where possible.
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
