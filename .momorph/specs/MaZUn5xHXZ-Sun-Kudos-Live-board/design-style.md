# Design Style: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**Screen ID**: `MaZUn5xHXZ`
**Figma File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-13
**Frame Dimensions**: 1440px x 5862px

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --Details-Background | #00101A | 100% | Page background, gradient endpoints, text on light cards |
| --Details-Container-2 | #00070C | 100% | Sidebar stat boxes, sunner list containers |
| --Details-Text-Primary-1 | #FFEA9E | 100% | Gold accent: section titles, stat numbers, active nav, borders |
| --Details-Text-Secondary-1 | #FFFFFF | 100% | White text, nav links, body text on dark bg, avatar borders |
| --Details-Text-Secondary-2 | #999999 | 100% | Timestamps, department codes, pagination text |
| --Details-Border | #998C5F | 100% | Standard border color (muted gold) for buttons, cards, sidebar |
| --Details-Divider | #2E3940 | 100% | Divider lines, footer border-top |
| --Details-PrimaryButton-Hover | #FFF8E1 | 100% | Kudo card backgrounds (cream) |
| --Details-SecondaryButton-Normal | #FFEA9E | 10% | Secondary button backgrounds |
| --Details-ButtonSecondary-Hover | #FFEA9E | 40% | Kudo content area background |
| --Details-TextButton-Normal | transparent | 0% | Transparent icon buttons |
| --color-header-bg | #101417 | 80% | Header semi-transparent background |
| --color-hashtag | #D4271D | 100% | Hashtag text, notification dot |
| --color-spotlight-name | #F17676 | 100% | Highlighted name in spotlight |
| --color-kudos-logo | #DBD1C1 | 100% | "KUDOS" hero display text |
| --color-text-glow | #FAE287 | 100% | Active nav text glow shadow |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| KV Overlay | `linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0.00) 47.8%)` | Hero banner gradient overlay |
| Carousel Fade Left | `linear-gradient(90deg, #00101A 50%, rgba(255, 255, 255, 0.00) 100%)` | Left side carousel fade |
| Carousel Fade Right | `linear-gradient(270deg, #00101A 50%, rgba(255, 255, 255, 0.00) 100%)` | Right side carousel fade |
| Spotlight Overlay | `linear-gradient(0deg, rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))` | Spotlight board dark overlay |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-hero-display | SVN-Gotham | 139.78px | 400 | 34.95px | -13% | #DBD1C1 |
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px | #FFEA9E |
| --text-hero-subtitle | Montserrat | 36px | 700 | 44px | 0px | #FFEA9E |
| --text-spotlight-count | Montserrat | 36px | 700 | 44px | 0px | #FFFFFF |
| --text-stat-number | Montserrat | 32px | 700 | 40px | 0px | #FFEA9E |
| --text-pagination | Montserrat | 28px | 700 | 36px | 0px | #999999 |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF |
| --text-heart-count | Montserrat | 24px | 700 | 32px | 0px | #00101A |
| --text-sidebar-name | Montserrat | 22px | 700 | 28px | 0px | #FFEA9E |
| --text-stat-label | Montserrat | 22px | 700 | 28px | 0px | #FFFFFF |
| --text-button-primary | Montserrat | 22px | 700 | 28px | 0px | #00101A |
| --text-body-kudo | Montserrat | 20px | 700 | 32px | 0px | #00101A |
| --text-nav-link | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-user-name | Montserrat | 16px | 700 | 24px | 0.15px | #00101A |
| --text-timestamp | Montserrat | 16px | 700 | 24px | 0.5px | #999999 |
| --text-hashtag | Montserrat | 16px | 700 | 24px | 0.5px | #D4271D |
| --text-sidebar-desc | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-footer-copyright | Montserrat Alternates | 16px | 700 | 24px | 0% | #FFFFFF |
| --text-department | Montserrat | 14px | 700 | 20px | 0.1px | #999999 |
| --text-live-ticker | Montserrat | 14px | 700 | 20px | 0.1px | #FFFFFF |
| --text-badge | Montserrat | ~11.4px | 700 | ~16.3px | ~0.081px | #FFFFFF |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (header, sections) |
| --spacing-section-gap | 120px | Gap between major page sections |
| --spacing-hero-top | 96px | Hero top padding |
| --spacing-hero-bottom | 120px | Hero bottom padding |
| --spacing-card-lg | 40px | Kudo post card padding (top, left, right) |
| --spacing-card-sm | 24px | Highlight card padding |
| --spacing-card-bottom | 16px | Card bottom padding |
| --spacing-sidebar | 24px | Sidebar box padding |
| --spacing-footer-y | 40px | Footer vertical padding |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-gap-xxl | 80px | Content to sidebar gap, footer logo to nav |
| --spacing-gap-xl | 48px | Footer nav links gap |
| --spacing-gap-lg | 32px | Filter to content gap, pagination controls gap |
| --spacing-gap-md | 24px | Card user info row gap, carousel items gap, sidebar sections gap |
| --spacing-gap-sm | 16px | Card inner sections gap, filter items gap |
| --spacing-gap-xs | 8px | Button icon+text gap, sidebar items gap |
| --spacing-gap-xxs | 4px | Heart icon+count gap, nav items gap |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-card | 24px | Kudo post & highlight cards |
| --radius-pill | 68px | Action buttons (write kudos, search) |
| --radius-avatar | 64px | Avatar circles |
| --radius-badge | 48px | Hero badge pills |
| --radius-spotlight | 47.14px | Spotlight board container |
| --radius-thumbnail | 18px | Image thumbnail outer |
| --radius-sidebar | 17px | Sidebar stat/sunner boxes |
| --radius-content | 12px | Kudo content text area |
| --radius-button | 8px | Primary action button ("Mo Secret Box"), scrollbar |
| --radius-sm | 4px | Nav buttons, filter dropdowns, action buttons |
| --radius-dot | 100px | Notification dot |
| --border-standard | 1px solid #998C5F | Filter buttons, sidebar boxes, spotlight frame |
| --border-highlight | 4px solid #FFEA9E | Active highlight card |
| --border-content | 1px solid #FFEA9E | Kudo content text container |
| --border-divider | 1px solid #2E3940 | Footer, section dividers |
| --border-avatar | 1.869px solid #FFFFFF | Avatar circle border |
| --border-badge | 0.5px solid #FFEA9E | Hero badge outline |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-nav-glow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav link text glow |
| --shadow-badge-glow | 0 0 1.3px #FFF | Legend Hero badge text glow |
| --shadow-badge-dark | 0 0.386px 1.543px #000 | Rising/Super Hero badge shadow |

