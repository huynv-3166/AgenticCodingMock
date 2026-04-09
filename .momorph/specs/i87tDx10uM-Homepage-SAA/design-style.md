# Design Style: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `i87tDx10uM`
**Extracted At**: 2026-04-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-primary | #FFEA9E | 100% | Primary gold accent: headings, active nav, CTA backgrounds, award titles, links |
| --color-text-primary | #FFFFFF | 100% | Body text, descriptions, nav links (normal), secondary text |
| --color-text-kudos | #DBD1C1 | 100% | Kudos logo text (warm beige) |
| --color-background | #00101A | 100% | Main page background (dark navy) |
| --color-header-bg | #101417 | 80% | Header background (semi-transparent dark) |
| --color-kudos-bg | #0F0F0F | 100% | Kudos section card background |
| --color-border | #998C5F | 100% | Button borders, profile icon border (muted gold) |
| --color-divider | #2E3940 | 100% | Footer top border, section dividers |
| --color-notification | #D4271D | 100% | Notification badge (red dot) |
| --color-btn-secondary-bg | #FFEA9E | 10% | Secondary button background, footer active nav |
| --color-btn-transparent | #000000 | 0% | Transparent button background |
| --color-gold-glow | #FAE287 | 100% | Glow effect in shadows |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Hero Overlay | `linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)` | Dark overlay on hero keyvisual image |
| Countdown Tile | `linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%)` | Glassmorphism digit tile background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-display-lg | Montserrat | 57px | 700 | 64px | -0.25px | Section titles ("He thong giai thuong", "Sun* Kudos") |
| --text-display-kudos | SVN-Gotham | ~96px | 400 | ~24px | -13% | KUDOS logo text |
| --text-countdown-digit | Digital Numbers | ~49px | 400 | - | 0% | Countdown timer digits |
| --text-heading-lg | Montserrat | 24px | 700 | 32px | 0px | Countdown labels (DAYS/HOURS/MINUTES) |
| --text-heading-md | Montserrat | 22px | 700 | 28px | 0px | CTA button text (ABOUT AWARDS, ABOUT KUDOS) |
| --text-heading-sm | Montserrat | 20px | 700 | 32px | - | Quote/emphasis text |
| --text-title-md | Montserrat | 24px | 400 | 32px | 0px | Award card titles |
| --text-body-lg | Montserrat | 16px | 700 | 24px | 0.5px | Body paragraphs, descriptions |
| --text-body-md | Montserrat | 16px | 700 | 24px | 0.15px | Navigation links, footer links |
| --text-body-sm | Montserrat | 16px | 400 | 24px | 0.5px | Award card descriptions |
| --text-label-md | Montserrat | 16px | 500 | 24px | 0.15px | "Chi tiet" detail links |
| --text-nav | Montserrat | 14px | 700 | 20px | 0.1px | Header navigation items |
| --text-copyright | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright text |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-xs | 4px | Tight gaps (icon + text in buttons) |
| --spacing-sm | 8px | Button icon-text gap, small component spacing |
| --spacing-md | 16px | Standard button padding, section sub-heading gap |
| --spacing-lg | 24px | Nav items gap, award card internal gap |
| --spacing-xl | 32px | About card heading-to-content gap |
| --spacing-2xl | 40px | Hero section internal gap, CTA button row gap |
| --spacing-3xl | 48px | Footer nav links gap |
| --spacing-4xl | 64px | Header logo-to-nav gap |
| --spacing-5xl | 80px | Award grid gap, section-level gap |
| --spacing-6xl | 120px | Main sections gap (between hero, about, awards, kudos) |
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-page-y | 96px | Page section vertical padding (desktop) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-sm | 4px | Small buttons, nav buttons, language selector |
| --radius-md | 8px | CTA buttons, countdown digit tiles, about card |
| --radius-lg | 16px | Kudos section card |
| --radius-xl | 24px | Award card images |
| --radius-full | 100px | Pill shape (widget button, notification dot) |
| --border-default | 1px solid #998C5F | Outlined buttons, profile icon |
| --border-active | 1px solid #FFEA9E | Active nav item bottom border |
| --border-divider | 1px solid #2E3940 | Footer top border, section dividers |
| --border-countdown | 0.5px solid #FFEA9E | Countdown digit tile border (thin gold) |
| --border-award-img | ~1px solid #FFEA9E | Award card image border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-award | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award card images, widget button (gold glow) |
| --shadow-nav-active | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav text-shadow (gold glow) |

### Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --blur-countdown | blur(16.64px) | Countdown digit tile backdrop-filter (glassmorphism) |
| --opacity-countdown | 0.5 | Countdown digit tile opacity |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| Page width | 1512px | Full design frame width |
| Content max-width | 1224px | Main content area (padded) |
| Narrower content | 1152px | About/story section inner width |
| padding-x (desktop) | 144px | Horizontal page padding |
| padding-y (sections) | 96px | Vertical section padding |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| Main content direction | column | Vertical stack of sections |
| Main content gap | 120px | Between major sections |
| Award grid | row, 3 cols | gap: 80px between cards |
| Header | row, space-between | Logo left, nav center, actions right |
| Footer | row, space-between | Logo left, nav center, copyright right |

### Layout Structure (ASCII)

```
+---------------------------------------------------------------------+
|  Header (h:80px, bg:rgba(16,20,23,0.80), px:144px)                  |
|  [Logo 52x48] [64px gap] [Nav: About|Awards|Kudos] ... [Bell][VN][U]|
+---------------------------------------------------------------------+
|                                                                       |
|  Hero / Keyvisual (h:1392px, full-bleed background image)            |
|  +---------------------------------------------------------------+   |
|  |  Gradient overlay                                              |   |
|  |  [ROOT FURTHER logo 451x200]                                   |   |
|  |  [40px gap]                                                    |   |
|  |  "Coming soon" (label)                                         |   |
|  |  [Countdown: [DD][HH][MM] - 429x128px, gap:14px]              |   |
|  |  [40px gap]                                                    |   |
|  |  Event info: [Thoi gian: 26/12/2025  (60px gap)  Dia diem: ...] |   |
|  |             [Tuong thuat truc tiep qua song Livestream]         |   |
|  |  [40px gap]                                                    |   |
|  |  [ABOUT AWARDS 276x60] [40px] [ABOUT KUDOS auto x60]          |   |
|  +---------------------------------------------------------------+   |
|                                                                       |
|  [120px gap]                                                          |
|                                                                       |
|  Root Further Content (B4) - px:104px, py:120px                      |
|  +---------------------------------------------------------------+   |
|  |  [ROOT FURTHER small logo] (right-aligned)                     |   |
|  |  [Paragraph text - justified, gold on dark]                    |   |
|  |  [Quote block - centered, italic]                              |   |
|  |  [More paragraph text]                                         |   |
|  +---------------------------------------------------------------+   |
|                                                                       |
|  [120px gap]                                                          |
|                                                                       |
|  Awards Section (px:144px, py:96px)                                  |
|  +---------------------------------------------------------------+   |
|  |  "Sun* annual awards 2025" (caption)                           |   |
|  |  "He thong giai thuong" (h1, 57px, bold)                       |   |
|  |  [80px gap]                                                    |   |
|  |  Award Grid (3 cols, gap:80px)                                 |   |
|  |  [TopTalent 336x504] [TopProject 336x504] [TopProjLead 336x5] |   |
|  |  [80px row gap]                                                |   |
|  |  [BestManager 336x536] [Signature 336x536] [MVP 336x536]      |   |
|  +---------------------------------------------------------------+   |
|                                                                       |
|  [120px gap]                                                          |
|                                                                       |
|  Sun* Kudos Section (1224x500px)                                     |
|  +---------------------------------------------------------------+   |
|  |  bg:#0F0F0F, radius:16px, inner:1120x500                      |   |
|  |  [Content 457x408]              [KUDOS logo/image (right)]     |   |
|  |  "Phong trao ghi nhan" (label)                                 |   |
|  |  "Sun* Kudos" (h1, 57px)                                      |   |
|  |  Description paragraph                                         |   |
|  |  [Chi tiet button 127x56]                                      |   |
|  +---------------------------------------------------------------+   |
|                                                                       |
|  Footer (px:90px, py:40px, border-top:1px solid #2E3940)            |
|  +---------------------------------------------------------------+   |
|  |  [Logo 69x64] [About|Awards|Kudos|TieuChuan gap:48px] [Copy]  |   |
|  +---------------------------------------------------------------+   |
|                                                                       |
|  [Widget FAB: 106x64px, pill, gold bg, fixed bottom-right]          |
+---------------------------------------------------------------------+
```

