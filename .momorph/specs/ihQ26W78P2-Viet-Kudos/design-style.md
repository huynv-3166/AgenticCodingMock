# Design Style: Write Kudos (Viet Kudo)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viet Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-15

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-modal-bg | #FFF8E1 | 100% | Modal dialog background (warm cream) |
| --color-overlay | #00101A | 80% | Full-screen mask behind modal |
| --color-primary-cta | #FFEA9E | 100% | Submit button background, active tab underline |
| --color-secondary-btn | rgba(255, 234, 158, 0.10) | 10% | Cancel button background |
| --color-text-dark | #00101A | 100% | Modal title, field labels, hint text, button text |
| --color-text-white | #FFFFFF | 100% | Header nav text, white labels |
| --color-placeholder | #999999 | 100% | Placeholder text, anonymous checkbox label |
| --color-border | #998C5F | 100% | Input borders, toolbar borders, button borders |
| --color-required | #CF1322 | 100% | Required asterisk (*) |
| --color-delete | #D4271D | 100% | Image close/delete button, notification dot |
| --color-error-border | #CF1322 | 100% | Form field error border (same as required asterisk) |
| --color-community-std | #E46060 | 100% | "Tieu chuan cong dong" link text |
| --color-page-bg | #00101A | 100% | Page background (behind modal) |
| --color-header-bg | #101417 | 80% | Header background (semi-transparent) |
| --color-active-tab | #FFEA9E | 100% | Active nav tab text + border-bottom |
| --color-active-glow | #FAE287 | 100% | Active tab text glow shadow |
| --color-divider | #2E3940 | 100% | Section divider line |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-modal-title | Montserrat | 32px | 700 | 40px | 0px |
| --text-field-label | Montserrat | 22px | 700 | 28px | 0px |
| --text-submit-btn | Montserrat | 22px | 700 | 28px | 0px |
| --text-input | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-placeholder | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-hint | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-cancel-btn | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-small-label | Montserrat | 11px | 700 | 16px | 0.5px |
| --text-required | Noto Sans JP | 16px | 700 | 20px | 0px |
| --text-nav-active | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-nav-inactive | Montserrat | 14px | 700 | 20px | 0.1px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding | 40px | Modal internal padding (all sides) |
| --spacing-section-gap | 32px | Gap between modal sections |
| --spacing-content-gap | 24px | Gap within content area (between editor, hashtags, images) |
| --spacing-field-gap | 16px | Gap between label and input in a field row |
| --spacing-tag-gap | 8px | Gap between hashtag chips |
| --spacing-input-padding-x | 24px | Horizontal padding inside inputs |
| --spacing-input-padding-y | 16px | Vertical padding inside inputs |
| --spacing-toolbar-padding | 10px 16px | Toolbar button padding |
| --spacing-cancel-padding | 16px 40px | Cancel button padding |
| --spacing-submit-padding | 16px | Submit button padding (all sides) |
| --spacing-action-gap | 24px | Gap between Cancel and Submit buttons |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 24px | Modal dialog corners |
| --radius-input | 8px | Input fields, submit button |
| --radius-toolbar-tl | 8px 0 0 0 | First toolbar button (top-left) |
| --radius-toolbar-tr | 0 8px 0 0 | Last toolbar button (top-right) |
| --radius-textarea | 0 0 8px 8px | Textarea (bottom corners only) |
| --radius-btn | 4px | Standard buttons (cancel, nav) |
| --radius-checkbox | 4px | Checkbox |
| --radius-thumbnail | 18px | Image thumbnails |
| --radius-close-btn | 71.43px | Circular close/delete button |
| --border-input | 1px solid #998C5F | Input field borders |
| --border-focus | 2px solid #998C5F | Focus state (predicted) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-modal | 0 20px 60px rgba(0,0,0,0.5) | Modal dialog elevation (predicted) |
| --shadow-active-tab | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav tab text glow |

---

## Layout Specifications

