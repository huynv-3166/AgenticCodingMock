# Design Style: Hệ thống giải thưởng SAA 2025

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | RGBA | Opacity | Usage |
|------------|-----------|------|---------|-------|
| --color-bg-primary | #00101A | rgba(0, 16, 26, 1) | 100% | Page background, main dark theme |
| --color-bg-header | #101417 | rgba(16, 20, 23, 0.8) | 80% | Header navigation bar (semi-transparent) |
| --color-bg-menu-active | #FFEA9E | rgba(255, 234, 158, 0.1) | 10% | Active menu item background |
| --color-bg-menu-active-solid | #FFEA9E | rgba(255, 234, 158, 1) | 100% | Active indicator / accent fill |
| --color-text-primary-gold | #FFEA9E | rgba(255, 234, 158, 1) | 100% | Headings, section titles, labels ("Số lượng", "Giá trị") |
| --color-text-primary-white | #FFFFFF | rgba(255, 255, 255, 1) | 100% | Body text, nav links, prize values, descriptions |
| --color-text-secondary | #DBD1C1 | rgba(219, 209, 193, 1) | 100% | Decorative text (KUDOS logo text) |
| --color-text-muted | #2E3940 | rgba(46, 57, 64, 1) | 100% | Divider text ("Hoặc"), muted labels |
| --color-border-gold | #998C5F | - | 100% | Card/section borders (CSS var: --Details-Border) |
| --color-divider | #2E3940 | rgba(46, 57, 64, 1) | 100% | Section dividers (CSS var: --Details-Divider) |
| --color-accent-red | #D4271D | rgba(212, 39, 29, 1) | 100% | Notification badge |
| --color-overlay-gradient | - | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0) 52.79%) | - | Hero banner bottom gradient overlay |
| --color-black-transparent | #000000 | rgba(0, 0, 0, 0) | 0% | Transparent button background |
| --color-glow-gold | #FAE287 | - | - | Glow effect on award images |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-page-title | Montserrat | 57px | 700 | 64px | -0.25px | Page title "Hệ thống giải thưởng SAA 2025" |
| --text-prize-value | Montserrat | 36px | 700 | 44px | 0px | Prize value numbers "7.000.000 VNĐ" |
| --text-quantity | Montserrat | 36px | 700 | 44px | 0px | Award quantity numbers "10", "02", "03", "01" |
| --text-section-title | Montserrat | 24px | 700 | 32px | 0px | Section titles "Top Talent", "Số lượng giải thưởng:" |
| --text-subtitle | Montserrat | 24px | 700 | 32px | 0px | Subtitle "Sun* Annual Awards 2025" |
| --text-nav-link | Montserrat | 16px | 700 | 24px | 0.15px | Header nav links "About SAA 2025", "Award Information" |
| --text-body | Montserrat | 16px | 700 | 24px | 0.5px | Award descriptions, body text |
| --text-menu-item | Montserrat | 14px | 700 | 20px | 0.25px | Left sidebar menu items "Top Talent", "Top Project" |
| --text-caption | Montserrat | 14px | 700 | 20px | 0.1px | Unit labels "Cá nhân", "Tập thể", notes "cho mỗi giải" |
| --text-nav-small | Montserrat | 14px | 700 | 20px | 0.1px | Small nav "Sun* Kudos" |
| --text-decorative | SVN-Gotham | 96px | 400 | 24px | -13% | Decorative "KUDOS" text |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0px | Footer text "Bản quyền thuộc về Sun* © 2025" |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (left/right) |
| --spacing-page-y-top | 96px | Page top padding (content area) |
| --spacing-page-y-bottom | 96px | Page bottom padding (content area) |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-section-gap | 80px | Gap between major award sections |
| --spacing-card-internal | 48px | Gap between card sub-sections |
| --spacing-menu-gap | 16px | Gap between menu items |
| --spacing-nav-gap | 24px | Gap between header nav links |
| --spacing-logo-nav-gap | 64px | Gap between logo and nav items |
| --spacing-title-gap | 16px | Gap between subtitle and title |
| --spacing-content-gap | 32px | Gap within content sections |
| --spacing-item-padding | 16px | Padding inside menu items and buttons |
| --spacing-footer-y | 40px | Footer vertical padding |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-xs | 4px | Tight gaps (icon-text) |
| --spacing-sm | 8px | Small gaps |
| --spacing-md | 16px | Default gaps |
| --spacing-lg | 24px | Section gaps |
| --spacing-xl | 32px | Large content gaps |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-none | 0px | Default, most elements |
| --radius-sm | 4px | Menu items, buttons, nav links |
| --radius-md | 16px | Award content containers, Kudos banner bg |
| --radius-lg | 24px | Award card inner images |
| --radius-full | 100px | Pills, notification badges |
| --border-divider | 1px solid #2E3940 | Section dividers (--Details-Divider) |
| --border-active | 1px solid #FFEA9E | Active menu item bottom border (--Details-Text-Primary-1) |
| --border-card | 1px solid #998C5F | Profile button border (--Details-Border) |
| --border-award-image | 0.955px solid #FFEA9E | Award card inner image border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-award-image | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award image glow effect (mix-blend-mode: screen) |
| --text-shadow-active | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav link golden glow text-shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop design width |
| height | 6410px | Full page height |
| background | #00101A | Dark navy background |