> Note: No `box-shadow` values found. All shadows are `text-shadow` effects.

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| max-width | 1440px | Full viewport width |
| content-width | 1152px | 1440px - 2*144px page padding |
| padding-x | 144px | Horizontal page padding |
| background | #00101A | Deep navy/dark blue |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Page (1440px, bg: #00101A)                                                  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  A_Header (1440x80, bg: rgba(16,20,23,0.8), px: 144, py: 12)           ││
│  │  [Logo 52x48] ──gap:64── [NavLinks gap:24] ──gap:238── [Lang+Bell]     ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  A_KV Kudos (1440x512, background-image + gradient overlay)             ││
│  │  px: 144, pt: 96, pb: 120                                               ││
│  │  ┌──────────────────────────────────────────────────────────────┐        ││
│  │  │  Title: "He thong ghi nhan va cam on" (36px, #FFEA9E)       │        ││
│  │  │  Logo: "KUDOS" (SVN-Gotham 139.78px, #DBD1C1)               │        ││
│  │  └──────────────────────────────────────────────────────────────┘        ││
│  │  ┌─────────────────────────────────┐ ┌────────────────────────┐         ││
│  │  │ Write Kudos (738x72, pill)      │ │ Search (381x72, pill)  │         ││
│  │  └─────────────────────────────────┘ └────────────────────────┘         ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ──── gap: 120px ────                                                        │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  B_Highlight (1440px, gap: 40px, px: 144)                               ││
│  │  ┌──────────────────────────────────────────────────────────────┐       ││
│  │  │  B.1_Header: "Sun* Annual Awards 2025 / HIGHLIGHT KUDOS"    │       ││
│  │  │  [Divider 1152x1] + [Title 57px] + [Hashtag btn] [PB btn]  │       ││
│  │  └──────────────────────────────────────────────────────────────┘       ││
│  │  ┌─────┐ ┌──────────┐ ┌─────────────┐ ┌──────────┐ ┌─────┐            ││
│  │  │ Fade│ │ Card dim │ │ Card ACTIVE │ │ Card dim │ │Fade │            ││
│  │  │ L   │ │  528px   │ │528px,4px bdr│ │  528px   │ │ R   │            ││
│  │  └─────┘ └──────────┘ └─────────────┘ └──────────┘ └─────┘            ││
│  │  ┌──────────────────────────────────────────────────────────────┐       ││
│  │  │  B.5_Slide: [< prev] ── "2/5" ── [next >]  (gap: 32px)     │       ││
│  │  └──────────────────────────────────────────────────────────────┘       ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ──── gap: 120px ────                                                        │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  B.6_Header: "Sun* Annual Awards 2025 / SPOTLIGHT BOARD"               ││
│  │  ┌──────────────────────────────────────────────────────────────┐       ││
│  │  │  B.7_Spotlight (1157x548, border-radius: 47px, border: #998C5F)     ││
│  │  │  [388 KUDOS label] [Search bar] [Pan/Zoom] [Word cloud]    │       ││
│  │  └──────────────────────────────────────────────────────────────┘       ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ──── gap: 120px ────                                                        │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  C_All Kudos (1440x3237, gap: 40px, px: 144)                           ││
│  │  ┌──────────────────────────────────────────────────────────────┐       ││
│  │  │  C.1_Header: "Sun* Annual Awards 2025 / ALL KUDOS"          │       ││
│  │  └──────────────────────────────────────────────────────────────┘       ││
│  │  ┌──────────────────────────────────┐ ┌─────────────────────┐          ││
│  │  │  C.2_Kudo List (680px)           │ │  D_Sidebar (422px)  │          ││
│  │  │  ┌──────────────────────────┐    │ │  ┌───────────────┐  │          ││
│  │  │  │  Kudo Card (680px)       │    │ │  │ D.1_Stats     │  │          ││
│  │  │  │  px: 40, pt: 40, pb: 16 │    │ │  │ (bdr: #998C5F)│  │          ││
│  │  │  │  bg: #FFF8E1, r: 24px   │    │ │  │ bg: #00070C   │  │          ││
│  │  │  └──────────────────────────┘    │ │  │ r: 17px, p:24 │  │          ││
│  │  │  ── gap: 24px ──                 │ │  └───────────────┘  │          ││
│  │  │  ┌──────────────────────────┐    │ │  ── gap: 24px ──    │          ││
│  │  │  │  Kudo Card (680px)       │    │ │  ┌───────────────┐  │          ││
│  │  │  └──────────────────────────┘    │ │  │ D.3_Sunner    │  │          ││
│  │  │  ...infinite scroll...           │ │  │ Leaderboard   │  │          ││
│  │  └──────────────────────────────────┘ │  └───────────────┘  │          ││
│  │           ──── gap: 80px ────         └─────────────────────┘          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  Footer (1440px, px: 90, py: 40, border-top: 1px solid #2E3940)        ││
│  │  [Logo 69x64] ──gap:80── [NavLinks gap:48] ──── [Copyright]            ││
│  └──────────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13433 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.8) | `background-color: rgba(16, 20, 23, 0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| gap | 238px | `gap: 238px` |

**Nav Link States:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, font: Montserrat 700 16px/24px |
| Hover | color: #FFEA9E |
| Active (current page) | color: #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287, border-bottom: 1px solid #FFEA9E |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### A_KV Kudos (Hero Banner)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13437 | - |
| width | 1440px | `width: 100%` |
| height | 512px | `height: 512px` |
| background | image + gradient overlay | `background: linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%), url(...)` |
| content-area | 1152px x 160px | `max-width: 1152px; margin: 0 auto` |
| padding | 96px 144px 120px | `padding: 96px 144px 120px` |

**Background Image:** Full-bleed Figma asset (colorful abstract artwork). Export from Figma node `2940:13432` as high-res PNG/WebP and place at `public/assets/kudos/kv-kudos-bg.webp`. The gradient overlay is applied via CSS on top.
**Hero Title:** Montserrat 700 36px/44px, color: #FFEA9E
**KUDOS Logo:** SVN-Gotham 400 139.78px/34.95px, letter-spacing: -13%, color: #DBD1C1

---

### A.1_Button ghi nhan (Write Kudos CTA)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13449 | - |
| width | 738px | `width: 738px` |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.10) | `background: var(--Details-SecondaryButton-Normal)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 68px | `border-radius: 68px` |
| font | Montserrat 700 16px/24px | `font: 700 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: var(--Details-Text-Secondary-1)` |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(255, 234, 158, 0.20), border-color: #FFEA9E |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Search Button (Hero)

Same visual style as A.1_Button ghi nhan above, with:
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13448 | - |
| width | 381px | `width: 381px` |
| icon | magnifying glass, 32x32, #FFFFFF | - |

States: identical to Write Kudos CTA (Default, Hover, Focus).

---

### Filter Buttons (B.1.1, B.1.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2940:13459, 2940:13460 | - |
| padding | 16px | `padding: 16px` |
| background | rgba(255, 234, 158, 0.10) | `background: var(--Details-SecondaryButton-Normal)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 8px | `gap: 8px` (icon + text) |
| font | Montserrat 700 16px/24px | `font: 700 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: white` |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(255, 234, 158, 0.20), border-color: #FFEA9E |
| Active (filter applied) | background: rgba(255, 234, 158, 0.30), border-color: #FFEA9E, color: #FFEA9E |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Carousel Arrow Buttons (B.2.1, B.2.2, B.5.1, B.5.3)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2940:13470, 2940:13468, 2940:13472, 2940:13474 | - |
| width | 48px | `width: 48px` |
| height | 48px | `height: 48px` |
| border-radius | 4px | `border-radius: 4px` |
| padding | 10px | `padding: 10px` |
| background | transparent | `background: transparent` |

**States:**
| State | Changes |
|-------|---------|
| Default | opacity: 1.0, cursor: pointer |
| Hover | background: rgba(255, 234, 158, 0.10) |
| Disabled (at boundary) | opacity: 0.3, cursor: not-allowed |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Heart Button (C.4.1)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I3127:21871;256:5175 | - |
| layout | flex row, gap: 4px, items: center | `display: flex; gap: 4px; align-items: center` |
| icon | 32x32 | `width: 32px; height: 32px` |
| count font | Montserrat 700 24px/32px | `font: 700 24px/32px 'Montserrat'` |
| count color | #00101A | `color: #00101A` |

**States:**
| State | Changes |
|-------|---------|
| Default (not liked) | icon: gray outline heart, cursor: pointer |
| Liked | icon: filled red heart, scale animation on toggle (200ms) |
| Disabled (sender's own kudo) | opacity: 0.4, cursor: not-allowed |
| Hover (not liked) | icon: slight scale-up (1.1x) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Special Day x2 Badge:** Shown next to heart icon when `specialDayInfo.active` is true. Montserrat 700 ~17.5px, color: #FFF, background: #FFEA9E, border-radius: 48px, padding: 2px 6px. Positioned inline after the heart icon.

---

### Copy Link Button (C.4.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I3127:21871;256:5216 | - |
| width | 145px | `width: 145px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| font | Montserrat 700 16px/24px | `font: 700 16px/24px 'Montserrat'` |
| color | #00101A | `color: #00101A` |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(0, 0, 0, 0.05) |
| Active (just copied) | text briefly changes to "Copied!" for 2s |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Hashtag Tag (D.4, B.4.3, C.3.7)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | I3127:21871;256:5158, I2940:13465;335:9458 | - |
| font | Montserrat 700 16px/24px ls: 0.5px | `font: 700 16px/24px 'Montserrat'; letter-spacing: 0.5px` |
| color | #D4271D | `color: var(--color-hashtag)` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | color: #D4271D |
| Hover | text-decoration: underline, opacity: 0.8 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Image Thumbnail (C.3.6)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I3127:21871;256:5176 | - |
| width | 88px | `width: 88px` |
| height | 88px | `height: 88px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 18px | `border-radius: 18px` |
| background | #FFFFFF | `background: white` |
| cursor | pointer | `cursor: pointer` |
| object-fit | cover | `object-fit: cover` |

**States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | opacity: 0.85, transform: scale(1.03) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Spotlight Word Cloud Node

| Property | Value | CSS |
|----------|-------|-----|
| **Parent Node ID** | 2940:14174 | - |
| font | Montserrat 700, variable size (6-22px based on kudo count) | dynamic sizing |
| color | #FFFFFF (default), #F17676 (highlighted/selected) | `color: white` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | color: #FFF, opacity based on kudo count |
| Hover | color: #F17676, transform: scale(1.15), show tooltip (name + time) |
| Active (searched/matched) | color: #F17676, pulsing outline |
| Focus | outline: 2px solid #FFEA9E |

---

### Highlight Kudo Card (B.3)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13465 | - |
| width | 528px | `width: 528px` |
| padding | 24px 24px 16px 24px | `padding: 24px 24px 16px 24px` |
| background | #FFF8E1 | `background: var(--Details-PrimaryButton-Hover)` |
| border | 4px solid #FFEA9E (active) | `border: 4px solid var(--Details-Text-Primary-1)` |
| border-radius | 24px | `border-radius: 24px` |
| layout | flex column, gap: 16px | `display: flex; flex-direction: column; gap: 16px` |

**Avatar:** 64x64, border-radius: 64px, border: 1.869px solid #FFF
**Arrow Icon:** 32x32 centered in 32x123 container
**Dividers:** 480x1px, color: #FFEA9E
**Content Area:** border: 1px solid #FFEA9E, bg: rgba(255,234,158,0.40), border-radius: 12px, padding: 16px 24px
**User Name:** Montserrat 700 16px/24px ls: 0.15px, color: #00101A
**Department:** Montserrat 700 14px/20px ls: 0.1px, color: #999
**Hero Badge:** 109x19, border-radius: 48px, border: 0.5px solid #FFEA9E
**"Xem chi tiet" Link:** text: Montserrat 700 16px/24px, color: #00101A, cursor: pointer, hover: underline

**Carousel Card States:**
| State | Changes |
|-------|---------|
| Active (center) | border: 4px solid #FFEA9E, opacity: 1.0 (as above) |
| Non-active (flanking) | border: none, opacity: 0.5, partially hidden behind gradient fade overlays |

---

### Kudo Post Card (C.3)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3127:21871 | - |
| width | 680px | `width: 680px` |
| height | ~749px | `height: auto` |
| padding | 40px 40px 16px 40px | `padding: 40px 40px 16px 40px` |
| background | #FFF8E1 | `background: var(--Details-PrimaryButton-Hover)` |
| border-radius | 24px | `border-radius: 24px` |
| layout | flex column, gap: 16px | `display: flex; flex-direction: column; gap: 16px` |

**User Info Row:** 600px, flex row, gap: 24px, justify: space-between
**Avatar:** 64x64, border-radius: 64px, border: 1.869px solid #FFF
**Send Icon:** 32x32 centered
**Dividers:** 600x1px, color: #FFEA9E
**Content Area:** border: 1px solid #FFEA9E, bg: rgba(255,234,158,0.40), border-radius: 12px, padding: 16px 24px
**Message Text:** Montserrat 700 20px/32px, color: #00101A
**Image Thumbnails:** 88x88, border: 1px solid #998C5F, border-radius: 18px, bg: #FFF, gap: 16px
**Hashtags:** Montserrat 700 16px/24px ls: 0.5px, color: #D4271D
**Action Row:** 600px, flex row, gap: 24px, justify: space-between
**Copy Link Button:** 145x56, border-radius: 4px, padding: 16px
**Hearts:** gap: 4px, count: Montserrat 700 24px/32px #00101A, icon: 32x32

---

### D.1_Stats Box (Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13489 | - |
| width | 422px | `width: 422px` |
| padding | 24px | `padding: 24px` |
| background | #00070C | `background: var(--Details-Container-2)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 17px | `border-radius: 17px` |
| layout | flex column, gap: 16px | `display: flex; flex-direction: column; gap: 16px` |

**Stat Number:** Montserrat 700 32px/40px, color: #FFEA9E
**Stat Label:** Montserrat 700 22px/28px, color: #FFF
**Stat Row:** flex row, gap: 8px, justify: space-between, 374px
**Divider:** 374x1px, color: #2E3940
**"Mo Secret Box" Button:** 374x60, bg: #FFEA9E, border-radius: 8px, padding: 16px, text: Montserrat 700 22px/28px #00101A

**"Mo Secret Box" Button States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E, color: #00101A, cursor: pointer |
| Hover | background: #F5E08A (slightly darker gold), transform: translateY(-1px) |
| Disabled (no boxes) | background: #FFEA9E at 40% opacity, cursor: not-allowed |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### D.3_Sunner Leaderboard (Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13510 | - |
| width | 422px | `width: 422px` |
| padding | 24px 16px 24px 24px | `padding: 24px 16px 24px 24px` |
| background | #00070C | `background: var(--Details-Container-2)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 17px | `border-radius: 17px` |

**Title:** Montserrat 700 22px/28px, color: #FFEA9E
**List Items:** gap: 16px, each 364x64
**Item Avatar:** 64x64, border-radius: 64px, border: 1.869px solid #FFF
**Item Name:** Montserrat 700 22px/28px, color: #FFEA9E
**Item Desc:** Montserrat 700 16px/24px ls: 0.15px, color: #FFF
**Scrollbar:** 2x245, border-radius: 8px, color: #999

**Leaderboard Item States:**
| State | Changes |
|-------|---------|
| Default | as above |
| Hover | background: rgba(255, 234, 158, 0.05), cursor: pointer |

---

### B.7_Spotlight Board

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:14174 | - |
| width | 1157px | `width: 1157px` |
| height | 548px | `height: 548px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 47.14px | `border-radius: 47.14px` |
| background | image layers + dark overlay rgba(0,0,0,0.70) | `background: ...` |

**KUDOS Count:** Montserrat 700 36px/44px, color: #FFF
**Search Input (B.7.3):** Node ID: 2940:14833, border-radius: 46.404px, border: 0.682px solid #998C5F, background: transparent, padding: 16.378px 10.919px, font: Montserrat 500 10.919px/16.378px, color: #FFF, placeholder: "Tim kiem", max-length: 100
**Search Input States:** Default: as above | Focus: border-color: #FFEA9E | Filled: color: #FFF
**Pan/Zoom Button (B.7.2):** Node ID: 3007:17479, icon button, toggles pan/zoom mode
**Live Ticker:** Montserrat 700 14px/20px, color: #FFF

---

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13522 | - |
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--Details-Divider)` |
| layout | flex row, align: center, justify: space-between | `display: flex; align-items: center; justify-content: space-between` |

**Logo:** 69x64
**Nav Links:** gap: 48px, then gap: 80px (logo to nav group)
**Nav Text:** Montserrat 700 16px/24px ls: 0.15px, color: #FFF
**Active Nav:** bg: rgba(255,234,158,0.10), text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287
**Copyright:** Montserrat Alternates 700 16px/24px, color: #FFF

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 1440px)
├── A_Header (w: 1440, h: 80, bg: rgba(16,20,23,0.8), px: 144, flex, items-center, justify-between)
│   ├── Logo (52x48)
│   ├── NavLinks (flex, gap: 24px, text: 700 16px/24px #FFF, active: #FFEA9E + glow)
│   └── RightGroup (flex, gap: 16px) → [LangSelector] [NotificationBell]
│
├── A_KV Kudos (w: 1440, h: 512, bg-image + gradient, px: 144, pt: 96, pb: 120)
│   ├── Title (700 36px/44px #FFEA9E)
│   ├── KUDOS Logo (SVN-Gotham 400 139.78px #DBD1C1)
│   └── ActionButtons (flex, gap: 24px)
│       ├── WriteKudos (738x72, pill r:68, border: #998C5F, bg: #FFEA9E/10%)
│       └── Search (381x72, same style)
│
├── B_Highlight (gap: 40px, px: 144)
│   ├── B.1_Header (flex-col, gap: 40px)
│   │   ├── Subtitle (700 24px/32px #FFF)
│   │   ├── Divider (1152x1 #2E3940)
│   │   └── TitleRow (flex, justify: space-between)
│   │       ├── Title "HIGHLIGHT KUDOS" (700 57px/64px #FFEA9E)
│   │       └── Filters (flex, gap: 16px)
│   │           ├── Hashtag btn (border: #998C5F, bg: #FFEA9E/10%, r: 4px, p: 16px)
│   │           └── Phong ban btn (same)
│   │
│   ├── B.2_Carousel (flex-row, gap: 24px, items-center)
│   │   ├── FadeLeft (400x525 gradient)
│   │   ├── PrevArrow (48x48, r: 4px)
│   │   ├── Cards (flex, gap: 24px)
│   │   │   └── HighlightCard (528px, p: 24, bg: #FFF8E1, r: 24px, border: 4px #FFEA9E)
│   │   │       ├── UserInfoRow (flex, gap: 24px, justify: space-between)
│   │   │       │   ├── Sender (avatar 64x64 + name + dept + badge)
│   │   │       │   ├── ArrowIcon (32x32)
│   │   │       │   └── Receiver (avatar 64x64 + name + dept + badge)
│   │   │       ├── Divider (480x1 #FFEA9E)
│   │   │       ├── Content (gap: 16px)
│   │   │       │   ├── Timestamp (700 16px/24px #999)
│   │   │       │   ├── Category (700 16px/24px #00101A)
│   │   │       │   ├── MessageBox (border: #FFEA9E, bg: #FFEA9E/40%, r: 12px, p: 16px 24px)
│   │   │       │   └── Hashtags (700 16px/24px #D4271D)
│   │   │       ├── Divider (480x1 #FFEA9E)
│   │   │       └── ActionRow (flex, gap: 24px, justify: space-between)
│   │   │           ├── Buttons (flex, gap: 8px)
│   │   │           └── Hearts (icon 32x32 + count 700 24px/32px #00101A)
│   │   ├── NextArrow (48x48, r: 4px)
│   │   └── FadeRight (400x525 gradient)
│   │
│   └── B.5_Slide (flex, gap: 32px, justify: center)
│       ├── PrevBtn (48x48, r: 4px)
│       ├── PageText "2/5" (700 28px/36px #999)
│       └── NextBtn (48x48, r: 4px)
│
├── B.6_Spotlight Header (same structure as B.1 -- "SPOTLIGHT BOARD")
│
├── B.7_Spotlight (1157x548, r: 47px, border: #998C5F, bg: image + dark overlay)
│   ├── KudosCount "388 KUDOS" (700 36px/44px #FFF)
│   ├── SearchBtn (r: 46px, border: #998C5F)
│   ├── PanZoomBtn
│   └── WordCloud (interactive, with name nodes)
│
├── C_AllKudos (gap: 40px, px: 144)
│   ├── C.1_Header ("ALL KUDOS" 700 57px/64px #FFEA9E)
│   └── C.2_Content (flex-row, gap: 80px, justify: space-between)
│       ├── KudoList (680px, flex-col, gap: 24px) -- infinite scroll
│       │   └── KudoCard (680px, p: 40 40 16 40, bg: #FFF8E1, r: 24px)
│       │       ├── UserInfoRow (600px, flex, gap: 24px, justify: space-between)
│       │       ├── Divider (600x1 #FFEA9E)
│       │       ├── Content (600px, gap: 16px)
│       │       │   ├── Timestamp, Category, MessageBox, Images, Hashtags
│       │       ├── Divider (600x1 #FFEA9E)
│       │       └── ActionRow (CopyLink btn + Hearts)
│       │
│       └── D_Sidebar (422px, flex-col, gap: 24px)
│           ├── D.1_Stats (p: 24, bg: #00070C, r: 17px, border: #998C5F)
│           │   ├── StatRows (flex, gap: 8px, number: 700 32px #FFEA9E, label: 700 22px #FFF)
│           │   ├── Divider (#2E3940)
│           │   └── OpenGiftBtn (374x60, bg: #FFEA9E, r: 8px, text: 700 22px #00101A)
│           │
│           └── D.3_Leaderboard (p: 24 16 24 24, bg: #00070C, r: 17px, border: #998C5F)
│               ├── Title (700 22px/28px #FFEA9E)
│               └── Items (flex-col, gap: 16px)
│                   └── Item (avatar 64x64 + name 700 22px #FFEA9E + desc 700 16px #FFF)
│
└── Footer (px: 90, py: 40, border-top: #2E3940, flex, items-center, justify-between)
    ├── Logo (69x64)
    ├── NavLinks (gap: 48px, text: 700 16px/24px #FFF)
    └── Copyright (Montserrat Alternates 700 16px/24px #FFF)
```

---

## Responsive Specifications

> **Note:** This Figma frame is desktop-only (1440px). Mobile/tablet values below are directional guidelines based on constitution breakpoint requirements and mobile-first best practices. Refer to iOS mobile frames (e.g., `_b68CBWKl5` "[iOS] Sun*Kudos") for pixel-accurate mobile specs if available.

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | infinity |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Page padding | 144px -> 16px |
| Header | Hamburger menu, hide nav links, show mobile menu |
| Hero | Title: 24px, KUDOS logo: 60px, action buttons stack vertically, full width |
| Highlight carousel | Single card view, card width: 100%, hide fade overlays |
| Section titles | 57px -> 28px |
| All Kudos layout | Stack vertically: sidebar above kudo list, full width |
| Kudo cards | 680px -> 100%, padding: 16px |
| Sidebar | 422px -> 100%, full width above feed |
| Footer | Stack vertically, center align |
| Spotlight board | 1157px -> 100%, reduce height proportionally |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Page padding | 144px -> 40px |
| Carousel | 2 visible cards instead of 3, center card still highlighted |
| All Kudos layout | Side-by-side with reduced sidebar: feed takes remaining width, sidebar fixed at 300px |
| Kudo cards | 680px -> fill available width (calc(100% - 300px - 40px gap)) |
| Section titles | 57px -> 40px |
| Spotlight board | 100% width, maintain aspect ratio (reduce height proportionally) |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Layout | As designed (1440px max-width, 144px padding) |
| Carousel | 3 visible cards with center highlight |
| All Kudos | Side-by-side: 680px feed + 422px sidebar |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-pen | 32x32 | contextual | Write kudos input prefix |
| icon-search | 32x32 | #FFFFFF | Search button prefix |
| icon-arrow-right | 32x32 | contextual | Sender -> Receiver direction |
| icon-heart | 32x32 | #00101A (default) / red (liked) | Like toggle |
| icon-copy-link | contextual | #00101A | Copy link action |
| icon-chevron-left | 28x28 | #FFFFFF | Carousel prev |
| icon-chevron-right | 28x28 | #FFFFFF | Carousel next |
| icon-filter-down | contextual | #FFFFFF | Filter dropdown arrow |
| icon-bell | contextual | #FFFFFF | Notification bell |
| icon-lang | contextual | #FFFFFF | Language selector |
| icon-pan-zoom | contextual | #FFFFFF | Spotlight pan/zoom toggle |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav link | color, text-shadow | 150ms | ease-in-out | Hover |
| Filter button | background-color, border-color | 150ms | ease-in-out | Hover/Active |
| Carousel slide | transform | 300ms | ease-out | Prev/Next click |
| Carousel fade | opacity | 300ms | ease-in-out | Slide change |
| Heart button | transform (scale) | 200ms | ease-out | Click |
| Kudo card | opacity | 200ms | ease-in | Scroll into view |
| Spotlight node | transform (scale), opacity | 150ms | ease-out | Hover |
| Copy link toast | opacity, transform | 200ms | ease-out | Show/Hide |
| Infinite scroll | opacity | 150ms | ease-in | New items load |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | 2940:13431 | `bg-[#00101A] min-h-screen` | `<KudosPage />` |
| Header | 2940:13433 | `fixed top-0 w-full h-20 bg-[rgba(16,20,23,0.8)] px-36 flex items-center justify-between` | `<AppHeader />` |
| Hero Banner | 2940:13437 | `relative w-full h-[512px] bg-cover px-36 pt-24 pb-30` | `<KudosHero />` |
| Write Kudos CTA | 2940:13449 | `rounded-[68px] border border-[#998C5F] bg-[#FFEA9E]/10 px-4 py-6` | `<WriteKudosCTA />` |
| Highlight Section | 2940:13451 | `px-36 flex flex-col gap-10` | `<HighlightKudos />` |
| Highlight Card | 2940:13465 | `w-[528px] p-6 bg-[#FFF8E1] rounded-3xl border-4 border-[#FFEA9E]` | `<HighlightKudoCard />` |
| Carousel Controls | 2940:13471 | `flex gap-8 justify-center items-center` | `<CarouselPagination />` |
| Spotlight Board | 2940:14174 | `w-[1157px] h-[548px] rounded-[47px] border border-[#998C5F] overflow-hidden` | `<SpotlightBoard />` |
| All Kudos Section | 2940:13475 | `px-36 flex flex-col gap-10` | `<AllKudos />` |
| Kudo Post Card | 3127:21871 | `w-[680px] p-10 pb-4 bg-[#FFF8E1] rounded-3xl` | `<KudoCard />` |
| Stats Sidebar | 2940:13489 | `w-[422px] p-6 bg-[#00070C] rounded-[17px] border border-[#998C5F]` | `<StatsSidebar />` |
| Sunner Leaderboard | 2940:13510 | `w-[422px] p-6 bg-[#00070C] rounded-[17px] border border-[#998C5F]` | `<SunnerLeaderboard />` |
| Footer | 2940:13522 | `w-full px-[90px] py-10 border-t border-[#2E3940] flex items-center justify-between` | `<AppFooter />` |
| Filter Button (Hashtag) | 2940:13459 | `border border-[#998C5F] bg-[#FFEA9E]/10 rounded px-4 py-4` | `<FilterDropdown variant="hashtag" />` |
| Filter Button (Dept) | 2940:13460 | `border border-[#998C5F] bg-[#FFEA9E]/10 rounded px-4 py-4` | `<FilterDropdown variant="department" />` |
| Heart Button | I3127:21871;256:5175 | `flex items-center gap-1 cursor-pointer` | `<HeartButton />` |
| Copy Link Button | I3127:21871;256:5216 | `rounded px-4 py-4 font-bold text-[#00101A]` | `<CopyLinkButton />` |
| Carousel Arrow | 2940:13472 | `w-12 h-12 rounded flex items-center justify-center` | `<CarouselArrow />` |
| "Mo Secret Box" Button | 2940:13497 | `w-full bg-[#FFEA9E] rounded-lg py-4 font-bold text-[#00101A]` | `<OpenGiftButton />` |
| Kudo User Info | - | `flex items-center gap-[13px]` | `<KudoUserInfo />` |
| Hero Badge | - | `rounded-full border-[0.5px] border-[#FFEA9E] px-2 py-0.5` | `<HeroBadge />` |
| Search Button (Hero) | 2940:13448 | `rounded-[68px] border border-[#998C5F] bg-[#FFEA9E]/10 px-4 py-6` | `<SearchButton />` |
| Hashtag Tag | - | `text-[#D4271D] font-bold text-base cursor-pointer hover:underline` | `<HashtagTag />` |
| Image Thumbnail | - | `w-[88px] h-[88px] rounded-[18px] border border-[#998C5F] bg-white object-cover` | `<ImageThumbnail />` |
| Spotlight Node | - | `text-white font-bold cursor-pointer hover:text-[#F17676]` | `<SpotlightNode />` |
| Spotlight Search | 2940:14833 | `rounded-full border-[0.682px] border-[#998C5F] bg-transparent px-3 py-4` | `<SpotlightSearch />` |

---

## Notes

- All colors should use CSS variables matching the `--Details-*` naming pattern from Figma
- Primary font is Montserrat (700 weight dominant throughout). Load via Google Fonts
- SVN-Gotham is used only for the "KUDOS" hero display text -- may need local font file
- Montserrat Alternates is used only for the footer copyright
- Almost all text uses font-weight: 700 (bold) -- this is intentional per the Figma design
- No box-shadows found in the design -- all shadow effects are text-shadow only
- The gold accent (#FFEA9E) is the primary brand color for this page
- Dark theme with cream (#FFF8E1) card backgrounds creates strong contrast
- Ensure color contrast meets WCAG AA: #FFEA9E on #00101A = ~11.5:1 (passes), #999 on #00101A = ~5.3:1 (passes)
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