### Modal Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 752px | Fixed width |
| max-height | min(1012px, 90vh) | Constrained to viewport height |
| overflow-y | auto | Scrollable when content exceeds max-height |
| padding | 40px | All sides |
| gap | 32px | Between major sections |
| border-radius | 24px | All corners |
| background | #FFF8E1 | Warm cream |
| display | flex | Column layout |
| flex-direction | column | Vertical stack |
| align-items | flex-start | Left aligned |
| position | centered | Horizontally centered on screen overlay |

### Layout Structure (ASCII)

```
┌──────────────────────── Overlay (#00101A @ 80%) ────────────────────────┐
│                                                                         │
│  ┌─────────────── Modal (752px, padding: 40px, gap: 32px) ───────────┐  │
│  │  bg: #FFF8E1, border-radius: 24px                                │  │
│  │                                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │  A. Title (672px x 80px, text-center)                        │  │  │
│  │  │  "Gui loi cam on va ghi nhan den dong doi"                   │  │  │
│  │  │  Montserrat 32px/40px bold, #00101A                          │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                           gap: 32px                                │  │
│  │  ┌──────────┐ gap:16px ┌───────────────────────────────────────┐  │  │
│  │  │ B. Label │          │ B.2 Search Input (flex:1, h:56px)     │  │  │
│  │  │ "Nguoi   │          │ placeholder: "Tim kiem"               │  │  │
│  │  │  nhan" * │          │ border: 1px #998C5F, radius: 8px      │  │  │
│  │  │ (146x28) │          │ padding: 16px 24px, bg: #FFF          │  │  │
│  │  └──────────┘          └───────────────────────────────────────┘  │  │
│  │                           gap: 32px                                │  │
│  │  ┌──────────┐ gap:16px ┌───────────────────────────────────────┐  │  │
│  │  │ C. Label │          │ C.2 Badge Input (514px, h:56px)       │  │  │
│  │  │ "Danh    │          │ placeholder: "Danh tang mot danh..."  │  │  │
│  │  │  hieu" * │          │ border: 1px #998C5F, radius: 8px      │  │  │
│  │  │ (139x28) │          └───────────────────────────────────────┘  │  │
│  │  │          │          ┌───────────────────────────────────────┐  │  │
│  │  │          │          │ C.3 Helper text (418px x 48px)        │  │  │
│  │  │          │          │ Montserrat 16px #999, 2 lines         │  │  │
│  │  │          │          └───────────────────────────────────────┘  │  │
│  │  └──────────┘                                                      │  │
│  │                           gap: 32px                                │  │
│  │  ┌────────────────────────────────────────────────────────────┐    │  │
│  │  │ D. Content Section (672px x 444px, gap: 24px)              │    │  │
│  │  │                                                            │    │  │
│  │  │  ┌─── Toolbar (h:40px, flex-row) ──────────────────────┐  │    │  │
│  │  │  │ [B] [I] [S] [1.] [link] [99] │ Tieu chuan cong dong│  │    │  │
│  │  │  │ radius: 8px 0 0 0     radius: 0 8px 0 0 (#E46060)  │  │    │  │
│  │  │  └─────────────────────────────────────────────────────┘  │    │  │
│  │  │  ┌─── Textarea (h:200px, min-h:120px) ────────────────┐  │    │  │
│  │  │  │ placeholder: "Hay gui gam loi cam on..."            │  │    │  │
│  │  │  │ border: 1px #998C5F, radius: 0 0 8px 8px            │  │    │  │
│  │  │  │ padding-left: 24px, bg: #FFF                         │  │    │  │
│  │  │  └─────────────────────────────────────────────────────┘  │    │  │
│  │  │  Hint: 'Ban co the "@ + ten" de nhac...' (16px #00101A)  │    │  │
│  │  │                         gap: 24px                          │    │  │
│  │  │  ┌──────┐ gap:16px ┌──────────────────────────────────┐  │    │  │
│  │  │  │Hashtag│         │ [+ Hashtag] Toi da 5 (chips...)  │  │    │  │
│  │  │  │  *    │         │ gap: 8px                          │  │    │  │
│  │  │  └──────┘          └──────────────────────────────────┘  │    │  │
│  │  │                         gap: 24px                          │    │  │
│  │  │  ┌──────┐ gap:16px ┌──┐┌──┐┌──┐┌──┐┌──┐ ┌──────────┐  │    │  │
│  │  │  │Image │         │80││80││80││80││80│ │+ Image   │  │    │  │
│  │  │  │      │         │px││px││px││px││px│ │Toi da 5  │  │    │  │
│  │  │  └──────┘         └──┘└──┘└──┘└──┘└──┘ └──────────┘  │    │  │
│  │  └────────────────────────────────────────────────────────┘    │  │
│  │                           gap: 32px                                │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │ G. [checkbox] Gui loi cam on va ghi nhan an danh             │  │  │
│  │  │ checkbox: 24x24px, border: 1px #999, radius: 4px            │  │  │
│  │  │ label: Montserrat 22px #999                                  │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                           gap: 32px                                │  │
│  │  ┌────────────────────────────────────────────────────────────┐    │  │
│  │  │ H. Action Buttons (672px x 60px, gap: 24px)                │    │  │
│  │  │  ┌────────────┐  ┌─────────────────────────────────────┐   │    │  │
│  │  │  │ Huy  X     │  │           Gui  >                    │   │    │  │
│  │  │  │ border:1px │  │ bg: #FFEA9E, radius: 8px            │   │    │  │
│  │  │  │ #998C5F    │  │ 502px x 60px                        │   │    │  │
│  │  │  │ radius: 4px│  │ Montserrat 22px bold #00101A        │   │    │  │
│  │  │  └────────────┘  └─────────────────────────────────────┘   │    │  │
│  │  └────────────────────────────────────────────────────────────┘    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A. Modal Title

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9870` | - |
| width | 672px | `width: 100%` (fills modal content) |
| height | 80px | `height: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |

---

### B. Recipient Field ("Nguoi nhan")

#### B.1 Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9872` | - |
| width | 146px | `width: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |
| required asterisk color | #CF1322 | `color: #CF1322` (Noto Sans JP, 16px, 700) |