---

## Component Style Details

### Header (A1_Header)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9091` | - |
| width | 100% (1512px) | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.80) | `background: rgba(16, 20, 23, 0.80)` |
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | sticky | `position: sticky; top: 0; z-index: 50` |

**Logo (A1.1):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;178:1033` | - |
| width | 52px | `width: 52px` |
| height | 48px | `height: 48px` |

**Nav Link - Selected (A1.2):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:1579` | - |
| font | Montserrat 14px 700 | `font: 700 14px/20px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| border-bottom | 1px solid #FFEA9E | `border-bottom: 1px solid var(--color-primary)` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `text-shadow: var(--shadow-nav-active)` |
| padding | 16px | `padding: 16px` |
| height | 52px | `height: 52px` |

**Nav Link - Hover (A1.3):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:1587` | - |
| font | Montserrat 14px 700 | `font: 700 14px/20px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| background | rgba(255, 234, 158, 0.10) | `background: var(--color-btn-secondary-bg)` |
| border-radius | 4px | `border-radius: var(--radius-sm)` |
| padding | 16px | `padding: 16px` |

**Nav Link - Normal (A1.5):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:1593` | - |
| font | Montserrat 14px 700 | `font: 700 14px/20px 'Montserrat'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |
| background | transparent | `background: transparent` |
| padding | 16px | `padding: 16px` |

**Notification Icon (A1.6):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:2101` | - |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| icon-size | 24x24 | - |
| badge | 8x8px red dot | `width: 8px; height: 8px; background: #D4271D; border-radius: 100px` |

**States (Notification Icon):**
| State | Changes |
|-------|---------|
| Default | icon color: #FFFFFF |
| Hover | background: rgba(255, 234, 158, 0.10), border-radius: 4px |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Language Selector (A1.7):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:1696` | - |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| flag-icon | 20x15px | - |
| font | Montserrat 14px 700 | `font: 700 14px/20px 'Montserrat'` |

**States (Language Selector):**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, background: transparent |
| Hover | background: rgba(255, 234, 158, 0.10), border-radius: 4px |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Profile Button (A1.8):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9091;186:1597` | - |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| border-radius | 100px | `border-radius: var(--radius-full)` |

**States (Profile Button):**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Hover | border: 1px solid #FFEA9E, background: rgba(255, 234, 158, 0.10) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Countdown Timer (B1.3_Countdown)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9037` | - |
| width | 429px | `width: 429px` |
| height | 128px | `height: 128px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 14px | `gap: 14px` |

**Countdown Unit (Days/Hours/Minutes):**
| Property | Value | CSS |
|----------|-------|-----|
| width | 116px | `width: 116px` |
| height | 128px | `height: 128px` |
| display | flex | `display: flex; flex-direction: column` |
| label-font | Montserrat 24px 700 | `font: 700 24px/32px 'Montserrat'` |
| label-color | #FFEA9E | `color: var(--color-primary)` |

**Countdown Digit Tile:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 51.2px | `width: 51.2px` |
| height | 81.92px | `height: 81.92px` |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | `background: linear-gradient(...)` |
| border | 0.5px solid #FFEA9E | `border: 0.5px solid var(--color-primary)` |
| border-radius | 8px | `border-radius: var(--radius-md)` |
| backdrop-filter | blur(16.64px) | `backdrop-filter: blur(16.64px)` |
| opacity | 0.5 | `opacity: 0.5` |
| font | Digital Numbers ~49px | `font-family: 'Digital Numbers'; font-size: 49px` |
| color | #00101A (dark, visible on light gradient bg) | `color: var(--color-background)` |

---

### "Coming soon" Label (B1.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9036` | - |
| font | Montserrat 16px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| visibility | Hidden when event has passed | Controlled by JS state |

