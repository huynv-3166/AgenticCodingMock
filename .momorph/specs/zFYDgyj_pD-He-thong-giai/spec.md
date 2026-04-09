# Feature Specification: Hệ thống giải thưởng SAA 2025

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-09
**Status**: Draft

---

## Overview

Trang "Hệ thống giải thưởng SAA 2025" hiển thị toàn bộ thông tin các hạng mục giải thưởng trong chương trình Sun* Annual Awards 2025. Trang bao gồm hero banner, danh mục điều hướng bên trái (sticky), và các thẻ thông tin chi tiết cho 6 hạng mục giải: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, và MVP. Cuối trang có khối quảng bá Sun* Kudos với nút CTA "Chi tiết".

---

## User Scenarios & Testing

### User Story 1 - Xem thông tin hệ thống giải thưởng (Priority: P1)

Người dùng truy cập trang để xem danh sách và chi tiết các hạng mục giải thưởng SAA 2025, bao gồm mô tả, số lượng giải, và giá trị giải thưởng.

**Why this priority**: Đây là mục đích chính của trang - hiển thị thông tin giải thưởng cho toàn bộ nhân viên Sun*.

**Independent Test**: Truy cập trang, xác minh hiển thị đầy đủ 6 hạng mục giải với thông tin đúng.

**Acceptance Scenarios**:

1. **Given** người dùng đã đăng nhập, **When** truy cập trang "Hệ thống giải", **Then** hiển thị hero banner "ROOT FURTHER", tiêu đề "Hệ thống giải thưởng SAA 2025", và 6 thẻ giải thưởng.
2. **Given** trang đã tải xong, **When** người dùng cuộn xuống, **Then** mỗi thẻ giải hiển thị: ảnh biểu tượng, tiêu đề, mô tả, số lượng giải thưởng (với đơn vị), và giá trị giải thưởng (VNĐ).
3. **Given** trang đã tải xong, **When** người dùng xem thẻ "Top Talent", **Then** hiển thị số lượng "10", đơn vị tính, giá trị "7.000.000 VNĐ", và ghi chú "cho mỗi giải thưởng".
4. **Given** trang đang tải, **When** dữ liệu chưa sẵn sàng, **Then** hiển thị skeleton loading cho hero banner, tiêu đề, menu, và các thẻ giải.
5. **Given** trang tải xong nhưng ảnh giải thưởng lỗi, **When** ảnh không load được, **Then** hiển thị ảnh placeholder với alt text mô tả hạng mục giải.

---

### User Story 2 - Điều hướng nhanh giữa các hạng mục giải (Priority: P1)

Người dùng sử dụng menu danh mục bên trái để nhảy nhanh tới hạng mục giải quan tâm.

**Why this priority**: Trang dài với nhiều hạng mục, điều hướng nhanh giúp người dùng tìm thông tin hiệu quả.

**Independent Test**: Click từng mục trong menu bên trái, xác minh trang cuộn tới phần tương ứng.

**Acceptance Scenarios**:

1. **Given** trang đã tải, **When** người dùng click "Top Project" trong menu trái, **Then** trang cuộn mượt tới phần "Top Project" và mục "Top Project" được highlight (active state).
2. **Given** trang đã tải, **When** người dùng click lần lượt 6 mục (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP), **Then** mỗi lần click, trang cuộn đúng vị trí và chỉ mục đang chọn có trạng thái active.
3. **Given** menu bên trái đang hiển thị, **When** người dùng hover lên một mục, **Then** mục đó hiển thị hiệu ứng highlight.
4. **Given** người dùng cuộn trang thủ công (không qua menu), **When** phần "Best Manager" hiện vào viewport, **Then** menu trái tự động cập nhật active state sang "Best Manager" (scroll spy).
5. **Given** người dùng sử dụng bàn phím, **When** nhấn Tab để di chuyển qua các menu item, **Then** focus ring hiển thị rõ ràng trên item đang focus; nhấn Enter/Space để kích hoạt scroll tới section tương ứng.

---

### User Story 3 - Xem thông tin Sun* Kudos và điều hướng (Priority: P2)

Người dùng xem khối quảng bá Sun* Kudos ở cuối trang và click vào nút "Chi tiết" để tìm hiểu thêm.

**Why this priority**: Tính năng bổ sung quảng bá chương trình Kudos, không phải nội dung chính của trang.

**Independent Test**: Cuộn tới cuối trang, xác minh hiển thị khối Kudos và nút "Chi tiết" hoạt động.