#### B.2 Search Input

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9873` | - |
| width | flex: 1 0 0 | `flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background-color: #FFF` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| placeholder color | #999999 | `color: #999` |
| dropdown icon | 24px x 24px | SVG icon right-aligned |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F, bg: #FFF |
| Focus | border-color: #998C5F (predicted: 2px) |
| Error | border-color: #CF1322 (red border when empty on submit) |
| Filled | Shows selected user name, placeholder hidden |

---

### C. Badge Field ("Danh hieu")

#### C.1 Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;1688:10436` | - |
| width | 139px | `width: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |
| required asterisk color | #CF1322 | `color: #CF1322` |

#### C.2 Badge Input

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;1688:10437` | - |
| width | 514px | `flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background-color: #FFF` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| placeholder color | #999999 | `color: #999` |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F, bg: #FFF |
| Focus | border-color: #998C5F (predicted: 2px width) |
| Error | border-color: #CF1322 (red border when empty on submit) |
| Filled | Shows typed badge title text in #00101A, placeholder hidden |

#### C.3 Helper Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;1688:10447` | - |
| width | 418px | `width: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #999999 | `color: #999` |

---

### D. Rich Text Editor

#### Toolbar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9877` | - |
| height | 40px | `height: 40px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |

**Toolbar Button (shared):**
| Property | Value | CSS |
|----------|-------|-----|
| height | 40px | `height: 40px` |
| padding | 10px 16px | `padding: 10px 16px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | transparent | `background: transparent` |
| icon-size | 24px x 24px | `width: 24px; height: 24px` |

**Toolbar Buttons:**
| Button | Node ID | Border Radius |
|--------|---------|---------------|
| Bold (B) | `I520:11647;520:9881` | 8px 0 0 0 |
| Italic (I) | `I520:11647;662:11119` | 0 |
| Strikethrough (S) | `I520:11647;662:11213` | 0 |
| Numbered List | `I520:11647;662:10376` | 0 |
| Link | `I520:11647;662:10507` | 0 |
| Quote | `I520:11647;662:10647` | 0 |
| Community Standards | `I520:11647;3053:11619` | 0 8px 0 0 |