---

### Event Info (B2_Thong tin su kien)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9053` | - |
| display | flex | `display: flex; flex-direction: column` |
| gap | 8px | `gap: 8px` |

**Row 1: Date & Location (flex row, gap: 60px):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; flex-direction: row; gap: 60px` |
| font | Montserrat 16px 400 | `font: 400 16px/24px 'Montserrat'` |
| label-color | #FFEA9E (for "Thoi gian:", "Dia diem:") | `color: var(--color-primary)` |
| value-color | #FFFFFF (for "26/12/2025", "Au Co Art Center") | `color: var(--color-text-primary)` |

**Row 2: Livestream Note:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px 400 | `font: 400 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |

---

### CTA Buttons (B3)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9062` | - |
| display | flex | `display: flex` |
| gap | 40px | `gap: 40px` |

**CTA Button - Primary/Hover ("ABOUT AWARDS" B3.1):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9063` | - |
| width | 276px | `width: 276px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background: var(--color-primary)` |
| border-radius | 8px | `border-radius: var(--radius-md)` |
| font | Montserrat 22px 700 | `font: 700 22px/28px 'Montserrat'` |
| color | #00101A (dark) | `color: var(--color-background)` |
| gap | 8px (icon + text) | `gap: 8px` |

**CTA Button - Secondary/Normal ("ABOUT KUDOS" B3.2):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9064` | - |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | transparent | `background: transparent` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| border-radius | 8px | `border-radius: var(--radius-md)` |
| font | Montserrat 22px 700 | `font: 700 22px/28px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| gap | 8px | `gap: 8px` |

**States (both CTA buttons share same states):**
| State | Changes |
|-------|---------|
| Normal | border: 1px solid #998C5F, background: transparent, color: #FFEA9E |
| Hover | background: #FFEA9E, color: #00101A, border: none |
| Active | background: #F5DC82, color: #00101A |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Root Further Content (B4_content)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5001:14827` | - |
| width | 1152px | `max-width: 1152px` |
| padding | 120px 104px | `padding: 120px 104px` |
| border-radius | 8px | `border-radius: var(--radius-md)` |
| background | transparent (inherits page bg) | - |

**ROOT FURTHER Small Logo (top-right of section):**
| Property | Value | CSS |
|----------|-------|-----|
| position | top-right of B4 | `float: right` or `position: absolute; top: 0; right: 0` |
| opacity | 0.3 | `opacity: 0.3` (decorative, semi-transparent) |

**Body Paragraphs:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| text-align | justify | `text-align: justify` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |

**Quote Block ("A tree with deep roots fears no storm"):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 20px 700 | `font: 700 20px/32px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| text-align | center | `text-align: center` |
| margin | 32px 0 | `margin: 32px 0` |

**Quote Attribution:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px 400 | `font: 400 16px/24px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| text-align | center | `text-align: center` |

---

### Award Section Header (C1_Header Giai thuong)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9069` | - |
| display | flex | `display: flex; flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Caption ("Sun* annual awards 2025"):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |

**Title ("He thong giai thuong"):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 57px 700 | `font: 700 57px/64px 'Montserrat'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |

**Sub-description ("Cac hang muc se duoc trao giai..."):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px 400 | `font: 400 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |

---

### Award Card (C2.1 - C2.6)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9075` (example: Top Talent) | - |
| width | 336px | `width: 336px` |
| height | 504-536px | `height: auto` |
| display | flex | `display: flex; flex-direction: column` |
| gap | 24px | `gap: 24px` |
| cursor | pointer | `cursor: pointer` |

**Award Card Image:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9075;214:1019` | - |
| width | 336px | `width: 336px` |
| height | 336px | `height: 336px` |
| border-radius | 24px | `border-radius: var(--radius-xl)` |
| border | ~1px solid #FFEA9E | `border: 1px solid var(--color-primary)` |
| box-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `box-shadow: var(--shadow-award)` |
| mix-blend-mode | screen | `mix-blend-mode: screen` |

**Award Card Title:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px 400 | `font: 400 24px/32px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |

**Award Card Description:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px 400 | `font: 400 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |
| max-lines | 2 | `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden` |

**Award Card "Chi tiet" Link:**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I2167:9075;214:1023` | - |
| width | 88px | `width: 88px` |
| height | 56px | `height: 56px` |
| padding | 16px 0px | `padding: 16px 0` |
| font | Montserrat 16px 500 | `font: 500 16px/24px 'Montserrat'` |
| color | #FFEA9E | `color: var(--color-primary)` |
| icon | arrow-right 24x24 | - |
| gap | 4px | `gap: 4px` |

**States (Chi tiet Link):**
| State | Changes |
|-------|---------|
| Default | color: #FFEA9E |
| Hover | text-decoration: underline, icon translateX(2px) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**States (Award Card):**
| State | Changes |
|-------|---------|
| Default | As specified above |
| Hover | Card lifts slightly (translateY(-4px)), image glow intensifies |
| Active | Slight scale down |

---

### Sun* Kudos Section (D1_Sunkudos)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `3390:10349` | - |
| width | 1224px | `width: 100%; max-width: 1224px` |
| height | 500px | `height: 500px` |

**Inner Card:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 1120px | `max-width: 1120px` |
| height | 500px | `height: 500px` |
| background | #0F0F0F | `background: #0F0F0F` |
| border-radius | 16px | `border-radius: var(--radius-lg)` |
| display | flex | `display: flex` |
| layout | content left + image right | - |

**Kudos Content Area (D2):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I3390:10349;313:8419` | - |
| width | 457px | `width: 457px` |
| height | 408px | `height: 408px` |
| label | "Phong trao ghi nhan" | `font: 700 16px/24px 'Montserrat'; color: #FFEA9E` |
| title | "Sun* Kudos" | `font: 700 57px/64px 'Montserrat'; color: #FFFFFF` |
| description | paragraph text | `font: 400 16px/24px 'Montserrat'; color: #FFFFFF` |

**Kudos "Chi tiet" Button (D2.1):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I3390:10349;313:8426` | - |
| width | 127px | `width: 127px` |
| height | 56px | `height: 56px` |
| background | #FFEA9E | `background: var(--color-primary)` |
| border-radius | 4px | `border-radius: var(--radius-sm)` |
| font | Montserrat 16px 500 | `font: 500 16px/24px 'Montserrat'` |
| color | #00101A | `color: var(--color-background)` |
| gap | 8px | `gap: 8px` |

**States (Kudos Button):**
| State | Changes |
|-------|---------|
| Default | As specified above |
| Hover | background: #F5DC82, scale(1.02) |
| Active | background: #E8CF6E, scale(0.98) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Widget Floating Button (6_Widget Button)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5022:15169` | - |
| width | 106px | `width: 106px` |
| height | 64px | `height: 64px` |
| background | #FFEA9E | `background: var(--color-primary)` |
| border-radius | 100px | `border-radius: var(--radius-full)` |
| box-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `box-shadow: var(--shadow-award)` |
| position | fixed | `position: fixed; bottom: 24px; right: 24px` |
| cursor | pointer | `cursor: pointer` |
| z-index | 50 | `z-index: 50` |

**States (Widget FAB):**
| State | Changes |
|-------|---------|
| Default | As specified above |
| Hover | scale(1.05), box-shadow intensifies (spread +2px) |
| Active | scale(0.95) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Footer (7_Footer)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5001:14800` | - |
| width | 100% (1512px) | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |
| display | flex | `display: flex; justify-content: space-between; align-items: center` |

**Footer Logo (7.1):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I5001:14800;342:1408` | - |
| width | 69px | `width: 69px` |
| height | 64px | `height: 64px` |

