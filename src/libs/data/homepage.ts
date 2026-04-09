import type { AwardCategory, EventConfig } from "@/types";

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: "1",
    title: "Top Talent",
    description:
      "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
    thumbnail_url: "/assets/home/logos/award-top-talent-full.png",
    slug: "top-talent",
    display_order: 1,
  },
  {
    id: "2",
    title: "Top Project",
    description:
      "Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi bật",
    thumbnail_url: "/assets/home/logos/award-top-project-full.png",
    slug: "top-project",
    display_order: 2,
  },
  {
    id: "3",
    title: "Top Project Leader",
    description:
      "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá",
    thumbnail_url: "/assets/home/logos/award-top-project-leader-full.png",
    slug: "top-project-leader",
    display_order: 3,
  },
  {
    id: "4",
    title: "Best Manager",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    thumbnail_url: "/assets/home/logos/award-best-manager-full.png",
    slug: "best-manager",
    display_order: 4,
  },
  {
    id: "5",
    title: "Signature 2025 - Creator",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    thumbnail_url: "/assets/home/logos/award-signature-creator-full.png",
    slug: "signature-2025-creator",
    display_order: 5,
  },
  {
    id: "6",
    title: "MVP (Most Valuable Person)",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    thumbnail_url: "/assets/home/logos/award-mvp-full.png",
    slug: "mvp",
    display_order: 6,
  },
];

export const EVENT_CONFIG: EventConfig = {
  event_start_date: process.env.EVENT_START_DATE ?? "",
  event_date_display: "26/12/2025",
  event_location: "Âu Cơ Art Center",
  livestream_info: "Tường thuật trực tiếp qua sóng Livestream",
};

export function getUnreadNotificationCount(): number {
  return 0;
}