**Toolbar Button States:**
| State | Changes |
|-------|---------|
| Default | bg: transparent, border: 1px solid #998C5F |
| Hover | bg: rgba(153, 140, 95, 0.1) (predicted: subtle gold tint) |
| Active/Toggled | bg: rgba(153, 140, 95, 0.2), border-color: #998C5F (format is applied) |
| Focus | outline: 2px solid #998C5F, outline-offset: -2px |

**Community Standards Button (special):**
| Property | Value | CSS |
|----------|-------|-----|
| width | 336px | `flex: 1` (fills remaining space) |
| text-align | right | `text-align: right` |
| color | #E46060 | `color: #E46060` |
| font-size | 16px | `font-size: 16px` |

#### Textarea

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9886` | - |
| width | 100% (stretch) | `width: 100%` |
| height | 200px | `height: 200px` |
| min-height | 120px | `min-height: 120px` |
| padding | 16px 24px | `padding: 16px 24px` (Figma shows padding-left: 24px; top/right/bottom inferred as 16px for comfortable text editing) |
| background | #FFFFFF | `background-color: #FFF` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 0 0 8px 8px | `border-radius: 0 0 8px 8px` |
| placeholder color | #999999 | `color: #999` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F, bg: #FFF, placeholder visible |
| Focus | border-color: #998C5F (predicted: 2px width), cursor active |
| Error | border-color: #CF1322 (red border when empty on submit) |
| Filled | User text in #00101A, placeholder hidden, rich formatting visible |

#### Hint Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9887` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #00101A | `color: #00101A` |

---

### E. Hashtag Section

#### E.1 Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9891` | - |
| width | 108px | `width: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| required asterisk | #CF1322 | Noto Sans JP, 16px, 700 |

#### E.2 Add Hashtag Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;662:8595` (group) | - |
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | #FFFFFF | `background-color: #FFF` |
| border-radius | 8px | `border-radius: 8px` |
| icon | 24px (plus) | SVG plus icon |
| text | "Hashtag / Toi da 5" | `font-size: 11px; color: #999` |
| gap | 8px | Between chips |

#### E.3 Hashtag Chip (predicted from design pattern)

| Property | Value | CSS |
|----------|-------|-----|
| height | 32px | `height: 32px` |
| padding | 4px 12px | `padding: 4px 12px` |
| background | rgba(153, 140, 95, 0.15) | `background-color: rgba(153, 140, 95, 0.15)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 16px | `border-radius: 16px` (pill shape) |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| close icon | 16px x 16px | Inline "x" to remove, color: #999 |
| gap | 4px | Between text and close icon |

> **Note**: Chip styling is predicted based on the SAA 2025 design system (gold/dark theme). Verify against Figma if a separate chip component frame exists.

---

### F. Image Upload Section

#### F.1 Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9897` | - |
| width | 74px | `width: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |

#### F.2-F.4 Image Thumbnails

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | `I520:11647;662:9197`, `662:9393`, `662:9439` | - |
| width | 80px | `width: 80px` |
| height | 80px | `height: 80px` |
| aspect-ratio | 1/1 | `aspect-ratio: 1/1` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | #FFFFFF | `background-color: #FFF` |
| border-radius | 18px | `border-radius: 18px` |
| object-fit | cover | `object-fit: cover` |

**Close Button (on each thumbnail):**
| Property | Value | CSS |
|----------|-------|-----|
| size | 20px x 20px | `width: 20px; height: 20px` |
| background | #D4271D | `background-color: #D4271D` |
| border-radius | 71.43px | `border-radius: 50%` |
| position | top-right | `position: absolute; top: -4px; right: -4px` |
| icon | 17px x 17px (X) | White close icon |

#### F.5 Add Image Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;662:9132` | - |
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | #FFFFFF | `background-color: #FFF` |
| border-radius | 8px | `border-radius: 8px` |
| text | "Image / Toi da 5" | `font-size: 11px; color: #999` |

---