**Acceptance Scenarios**:

1. **Given** người dùng ở trang "Hệ thống giải", **When** cuộn tới cuối trang, **Then** hiển thị khối "Sun* Kudos" với tiêu đề "Phong trào ghi nhận", mô tả ngắn, logo/ảnh minh họa, và nút "Chi tiết".
2. **Given** khối Sun* Kudos hiển thị, **When** người dùng click nút "Chi tiết", **Then** điều hướng tới trang chi tiết Sun* Kudos.
3. **Given** nút "Chi tiết" hiển thị, **When** người dùng hover nút, **Then** nút hiển thị hiệu ứng hover (nổi nhẹ).

---

### User Story 4 - Xem trang trên các thiết bị khác nhau (Priority: P2)

Người dùng có thể xem trang giải thưởng trên mobile, tablet và desktop với trải nghiệm phù hợp.

**Why this priority**: Đảm bảo accessibility cho tất cả nhân viên dù sử dụng thiết bị nào.

**Independent Test**: Mở trang trên các breakpoint 375px, 768px, 1024px, 1440px và kiểm tra layout.

**Acceptance Scenarios**:

1. **Given** người dùng trên desktop (>=1024px), **When** trang tải, **Then** hiển thị layout 2 cột: menu trái sticky + nội dung giải thưởng bên phải.
2. **Given** người dùng trên mobile (<768px), **When** trang tải, **Then** menu trái ẩn hoặc chuyển thành dropdown/accordion, thẻ giải hiển thị full-width xếp dọc.
3. **Given** người dùng trên tablet (768px-1023px), **When** trang tải, **Then** layout điều chỉnh phù hợp, vẫn có thể truy cập menu điều hướng.

---

### Edge Cases

