# Screen Flow

> Navigation map for all screens in the application.
> Figma File Key: `9ypp4enmFmdK3YAFJLIu6C`

---

## Login

| Property | Value |
|---|---|
| Screen ID | `GzbNeVGJHz` |
| Screen Name | Login |
| Route | `/login` |
| Auth Required | No (public screen) |

### Entry Points (Navigation TO this screen)

| Source | Trigger |
|---|---|
| Direct URL | User navigates to `/login` |
| Protected route redirect | Unauthenticated user attempts to access a protected route and is redirected here |

### Exit Points (Navigation FROM this screen)

| Destination | Destination Screen ID | Trigger |
|---|---|---|
| Homepage SAA | `i87tDx10uM` | Successful Google OAuth login |
| Dropdown-ngon ngu | `hUyaaugye2` | Language selector click (opens dropdown overlay) |

### Key Components

| Component ID | Description |
|---|---|
| A_Header | Header with logo and language selector |
| B_Bia | Hero section with ROOT FURTHER key visual, description text, and LOGIN With Google button |
| D_Footer | Copyright footer |

---

## Homepage SAA

| Property | Value |
|---|---|
| Screen ID | `i87tDx10uM` |
| Screen Name | Homepage SAA |
| Route | `/` (homepage) |
| Auth Required | Yes (authenticated users only) |

### Entry Points (Navigation TO this screen)

| Source | Trigger |
|---|---|
| Login | Successful Google OAuth login |
| Direct URL | User navigates to `/` (must be authenticated) |
| Any page header logo | Click SAA logo in header |

### Exit Points (Navigation FROM this screen)

| Destination | Destination Screen ID | Trigger |
|---|---|---|
| Awards Information | - | Header nav "Awards Information" click, CTA "ABOUT AWARDS" click, Award card click, Footer "Awards Information" link |
| Sun* Kudos | - | Header nav "Sun* Kudos" click, CTA "ABOUT KUDOS" click, Kudos "Chi tiet" button, Footer "Sun* Kudos" link |
| Dropdown-profile | `z4sCl3_Qtk` | Profile icon click (opens dropdown overlay) |
| Dropdown-ngon ngu | `hUyaaugye2` | Language selector click (opens dropdown overlay) |
| Notification panel | - | Bell icon click (opens notification panel) |
| Community Standards | - | Footer "Tieu chuan chung" link click |
| Quick Action Menu | - | Floating widget button click (opens action menu) |

### Key Components

| Component ID | Description |
|---|---|
| A1_Header | Top navigation with logo, nav links (About SAA 2025, Awards Information, Sun* Kudos), notification bell, language selector, profile icon |
| 3.5_Keyvisual | Hero section with ROOT FURTHER banner, countdown timer (Days/Hours/Minutes), event info, CTA buttons |
| B4_content | Root Further campaign description text block |
| C1_Header Giai thuong | Awards section title: "He thong giai thuong" |
| C2_Award list | Grid of 6 award category cards (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, MVP) |
| D1_Sunkudos | Sun* Kudos promotional section with title, description, and "Chi tiet" button |
| 6_Widget Button | Floating action button (bottom-right, pill shape, gold) |
| 7_Footer | Footer with logo, nav links, community standards link, copyright |

---