### G. Anonymous Checkbox

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:14099` | - |
| width | 672px | `width: 100%` |
| gap | 16px | `gap: 16px` |
| display | flex row | `display: flex; align-items: center` |

**Checkbox:**
| Property | Value | CSS |
|----------|-------|-----|
| size | 24px x 24px | `width: 24px; height: 24px` |
| border | 1px solid #999 | `border: 1px solid #999` |
| background | #FFFFFF | `background-color: #FFF` |
| border-radius | 4px | `border-radius: 4px` |

**Checkbox States:**
| State | Changes |
|-------|---------|
| Unchecked | bg: #FFF, border: 1px solid #999, no checkmark |
| Checked | bg: #FFEA9E, border: 1px solid #998C5F, checkmark icon in #00101A |
| Hover | border-color: #998C5F (predicted) |
| Focus | outline: 2px solid #998C5F, outline-offset: 2px |

**Label:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #999999 | `color: #999` |

---

### H. Action Buttons

#### H.1 Cancel Button ("Huy")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9906` | - |
| padding | 16px 40px | `padding: 16px 40px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | rgba(255, 234, 158, 0.10) | `background-color: rgba(255, 234, 158, 0.10)` |
| border-radius | 4px | `border-radius: 4px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | 24px x 24px (X) | Close icon |
| gap | 8px | Between icon and text |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: rgba(255, 234, 158, 0.10), border: 1px solid #998C5F |
| Hover | bg: rgba(255, 234, 158, 0.20) (predicted: stronger gold tint) |
| Active | bg: rgba(255, 234, 158, 0.30) (predicted) |
| Focus | outline: 2px solid #998C5F, outline-offset: 2px |