### Header Navigation

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Full width |
| height | 80px | Fixed header height |
| padding | 12px 144px | Vertical 12px, Horizontal 144px |
| background | rgba(16, 20, 23, 0.8) | Semi-transparent dark |
| display | flex | Horizontal layout |
| align-items | center | Vertically centered |
| justify-content | space-between | Logo/nav left, actions right |
| gap (nav links) | 24px | Between nav items |
| gap (logo-nav) | 64px | Between logo and navigation |
| position | sticky / fixed | Stays at top on scroll |

### Content Area

| Property | Value | Notes |
|----------|-------|-------|
| padding | 96px 144px | Top/bottom 96px, left/right 144px |
| display | flex | Two-column layout |
| gap | 120px | Between sidebar menu and main content |

### Layout Structure (ASCII)

```
┌─────────────────────────────── 1440px ──────────────────────────────┐
│  Header (h: 80px, bg: rgba(16,20,23,0.8), p: 12px 144px)          │
│  ┌──────┐  ┌─────────────────────────────────┐  ┌──────────────┐  │
│  │ Logo │  │ About | Award Info | Sun*Kudos   │  │ Lang | Icons │  │
│  │52x48 │  │ (gap: 24px, font: 16px/700)     │  │              │  │
│  └──────┘  └─────────────────────────────────┘  └──────────────┘  │
│            ← 64px →                                                │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Hero Banner (w: 1440px, h: ~627px, cover image)                   │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  "ROOT FURTHER" (decorative artwork)                        │    │
│  │  Gradient overlay: linear-gradient(0deg, #00101A → transparent)│ │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                    │
│  Title Section (p: 96px 144px, gap: 16px)                          │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  "Sun* Annual Awards 2025" (24px/700, gold #FFEA9E)        │    │
│  │  "Hệ thống giải thưởng SAA 2025" (57px/700, gold #FFEA9E) │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──── Sidebar ────┐  ┌──────── Award Cards ────────────────┐     │
│  │ (sticky, top)    │  │                                     │     │
│  │ ┌──────────────┐ │  │  ┌─────────────────────────────────┐│     │
│  │ │● Top Talent  │ │  │  │ Award Card (gap: 48px)          ││     │
│  │ │  Top Project │ │  │  │ ┌─────┐ ┌─────────────────────┐││     │
│  │ │  Top Project │ │  │  │ │Image│ │Title (24px/700 gold)│││     │
│  │ │  Leader      │ │  │  │ │336x │ │Description (16px)   │││     │
│  │ │  Best Manager│ │  │  │ │336  │ │Số lượng: XX (36px)  │││     │
│  │ │  Signature   │ │  │  │ │     │ │Giá trị: XX VNĐ     │││     │
│  │ │  2025        │ │  │  │ └─────┘ └─────────────────────┘││     │
│  │ │  MVP         │ │  │  └─────────────────────────────────┘│     │
│  │ └──────────────┘ │  │                                     │     │
│  │ gap: 16px        │  │  (repeat for 6 award categories)    │     │
│  │ item-p: 16px     │  │  gap between cards: 80px            │     │
│  └──────────────────┘  └─────────────────────────────────────┘     │
│                                                                    │
│  ┌─ Sun* Kudos Block ──────────────────────────────────────────┐   │
│  │ border-top: 1px solid #2E3940                                │   │
│  │ p: 40px 90px                                                 │   │
│  │ ┌──────────────────────────┐  ┌──────────────────────┐      │   │
│  │ │ "Phong trào ghi nhận"   │  │ KUDOS logo/image     │      │   │
│  │ │ "Sun* Kudos" (title)    │  │                      │      │   │
│  │ │ Description text         │  │                      │      │   │
│  │ │ [Chi tiết →] button      │  │                      │      │   │
│  │ └──────────────────────────┘  └──────────────────────┘      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  Footer (p: 40px 90px, border-top: 1px solid #2E3940)             │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ About SAA | Award Info | Sun*Kudos | Tiêu chuẩn | ©2025   │    │
│  └────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header Navigation Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8440 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.8) | `background-color: rgba(16, 20, 23, 0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| gap | 238px | `gap: 238px` |
| position | sticky | `position: sticky; top: 0; z-index: 50` |
| backdrop-filter | - | `backdrop-filter: blur(10px)` (recommended) |

### Nav Link Item (Active)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8440;186:1587 | - |
| padding | 16px | `padding: 16px` |
| border-bottom | 1px solid #FFEA9E | `border-bottom: 1px solid var(--color-text-primary-gold)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |

### Nav Link Item (Default)

| Property | Value | CSS |
|----------|-------|-----|
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |
| border-bottom | none | `border-bottom: none` |

**States:**
| State | Changes |
|-------|---------|
| Default | No border-bottom, transparent background |
| Active | border-bottom: 1px solid #FFEA9E |
| Hover | background: rgba(255, 234, 158, 0.1) |

---

### Hero Banner (Keyvisual)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8437 | - |
| width | 1440px | `width: 100%` |
| height | ~627px | `height: auto; aspect-ratio: 1440/627` |
| background | cover image | `background: url(...) center/cover no-repeat` |
| overlay | linear-gradient(0deg, #00101A -4.23%, transparent 52.79%) | `&::after { background: linear-gradient(...) }` |
| position | relative | `position: relative` |

---

### Section Title

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8453 | - |
| width | 1152px | `width: 100%; max-width: 1152px` |
| gap | 16px | `gap: 16px` |
| display | flex | `display: flex; flex-direction: column` |

**Subtitle**: "Sun* Annual Awards 2025"
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | rgba(46, 57, 64, 1) | `color: #2E3940` |

**Main Title**: "Hệ thống giải thưởng SAA 2025"
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| color | #FFEA9E | `color: var(--color-text-primary-gold)` |
| text-align | center | `text-align: center` |

---

### Award Category Menu (Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8459 | - |
| width | 178px | `width: 178px` |
| display | flex | `display: flex; flex-direction: column` |
| gap | 16px | `gap: 16px` |
| position | sticky | `position: sticky; top: 100px` |

### Menu Item (Default)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8460-8465 | - |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| color | #FFFFFF | `color: white` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | transparent background, white text |
| Active | background: rgba(255, 234, 158, 0.1), color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25) 0 0 6px #FAE287 |
| Hover | background: rgba(255, 234, 158, 0.1) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Award Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 313:8467 (Top Talent), 313:8468-8471, 313:8510 | - |
| width | 100% (within content area) | `width: 100%` |
| display | flex | `display: flex; flex-direction: row` |
| gap | 48px | `gap: 48px` |
| align-items | flex-start | `align-items: flex-start` |

### Award Card - Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2525 | - |
| width | 336px | `width: 336px` |
| height | 336px | `height: 336px` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | `box-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| mix-blend-mode | screen | `mix-blend-mode: screen` |

### Award Card - Content

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2526 | - |
| flex | 1 | `flex: 1` |
| display | flex | `display: flex; flex-direction: column` |
| gap | 32px | `gap: 32px` |
| border-radius | 16px | `border-radius: 16px` |
| backdrop-filter | blur(32px) | `backdrop-filter: blur(32px)` |

**Award Title** (e.g., "Top Talent"):
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| color | #FFEA9E (gold) |

**Award Description**:
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| color | #FFFFFF (white) |

**Quantity Label** ("Số lượng giải thưởng:"):
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| color | #FFEA9E (gold) |

**Quantity Number** (e.g., "10"):
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 36px |
| font-weight | 700 |
| line-height | 44px |
| color | #FFFFFF (white) |

**Unit Label** (e.g., "Cá nhân", "Tập thể"):
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 14px |
| font-weight | 700 |
| line-height | 20px |
| color | #FFFFFF (white) |

**Prize Value** (e.g., "7.000.000 VNĐ"):
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 36px |
| font-weight | 700 |
| line-height | 44px |
| color | #FFFFFF (white) |

**Prize Note** (e.g., "cho mỗi giải thưởng"):
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 14px |
| font-weight | 700 |
| line-height | 20px |
| color | #FFFFFF (white) |

---

### Sun* Kudos Promotion Block

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 335:12023 | - |
| width | 1152px | `width: 100%; max-width: 1152px` |
| height | 500px | `height: 500px` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |
| display | flex | `display: flex; justify-content: space-between; align-items: center` |
| background | #0F0F0F with image | `background: url(...) lightgray no-repeat, #0F0F0F` |
| border-radius | 16px | `border-radius: 16px` |

**"Phong trào ghi nhận" Label**:
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| color | #FFFFFF (white) |

**"Sun* Kudos" Heading**:
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 57px |
| font-weight | 700 |
| line-height | 64px |
| letter-spacing | -0.25px |
| color | #FFEA9E (gold) |

**"KUDOS" Decorative Text**:
| Property | Value |
|----------|-------|
| font-family | SVN-Gotham |
| font-size | 96px |
| font-weight | 400 |
| line-height | 24px |
| letter-spacing | -13% |
| color | #DBD1C1 |

### Button "Chi tiết" (Gold CTA)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;313:8426 | - |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 1) | `background-color: var(--color-text-primary-gold)` |
| color | rgba(0, 16, 26, 1) | `color: var(--color-bg-primary)` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| display | flex | `display: flex; align-items: center` |
| gap | 8px | `gap: 8px` (text + arrow icon) |
| icon size | 24x24 | Arrow right icon |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | Gold background (#FFEA9E), dark text (#00101A) |
| Hover | Slight lift effect (transform: translateY(-1px)), brightness increase |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |
| display | flex | `display: flex; align-items: center; justify-content: space-between` |
| font-family | Montserrat Alternates | `font-family: 'Montserrat Alternates', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
Screen (bg: #00101A, w: 1440px)
├── Header (h: 80px, bg: rgba(16,20,23,0.8), p: 12px 144px, flex, justify-between, sticky top-0)
│   ├── Left Group (flex, gap: 64px, items-center)
│   │   ├── Logo (w: 52px, h: 48px)
│   │   └── NavLinks (flex, gap: 24px)
│   │       ├── "About SAA 2025" (16px/700, white, p: 16px, radius: 4px)
│   │       ├── "Award Information" (16px/700, white, p: 16px, border-bottom: 1px #FFEA9E) [ACTIVE]
│   │       └── "Sun* Kudos" (14px/700, white, p: 16px)
│   └── Right Group (flex, gap: 24px, items-center)
│       ├── Language "VN" dropdown
│       ├── Bell icon
│       └── User avatar
│
├── HeroBanner (w: 100%, h: ~627px, cover image, position: relative)
│   └── GradientOverlay (linear-gradient: #00101A → transparent)
│
├── TitleSection (p: 96px 144px, flex-col, gap: 16px, items-center)
│   ├── Subtitle "Sun* Annual Awards 2025" (24px/700, #2E3940)
│   └── Title "Hệ thống giải thưởng SAA 2025" (57px/700, #FFEA9E, text-center)
│
├── MainContent (p: 0 144px, flex-row, gap: 120px)
│   ├── SidebarMenu (sticky, top: 100px, flex-col, w: 178px, gap: 16px)
│   │   ├── MenuItem "Top Talent" (14px/700, white, p: 16px, active: bg rgba(255,234,158,0.1))
│   │   ├── MenuItem "Top Project" (same)
│   │   ├── MenuItem "Top Project Leader" (same, multiline)
│   │   ├── MenuItem "Best Manager" (same)
│   │   ├── MenuItem "Signature 2025 Creator" (same, multiline)
│   │   └── MenuItem "MVP" (same)
│   │
│   └── AwardCards (flex-col, gap: 80px)
│       ├── AwardCard "Top Talent" (flex-row, gap: 48px)
│       │   ├── AwardImage (336x336, shadow: glow gold, blend: screen)
│       │   └── CardContent (flex-col, gap: 32px, backdrop-filter: blur(32px))
│       │       ├── Title "Top Talent" (24px/700, #FFEA9E)
│       │       ├── Description (16px/700, white)
│       │       ├── QuantityRow
│       │       │   ├── Label "Số lượng giải thưởng:" (24px/700, #FFEA9E)
│       │       │   ├── Number "10" (36px/700, white)
│       │       │   └── Unit "Đơn vị" (14px/700, white)
│       │       └── PrizeRow
│       │           ├── Label "Giá trị giải thưởng:" (24px/700, #FFEA9E)
│       │           ├── Value "7.000.000 VNĐ" (36px/700, white)
│       │           └── Note "cho mỗi giải thưởng" (14px/700, white)
│       │
│       ├── AwardCard "Top Project" (same structure, qty: 02, unit: Tập thể, prize: 15M)
│       ├── AwardCard "Top Project Leader" (qty: 03, unit: Cá nhân, prize: 7M)
│       ├── AwardCard "Best Manager" (qty: 01, unit: Cá nhân, prize: 10M)
│       ├── AwardCard "Signature 2025" (qty: 01, prize: 5M cá nhân / 8M tập thể)
│       └── AwardCard "MVP" (qty: 01, unit: Cá nhân, prize: 15M)
│
├── KudosBlock (border-top: 1px #2E3940, p: 40px 90px, flex, justify-between)
│   ├── Content (flex-col)
│   │   ├── "Phong trào ghi nhận" (label)
│   │   ├── "Sun* Kudos" (title)
│   │   ├── Description (body text)
│   │   └── Button "Chi tiết →" (16px/700, dark #00101A on gold #FFEA9E, p: 16px, radius: 4px)
│   └── KudosImage/Logo (SVN-Gotham "KUDOS" 96px, #DBD1C1)
│
└── Footer (border-top: 1px #2E3940, p: 40px 90px, flex, justify-between)
    ├── FooterNav (links)
    └── Copyright "Bản quyền thuộc về Sun* © 2025" (Montserrat Alternates, 16px/700)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 16px, hamburger menu |
| HeroBanner | height: auto, maintain aspect ratio |
| Page Title | font-size: 32px, line-height: 40px |
| SidebarMenu | Hidden → horizontal scroll tabs or dropdown above cards |
| AwardCard | flex-direction: column, image: 100% width (max 336px centered) |
| AwardImage | width: 200px, height: 200px, centered |
| Content padding | padding: 24px 16px |
| Prize Value | font-size: 28px |
| KudosBlock | flex-direction: column, gap: 24px |
| Footer | flex-direction: column, text-align: center |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: 12px 32px |
| SidebarMenu | width: 150px, font-size: 12px |
| Content padding | padding: 48px 32px |
| AwardCard | gap: 24px |
| AwardImage | width: 250px, height: 250px |
| MainContent gap | gap: 40px |
| Page Title | font-size: 40px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Container | max-width: 1440px, margin: 0 auto |
| All components | Use design values as specified above |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-menu-active | 8x8 | #FFEA9E | Active indicator dot in sidebar menu |
| icon-bell | 24x24 | #FFFFFF | Notification bell in header |
| icon-user | 24x24 | #FFFFFF | User avatar/profile in header |
| icon-chevron-down | 16x16 | #FFFFFF | Language dropdown indicator |
| icon-arrow-right | 16x16 | #FFFFFF | "Chi tiết" button icon |
| icon-notification-badge | 16x16 | #D4271D | Red notification count badge |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Menu Item | background-color | 200ms | ease-in-out | Hover |
| Menu Item | border-bottom | 200ms | ease-in-out | Active state change |
| Nav Link | background-color | 150ms | ease-in-out | Hover |
| Button "Chi tiết" | transform, background | 200ms | ease-out | Hover |
| Page scroll | scroll-position | 500ms | ease-in-out | Menu item click |
| Award sections | scroll-into-view | 500ms | ease-in-out | Scroll spy |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | 313:8436 | `bg-[#00101A] min-h-screen` | `<AwardSystemPage />` |
| Header | 313:8440 | `sticky top-0 z-50 backdrop-blur bg-[rgba(16,20,23,0.8)]` | `<AppHeader />` (shared) |
| Hero Banner | 313:8437 | `relative w-full aspect-[1440/627] bg-cover bg-center` | `<HeroBanner />` |
| Gradient Overlay | 313:8439 | `absolute inset-0 bg-gradient-to-t from-[#00101A] to-transparent` | (pseudo-element) |
| Title Section | 313:8453 | `flex flex-col items-center gap-4 px-36 py-24` | `<SectionTitle />` |
| Sidebar Menu | 313:8459 | `sticky top-[100px] flex flex-col gap-4 w-[178px]` | `<AwardSidebar />` |
| Menu Item | 313:8460-8465 | `p-4 rounded text-sm font-bold text-white hover:bg-[rgba(255,234,158,0.1)]` | `<SidebarMenuItem />` |
| Award Card | 313:8467 | `flex gap-12` | `<AwardCard />` |
| Award Image | I313:8467;214:2525 | `w-[336px] h-[336px] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<AwardImage />` |
| Card Content | I313:8467;214:2526 | `flex-1 flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]` | (part of AwardCard) |
| Kudos Block | 335:12023 | `border-t border-[#2E3940] px-[90px] py-10 flex justify-between` | `<KudosPromotion />` |
| CTA Button | I335:12023;313:8426 | `p-4 rounded font-bold bg-[#FFEA9E] text-[#00101A] flex items-center gap-2` | `<Button variant="gold" />` |
| Footer | - | `border-t border-[#2E3940] px-[90px] py-10 flex justify-between` | `<AppFooter />` (shared) |

---

## Notes

- All colors should use CSS variables for potential theming support
- Font "Montserrat" should be loaded via Google Fonts (weight: 700)
- Font "Montserrat Alternates" should be loaded via Google Fonts (weight: 700)
- Font "SVN-Gotham" is a custom font - needs to be loaded locally from `/public/fonts/`
- Ensure color contrast meets WCAG AA: gold text (#FFEA9E) on dark (#00101A) = ~12.5:1 ratio (passes)
- White text (#FFFFFF) on dark (#00101A) = ~18.5:1 ratio (passes)
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
- Award images have a gold glow effect using `box-shadow` with `mix-blend-mode: screen`
- The header uses semi-transparent background with backdrop-blur for frosted glass effect
- **Subtitle contrast note**: "Sun* Annual Awards 2025" uses #2E3940 on #00101A background (~2:1 contrast ratio). This is intentionally subtle/decorative — the main gold title below is the primary readable heading. If WCAG compliance is strict, consider using `aria-hidden="true"` or increasing contrast.