**Footer Nav Links (7.2-7.5):**
| Property | Value | CSS |
|----------|-------|-----|
| gap | 48px | `gap: 48px` |
| font | Montserrat 16px 700 | `font: 700 16px/24px 'Montserrat'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |
| height | 56px per link | `height: 56px` |
| padding | 16px | `padding: 16px` |

**States (Footer Nav Links):**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, background: transparent |
| Hover | color: #FFEA9E, background: rgba(255, 234, 158, 0.10), border-radius: 4px |
| Active/Selected | color: #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Footer Copyright:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat Alternates 16px 700 | `font: 700 16px/24px 'Montserrat Alternates'` |
| color | #FFFFFF | `color: var(--color-text-primary)` |
| text-align | center | `text-align: center` |

---

## Component Hierarchy with Styles

```
Homepage SAA (bg: --color-background #00101A, w: 100%)
├── Header A1 (h: 80px, bg: rgba(16,20,23,0.80), px: 144px, flex, space-between, center, sticky top)
│   ├── Logo A1.1 (w: 52px, h: 48px)
│   ├── Nav (flex, gap: 24px)
│   │   ├── NavLink-Selected A1.2 (text: --text-nav, color: --color-primary, border-bottom: 1px --color-primary, text-shadow: --shadow-nav-active)
│   │   ├── NavLink-Hover A1.3 (text: --text-nav, color: --color-primary, bg: --color-btn-secondary-bg, radius: 4px)
│   │   └── NavLink-Normal A1.5 (text: --text-nav, color: --color-text-primary, bg: transparent)
│   └── Actions (flex, gap: 24px)
│       ├── Notification A1.6 (w: 40px, h: 40px, badge: 8px red dot)
│       ├── Language A1.7 (w: 108px, h: 56px, flag: 20x15)
│       └── Profile A1.8 (w: 40px, h: 40px, border: 1px --color-border, radius: full)
│
├── Hero Section 3.5 (h: 1392px, full-bleed bg image + gradient overlay)
│   ├── ROOT FURTHER Logo (w: 451px, h: 200px)
│   ├── Countdown B1 (flex, col, gap: 16px)
│   │   ├── "Coming soon" B1.2 (text: 16px 700 Montserrat, color: --color-primary, hidden when event passed)
│   │   └── Timer B1.3 (flex, row, gap: 14px)
│   │       ├── Days B1.3.1 (w: 116px, h: 128px, digits: Digital Numbers 49px)
│   │       ├── Hours B1.3.2 (same)
│   │       └── Minutes B1.3.3 (same)
│   ├── Event Info B2 (flex col, gap: 8px)
│   │   ├── Row 1 (flex row, gap: 60px): "Thoi gian: 26/12/2025" + "Dia diem: Au Co Art Center"
│   │   └── Row 2: "Tuong thuat truc tiep qua song Livestream"
│   └── CTA Buttons B3 (flex, row, gap: 40px)
│       ├── "ABOUT AWARDS" B3.1 (w: 276px, h: 60px, bg: --color-primary, radius: 8px)
│       └── "ABOUT KUDOS" B3.2 (h: 60px, border: 1px --color-border, radius: 8px)
│
├── Root Further Content B4 (w: 1152px, px: 104px, py: 120px, radius: 8px)
│   ├── ROOT FURTHER Small Logo (top-right, decorative)
│   ├── Paragraphs (text: 16px 700 Montserrat, color: --color-primary, justified)
│   ├── Quote Block ("A tree with deep roots...") (text: 20px 700, center)
│   └── Quote Attribution (text: 16px 400, center)
│
├── Awards Section (px: 144px, py: 96px)
│   ├── Header C1 (flex col, gap: 16px)
│   │   ├── Caption "Sun* annual awards 2025" (16px 700, --color-primary)
│   │   ├── Title "He thong giai thuong" (57px 700, --color-text-primary, ls: -0.25px)
│   │   └── Sub-description (16px 400, --color-text-primary)
│   └── Award Grid C2 (grid 3 cols, gap: 80px)
│       ├── TopTalent C2.1 (w: 336px, flex col, gap: 24px)
│       │   ├── Image (336x336, radius: 24px, border: 1px --color-primary, shadow: --shadow-award)
│       │   ├── Title (text: --text-title-md, color: --color-primary)
│       │   ├── Description (text: --text-body-sm, color: white, 2-line clamp)
│       │   └── "Chi tiet" link (text: --text-label-md, color: --color-primary, icon: arrow)
│       ├── TopProject C2.2 (same structure)
│       ├── TopProjectLeader C2.3 (same)
│       ├── BestManager C2.4 (same)
│       ├── Signature2025 C2.5 (same)
│       └── MVP C2.6 (same)
│
├── Sun* Kudos D1 (w: 1224px, h: 500px)
│   └── Inner Card (w: 1120px, bg: #0F0F0F, radius: 16px, flex row)
│       ├── Content D2 (w: 457px)
│       │   ├── Label (text: --text-body-lg, color: --color-primary)
│       │   ├── Title "Sun* Kudos" (text: --text-display-lg, color: white)
│       │   ├── Description (text: --text-body-sm, color: white)
│       │   └── "Chi tiet" D2.1 (w: 127px, h: 56px, bg: --color-primary, radius: 4px)
│       └── KUDOS Image (right side)
│
├── Footer 7 (w: 100%, px: 90px, py: 40px, border-top: 1px --color-divider, flex space-between)
│   ├── Logo 7.1 (w: 69px, h: 64px)
│   ├── Nav (flex, gap: 48px)
│   │   ├── "About SAA 2025" 7.2
│   │   ├── "Awards Information" 7.3
│   │   ├── "Sun* Kudos" 7.4
│   │   └── "Tieu chuan chung" 7.5
│   └── Copyright (text: --text-copyright, Montserrat Alternates)
│
└── Widget FAB 6 (fixed, bottom: 24px, right: 24px, w: 106px, h: 64px, bg: --color-primary, radius: full, shadow: --shadow-award, z: 50)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | Infinite |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header | Collapse nav to hamburger menu, reduce padding to 16px |
| Hero | Reduce title size, stack countdown units, reduce CTA button width to 100% |
| Content (B4) | padding: 24px 16px |
| Award Grid | 2 columns, gap: 16px, card width: 100% |
| Award Card Image | Width: 100%, maintain 1:1 aspect ratio |
| Kudos Section | Stack vertically (content above, image below), full width |
| Footer | Stack vertically (logo, nav, copyright), center aligned |
| Widget FAB | Same size, bottom: 16px, right: 16px |
| Page padding | 16px horizontal |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | Keep full nav links visible, reduce padding to 24px, reduce logo-nav gap to 32px |
| Hero | ROOT FURTHER logo scales to 300px width, CTA buttons stack vertically (full width) |
| Content (B4) | padding: 48px 24px |
| Award Grid | 2 columns, gap: 24px, card width: calc(50% - 12px) |
| Kudos Section | Stack vertically (content above, image below), reduce height to auto |
| Footer | Reduce gap between nav links to 24px, padding: 32px 24px |
| Page padding | 24px horizontal |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All components | As designed (1512px frame width, 1224px content) |
| Award Grid | 3 columns, gap: 80px |
| Container | max-width: 1224px, margin: 0 auto |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-bell | 24x24 | #FFFFFF | Notification button in header |
| icon-chevron-down | 24x24 | #FFFFFF | Language selector dropdown arrow |
| icon-user | 24x24 | #FFFFFF | Profile button in header |
| icon-arrow-right | 24x24 | #FFEA9E / #00101A | "Chi tiet" link icon, CTA button icon |
| icon-pencil | 24x24 | #00101A | Widget FAB left icon |
| icon-saa | 24x24 | #00101A | Widget FAB right icon |
| icon-flag-vn | 20x15 | - | Vietnamese flag in language selector |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| CTA Button | background-color, color, border | 150ms | ease-in-out | Hover |
| Nav Link | background-color, color | 150ms | ease-in-out | Hover |
| Award Card | transform (translateY) | 200ms | ease-out | Hover |
| Award Card Image | box-shadow (glow intensity) | 200ms | ease-out | Hover |
| Widget FAB | transform (scale) | 150ms | ease-in-out | Hover/Active |
| Footer Link | color | 150ms | ease-in-out | Hover |
| Countdown Digits | opacity | 300ms | ease-in-out | Value change |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Header | 2167:9091 | `sticky top-0 w-full h-20 bg-[rgba(16,20,23,0.80)] px-36 flex justify-between items-center z-50` | `<Header />` |
| Nav Link Selected | I2167:9091;186:1579 | `text-[14px] font-bold text-[#FFEA9E] border-b border-[#FFEA9E] px-4 py-4` | `<NavLink active />` |
| Nav Link Normal | I2167:9091;186:1593 | `text-[14px] font-bold text-white px-4 py-4 hover:bg-[rgba(255,234,158,0.10)] hover:rounded` | `<NavLink />` |
| Countdown Timer | 2167:9037 | `flex gap-3.5` | `<CountdownTimer />` |
| Countdown Digit Tile | - | `w-[51px] h-[82px] rounded-lg border-[0.5px] border-[#FFEA9E] backdrop-blur-[17px] opacity-50` | `<DigitTile />` |
| CTA Primary | 2167:9063 | `w-[276px] h-[60px] bg-[#FFEA9E] rounded-lg text-[22px] font-bold text-[#00101A] px-6 py-4` | `<Button variant="primary" />` |
| CTA Secondary | 2167:9064 | `h-[60px] border border-[#998C5F] rounded-lg text-[22px] font-bold text-[#FFEA9E] px-6 py-4 hover:bg-[#FFEA9E] hover:text-[#00101A]` | `<Button variant="outline" />` |
| Award Card | 2167:9075 | `w-[336px] flex flex-col gap-6 cursor-pointer hover:-translate-y-1 transition-transform` | `<AwardCard />` |
| Award Image | I2167:9075;214:1019 | `w-[336px] h-[336px] rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<AwardCard.Image />` |
| Award Title | I2167:9075;214:1021 | `text-2xl text-[#FFEA9E]` | `<AwardCard.Title />` |
| Award Description | I2167:9075;214:1022 | `text-base text-white line-clamp-2` | `<AwardCard.Description />` |
| Chi tiet Link | I2167:9075;214:1023 | `text-base font-medium text-[#FFEA9E] flex items-center gap-1` | `<AwardCard.Link />` |
| Kudos Section | 3390:10349 | `max-w-[1224px] h-[500px]` | `<KudosPromo />` |
| Kudos Inner Card | - | `max-w-[1120px] h-[500px] bg-[#0F0F0F] rounded-2xl flex` | `<KudosPromo.Card />` |
| Kudos Button | I3390:10349;313:8426 | `w-[127px] h-[56px] bg-[#FFEA9E] rounded text-base font-medium text-[#00101A]` | `<Button variant="primary" size="sm" />` |
| Widget FAB | 5022:15169 | `fixed bottom-6 right-6 w-[106px] h-16 bg-[#FFEA9E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] z-50` | `<FloatingActionButton />` |
| Event Info | 2167:9053 | `flex flex-col gap-2 text-base text-white` | `<EventInfo />` |
| Root Further Content | 5001:14827 | `max-w-[1152px] px-[104px] py-[120px] rounded-lg` | `<RootFurtherContent />` |
| Award Section Header | 2167:9069 | `flex flex-col gap-4` | `<AwardSectionHeader />` |
| Footer | 5001:14800 | `w-full px-[90px] py-10 border-t border-[#2E3940] flex justify-between items-center` | `<Footer />` |

---

## Notes

- All colors should use CSS variables for theming support and consistency.
- Prefer Tailwind utility classes as the project uses TailwindCSS 4.x.
- Font "Montserrat" should be loaded via Google Fonts. "Digital Numbers" and "SVN-Gotham" may need local font files.
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- Ensure color contrast meets WCAG AA (4.5:1 for normal text) -- gold (#FFEA9E) on dark (#00101A) provides sufficient contrast.
- The glassmorphism effect on countdown tiles requires `backdrop-filter` support (modern browsers).
- Award card images use `mix-blend-mode: screen` for the golden glow effect overlay.