- Nội dung giải thưởng rỗng hoặc chưa có dữ liệu: hiển thị placeholder hoặc thông báo "Chưa có thông tin".
- Ảnh giải thưởng lỗi/chưa tải: hiển thị ảnh placeholder với alt text.
- Trang tải chậm: hiển thị skeleton loading cho các thẻ giải.
- Scroll spy: menu trái tự động cập nhật active state khi người dùng cuộn manual.
- Keyboard navigation: Tab qua menu items, Enter/Space kích hoạt, focus ring visible trên nền tối.
- Screen reader: Các section có `aria-label`, menu items có `aria-current="true"` khi active.
- Deep link: Truy cập `/awards#best-manager` cuộn thẳng tới section Best Manager và active menu tương ứng.
- Scroll offset: Khi scroll tới section qua menu click, cần offset cho sticky header (80px) để section title không bị che.

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Hero Banner (Keyvisual) | 313:8437 | Ảnh nền full-width (1440px design, responsive cover) với tiêu đề "ROOT FURTHER", gradient overlay phía dưới | Không tương tác |
| Section Title | 313:8453 | Tiêu đề "Hệ thống giải thưởng SAA 2025" với phụ đề | Không tương tác |
| Award Category Menu | 313:8459 | Menu điều hướng 6 mục bên trái (sticky) | Click: scroll to section, Hover: highlight |
| Menu Item - Top Talent | 313:8460 | Mục "Top Talent" với icon | Click, Hover |
| Menu Item - Top Project | 313:8461 | Mục "Top Project" | Click, Hover |
| Menu Item - Top Project Leader | 313:8462 | Mục "Top Project Leader" | Click, Hover |
| Menu Item - Best Manager | 313:8463 | Mục "Best Manager" | Click, Hover |
| Menu Item - Signature 2025 | 313:8464 | Mục "Signature 2025 - Creator" | Click, Hover |
| Menu Item - MVP | 313:8465 | Mục "MVP" | Click, Hover |
| Award Card - Top Talent | 313:8467 | Thẻ thông tin: ảnh 336x336px, tiêu đề, mô tả, SL: 10, GT: 7.000.000 VNĐ | Không tương tác |
| Award Card - Top Project | 313:8468 | SL: 02 (Tập thể), GT: 15.000.000 VNĐ | Không tương tác |
| Award Card - Top Project Leader | 313:8469 | SL: 03 (Cá nhân), GT: 7.000.000 VNĐ | Không tương tác |
| Award Card - Best Manager | 313:8470 | SL: 01 (Cá nhân), GT: 10.000.000 VNĐ | Không tương tác |
| Award Card - Signature 2025 | 313:8471 | SL: 01, GT: 5.000.000 VNĐ (cá nhân) / 8.000.000 VNĐ (tập thể) | Không tương tác |
| Award Card - MVP | 313:8510 | SL: 01, GT: 15.000.000 VNĐ | Không tương tác |
| Sun* Kudos Block | 335:12023 | Khối quảng bá với tiêu đề, mô tả, logo, nút CTA | Click nút "Chi tiết" |
| Button "Chi tiết" | I335:12023;313:8426 | Nút CTA gold filled (bg: #FFEA9E, text: #00101A) với arrow icon | Click: navigate, Hover: lift effect, Focus: gold outline |

> **Visual specs**: Xem chi tiết trong [design-style.md](./design-style.md)

### Navigation Flow

- **From (Entry Points)**:
  - Homepage SAA (`i87tDx10uM`) → Click tab "Award Information" trong header
  - Homepage SAA → Click CTA "ABOUT AWARDS" hoặc award card
  - Homepage SAA → Footer link "Awards Information"
  - Direct URL: `/awards` hoặc `/awards#[category-id]` (deep link)
- **To (Exit Points)**:
  - Sun* Kudos page → Click nút "Chi tiết" trong khối Kudos
  - Homepage SAA → Click logo trong header
  - About SAA 2025 → Click "About SAA 2025" trong header
  - Sun* Kudos → Click "Sun* Kudos" trong header hoặc footer
  - Tiêu chuẩn cộng đồng → Click "Tiêu chuẩn chung" trong footer
- **Internal**: Menu trái → Scroll to section (anchor navigation với smooth scroll)

### Visual Requirements

- Responsive breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
- Animations/Transitions: Smooth scroll khi click menu item, hover effects trên menu items và nút CTA

### Accessibility Requirements

- **Keyboard Navigation**: Tab qua menu items và CTA button; Enter/Space để kích hoạt; focus ring visible (#FFEA9E outline) trên nền tối
- **Screen Reader**: Alt text cho tất cả ảnh giải thưởng; `aria-label` cho nav sections; `aria-current="true"` cho active menu item
- **Semantic HTML**: `<nav>` cho sidebar menu; `<section>` với `id` cho mỗi award category; `<h2>`/`<h3>` cho tiêu đề
- **Contrast**: Gold text (#FFEA9E) trên nền tối (#00101A) = ~12.5:1 (WCAG AAA); White (#FFF) trên tối = ~18.5:1 (WCAG AAA)
- **Skip Links**: "Skip to content" link cho screen reader users
- **Reduced Motion**: Respect `prefers-reduced-motion` - disable smooth scroll, use instant jumps

---

## Requirements

### Functional Requirements

- **FR-001**: Hệ thống PHẢI hiển thị 6 hạng mục giải thưởng với đầy đủ thông tin (tiêu đề, mô tả, số lượng, giá trị)
- **FR-002**: Menu điều hướng bên trái PHẢI sticky khi cuộn trang và scroll tới section tương ứng khi click
- **FR-003**: Menu PHẢI có scroll spy - tự động cập nhật active state theo vị trí cuộn hiện tại
- **FR-004**: Nút "Chi tiết" trong khối Sun* Kudos PHẢI điều hướng tới trang Sun* Kudos
- **FR-005**: Hero banner PHẢI hiển thị ảnh nền responsive (cover, crop trung tâm)
- **FR-006**: Mỗi thẻ giải thưởng PHẢI hiển thị: ảnh biểu tượng (336x336px), tiêu đề, mô tả chi tiết, số lượng giải (kèm đơn vị: Cá nhân/Tập thể/Đơn vị), giá trị giải (VNĐ)

### Technical Requirements

- **TR-001**: Smooth scrolling với `scroll-behavior: smooth` hoặc JS animation
- **TR-002**: Intersection Observer API cho scroll spy functionality
- **TR-003**: Lazy loading cho ảnh giải thưởng để tối ưu performance
- **TR-004**: Server Component cho nội dung tĩnh, Client Component chỉ cho scroll spy và menu interaction

### Key Entities

- **Award Category**: Hạng mục giải (name, description, image, quantity, unit, prizeValue, prizeNote)
- **Award Page Content**: Nội dung tĩnh trang giải thưởng (heroImage, title, subtitle, sections)

---

## Data Requirements

### Award Categories Data

| Field | Type | Example | Note |
|-------|------|---------|------|
| id | string | "top-talent" | Unique identifier / anchor ID |
| title | string | "Top Talent" | Tên hạng mục |
| description | string | "Giải thưởng Top Talent vinh danh..." | Mô tả chi tiết |
| image | string | "/assets/awards/top-talent.png" | Ảnh biểu tượng 336x336px |
| quantity | number | 10 | Số lượng giải |
| unit | string | "Đơn vị" / "Cá nhân" / "Tập thể" | Đơn vị tính |
| prizeValue | string | "7.000.000 VNĐ" | Giá trị giải thưởng |
| prizeNote | string | "cho mỗi giải thưởng" | Ghi chú thêm |
| prizeValueGroup | string? | "8.000.000 VNĐ" | Giá trị giải cho tập thể (chỉ Signature 2025) |
| prizeNoteGroup | string? | "cho giải tập thể" | Ghi chú giải tập thể |

### Award Categories Content (from design)

| Category | Quantity | Unit | Prize (Individual) | Prize (Group) |
|----------|----------|------|-------------------|---------------|
| Top Talent | 10 | Đơn vị | 7.000.000 VNĐ | - |
| Top Project | 02 | Tập thể | 15.000.000 VNĐ | - |
| Top Project Leader | 03 | Cá nhân | 7.000.000 VNĐ | - |
| Best Manager | 01 | Cá nhân | 10.000.000 VNĐ | - |
| Signature 2025 - Creator | 01 | Cá nhân | 5.000.000 VNĐ | 8.000.000 VNĐ |
| MVP | 01 | Cá nhân | 15.000.000 VNĐ | - |

---

## State Management

### Local Component State (Client Component)

| State | Type | Default | Description |
|-------|------|---------|-------------|
| activeCategory | string | "top-talent" | ID của hạng mục giải đang active trong sidebar menu |
| isScrolling | boolean | false | Cờ để phân biệt scroll do click menu vs scroll thủ công (tránh conflict scroll spy) |

### Global State

- Không cần global state - trang hiển thị nội dung tĩnh, không share state với trang khác.

### Loading & Error States

| State | UI Behavior |
|-------|-------------|
| Loading (initial) | Skeleton loading cho hero banner, tiêu đề, sidebar menu, và award cards |
| Image error | Ảnh placeholder (gradient hoặc icon) với alt text mô tả hạng mục |
| Content loaded | Hiển thị đầy đủ nội dung, kích hoạt scroll spy |

### Cache Requirements

- Award content là nội dung tĩnh → có thể cache aggressively (revalidate: false hoặc ISR dài)
- Ảnh giải thưởng → sử dụng `next/image` với cache mặc định

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/awards | GET | Lấy danh sách hạng mục giải thưởng SAA 2025 | Predicted - New |
| /api/awards/[id] | GET | Lấy chi tiết một hạng mục giải | Predicted - New |

> **Note**: Nếu nội dung tĩnh, có thể dùng static data (JSON/constants) thay vì API. Cân nhắc dùng CMS hoặc Supabase nếu cần admin chỉnh sửa nội dung.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Tất cả 6 hạng mục giải hiển thị đúng thông tin (100% accuracy với design)
- **SC-002**: Menu điều hướng scroll đúng vị trí và scroll spy hoạt động chính xác
- **SC-003**: Trang hiển thị đúng trên 3 breakpoint chính (mobile, tablet, desktop)
- **SC-004**: Lighthouse Performance score >= 90 (lazy loading images, optimized assets)
- **SC-005**: Lighthouse Accessibility score >= 90

---

## Out of Scope

- Chức năng bình chọn/vote cho ứng viên giải thưởng
- Hiển thị danh sách ứng viên/người chiến thắng
- Chức năng đề cử ứng viên
- Admin panel quản lý nội dung giải thưởng
- Animation phức tạp (parallax, particle effects) cho hero banner

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Homepage SAA spec exists (`.momorph/specs/i87tDx10uM-Homepage-SAA/`)

---

## Notes

- Nội dung giải thưởng có thể là static content (hardcoded JSON) vì ít thay đổi trong mùa giải.
- Ảnh giải thưởng cần được export từ Figma hoặc cung cấp bởi design team (336x336px, transparent background).
- Menu sticky bên trái chỉ hiển thị trên desktop; trên mobile cần thiết kế alternative (dropdown hoặc horizontal scroll tabs).
- Giải "Signature 2025 - Creator" có 2 mức giá trị (cá nhân: 5M, tập thể: 8M) - cần UI phân biệt rõ.
- Khối Sun* Kudos ở cuối trang là cross-promotion, nút "Chi tiết" link sang feature khác.