#### H.2 Submit Button ("Gui")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9907` | - |
| width | 502px | `flex: 1` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | 24px x 24px (send) | Send/arrow icon |
| gap | 8px | Between text and icon |
| justify-content | center | `justify-content: center` |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E, cursor: pointer (always enabled per Figma, validates on click) |
| Hover | bg: darken(#FFEA9E) (predicted) |
| Loading | bg: #FFEA9E, show spinner replacing send icon, pointer-events: none (during submission) |
| Uploading | bg: #E5E5E5, cursor: not-allowed, color: #999 (while images are still uploading) |

---

## Component Hierarchy with Styles

```
Overlay (bg: #00101A @ 80%, fixed inset-0, z-50, flex items-center justify-center)
└── Modal (w: 752px, max-h: min(1012px,90vh), overflow-y: auto, p: 40px, gap: 32px, bg: #FFF8E1, radius: 24px, flex-col)
    ├── A_Title (text-center, Montserrat 32px/40px bold, #00101A)
    │
    ├── B_Recipient (flex-row, gap: 16px, items-center)
    │   ├── B.1_Label ("Nguoi nhan" *, Montserrat 22px bold, #00101A, asterisk #CF1322)
    │   └── B.2_Search (flex:1, h: 56px, p: 16px 24px, border: 1px #998C5F, radius: 8px, bg: #FFF)
    │       ├── Placeholder ("Tim kiem", Montserrat 16px #999)
    │       └── Dropdown Icon (24x24)
    │
    ├── C_Badge (flex-col, gap: 16px)
    │   ├── Row (flex-row, gap: 16px, items-center)
    │   │   ├── C.1_Label ("Danh hieu" *, Montserrat 22px bold, #00101A)
    │   │   └── C.2_Input (514px, p: 16px 24px, border: 1px #998C5F, radius: 8px, bg: #FFF)
    │   └── C.3_Helper (Montserrat 16px #999, "Vi du: Nguoi truyen dong luc...")
    │
    ├── D_Content (flex-col, gap: 24px)
    │   ├── Editor (flex-col, gap: 4px)
    │   │   ├── Toolbar (flex-row, h: 40px)
    │   │   │   ├── Bold (radius: 8px 0 0 0, p: 10px 16px, border: 1px #998C5F)
    │   │   │   ├── Italic (p: 10px 16px, border: 1px #998C5F)
    │   │   │   ├── Strikethrough (p: 10px 16px, border: 1px #998C5F)
    │   │   │   ├── NumberedList (p: 10px 16px, border: 1px #998C5F)
    │   │   │   ├── Link (p: 10px 16px, border: 1px #998C5F)
    │   │   │   ├── Quote (p: 10px 16px, border: 1px #998C5F)
    │   │   │   └── CommunityStd (radius: 0 8px 0 0, text-right, #E46060)
    │   │   ├── Textarea (h: 200px, min-h: 120px, radius: 0 0 8px 8px, border: 1px #998C5F, bg: #FFF)
    │   │   └── Hint ("Ban co the @ + ten...", Montserrat 16px #00101A)
    │   │
    │   ├── E_Hashtag (flex-row, gap: 16px, items-center)
    │   │   ├── E.1_Label ("Hashtag" *, Montserrat 22px bold, #00101A)
    │   │   └── E.2_TagGroup (flex-row, gap: 8px)
    │   │       ├── Chips (hashtag tags...)
    │   │       └── AddBtn (h: 48px, p: 4px 8px, border: 1px #998C5F, radius: 8px)
    │   │
    │   └── F_Image (flex-row, gap: 16px, items-center)
    │       ├── F.1_Label ("Image", Montserrat 22px bold, #00101A)
    │       ├── F.2-F.4_Thumbnails (80x80, radius: 18px, border: 1px #998C5F)
    │       │   └── CloseBtn (20x20, bg: #D4271D, radius: 50%, absolute top-right)
    │       └── F.5_AddBtn (h: 48px, p: 4px 8px, border: 1px #998C5F, radius: 8px)
    │
    ├── G_Anonymous (flex-row, gap: 16px, items-center)
    │   ├── Checkbox (24x24, border: 1px #999, radius: 4px, bg: #FFF)
    │   └── Label ("Gui loi cam on va ghi nhan an danh", Montserrat 22px #999)
    │
    └── H_Actions (flex-row, gap: 24px)
        ├── H.1_Cancel (p: 16px 40px, border: 1px #998C5F, radius: 4px, bg: rgba(255,234,158,0.1))
        │   ├── Icon X (24x24)
        │   └── Text ("Huy", Montserrat 16px bold #00101A)
        └── H.2_Submit (flex:1, h: 60px, p: 16px, bg: #FFEA9E, radius: 8px)
            ├── Text ("Gui", Montserrat 22px bold #00101A)
            └── Icon Send (24x24)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | infinite |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Modal | width: 100%, border-radius: 0 (fullscreen), padding: 24px |
| Title | font-size: 24px, line-height: 32px |
| Field Labels | font-size: 18px |
| Field layout (B, C) | flex-direction: column (label on top) |
| Textarea | min-height: 120px, height: auto |
| Image thumbnails | 64px x 64px |
| Action buttons | flex-direction: column-reverse, Submit first (full width) |
| Submit button | width: 100% |
| Cancel button | width: 100% |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Modal | width: 90vw, max-width: 752px |
| Padding | 32px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Modal | width: 752px (as designed), centered |
| All components | As specified in Figma |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-dropdown | 24x24 | #00101A | Recipient/Badge dropdown arrow |
| icon-bold | 24x24 | #00101A | Toolbar: Bold formatting |
| icon-italic | 24x24 | #00101A | Toolbar: Italic formatting |
| icon-strikethrough | 24x24 | #00101A | Toolbar: Strikethrough formatting |
| icon-numbered-list | 24x24 | #00101A | Toolbar: Numbered list |
| icon-link | 24x24 | #00101A | Toolbar: Insert link |
| icon-quote | 24x24 | #00101A | Toolbar: Block quote |
| icon-plus | 24x24 | #999 | Add hashtag / Add image button |
| icon-close | 17x17 | #FFFFFF | Delete image thumbnail (on red circle bg) |
| icon-cancel | 24x24 | #00101A | Cancel button X icon |
| icon-send | 24x24 | #00101A | Submit button send/arrow icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Modal | opacity, transform (scale) | 200ms | ease-out | Open/Close |
| Overlay | opacity | 200ms | ease-out | Open/Close |
| Submit Button | background-color | 150ms | ease-in-out | Hover |
| Cancel Button | background-color | 150ms | ease-in-out | Hover |
| Toolbar Button | background-color | 100ms | ease-in-out | Hover/Active |
| Input | border-color | 150ms | ease-in-out | Focus |
| Image Thumbnail | opacity | 150ms | ease-in-out | Add/Remove |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Modal Overlay | `520:11646` | `fixed inset-0 bg-[#00101A]/80 z-50 flex items-center justify-center` | `<KudoModalOverlay>` |
| Modal Dialog | `520:11647` | `w-[752px] max-h-[min(1012px,90vh)] overflow-y-auto p-10 bg-[#FFF8E1] rounded-3xl flex flex-col gap-8` | `<WriteKudoModal>` |
| Modal Title | `I520:11647;520:9870` | `text-center font-montserrat text-[32px] font-bold leading-10 text-[#00101A]` | `<h2>` |
| Field Label | `I520:11647;520:9872` | `font-montserrat text-[22px] font-bold leading-7 text-[#00101A]` | `<label>` |
| Required Asterisk | (child of label) | `text-[#CF1322] font-bold text-base` | `<span>` |
| Search Input | `I520:11647;520:9873` | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white font-montserrat text-base` | `<RecipientSearch>` |
| Badge Input | `I520:11647;1688:10437` | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white font-montserrat text-base` | `<BadgeInput>` |
| Helper Text | `I520:11647;1688:10447` | `font-montserrat text-base font-bold text-[#999]` | `<p>` |
| Toolbar | `I520:11647;520:9877` | `flex h-10 items-center` | `<EditorToolbar>` |
| Toolbar Button | (multiple) | `h-10 px-4 py-2.5 border border-[#998C5F] bg-transparent` | `<ToolbarButton>` |
| Textarea | `I520:11647;520:9886` | `w-full h-[200px] min-h-[120px] px-6 py-4 border border-[#998C5F] rounded-b-lg bg-white` | `<RichTextEditor>` |
| Hint Text | `I520:11647;520:9887` | `font-montserrat text-base font-bold text-[#00101A] tracking-[0.5px]` | `<p>` |
| Hashtag Group | `I520:11647;662:8595` | `flex gap-2 items-center` | `<HashtagGroup>` |
| Hashtag Chip | (child of group) | `h-8 px-3 py-1 bg-[#998C5F]/15 border border-[#998C5F] rounded-2xl font-montserrat text-sm font-bold flex items-center gap-1` | `<HashtagChip>` |
| Community Std Link | `I520:11647;3053:11619` | `flex-1 h-10 px-4 py-2.5 border border-[#998C5F] rounded-tr-lg text-right text-[#E46060] font-montserrat text-base font-bold` | `<ToolbarButton variant="link">` |
| Image Thumbnail | (multiple) | `w-20 h-20 rounded-[18px] border border-[#998C5F] object-cover relative` | `<ImageThumbnail>` |
| Close Button | (child of thumbnail) | `absolute -top-1 -right-1 w-5 h-5 bg-[#D4271D] rounded-full flex items-center justify-center` | `<button>` |
| Checkbox | `I520:11647;520:14099` | `w-6 h-6 border border-[#999] rounded bg-white` | `<input type="checkbox">` |
| Cancel Button | `I520:11647;520:9906` | `px-10 py-4 border border-[#998C5F] rounded bg-[#FFEA9E]/10 font-montserrat text-base font-bold` | `<Button variant="secondary">` |
| Submit Button | `I520:11647;520:9907` | `flex-1 h-[60px] p-4 bg-[#FFEA9E] rounded-lg font-montserrat text-[22px] font-bold text-[#00101A]` | `<Button variant="primary">` |

---

## Notes

- All colors should use CSS variables for theming support (project uses TailwindCSS 4)
- Font Montserrat is the primary font throughout the modal - ensure it's loaded
- Noto Sans JP is used only for the required asterisk (*) character
- The toolbar and textarea share a connected border (toolbar top-rounded, textarea bottom-rounded)
- Image thumbnails use rounded corners (18px) which is unique to this component
- The modal is 752px wide on desktop but should become fullscreen on mobile
- All icons MUST BE in Icon Component (per project constitution) instead of svg files or img tags
