export type SpotlightName = {
  name: string;
  x: number;  // % from left
  y: number;  // % from top
  size: number; // font size in px
  opacity: number;
  highlight?: boolean;
};

// Grid layout: 8 columns x 6 rows = 48 slots
// Each slot ~12% wide, ~13% tall — prevents overlap
export const SPOTLIGHT_NAMES: SpotlightName[] = [
  // === Row 1 (y ~20%) ===
  { name: "Ba hoang Minh", x: 2, y: 18, size: 11, opacity: 0.35 },
  { name: "Nguyen Van Quy", x: 16, y: 20, size: 18, opacity: 0.85 },
  { name: "Ha phuong Thuy", x: 35, y: 19, size: 12, opacity: 0.35 },
  { name: "Duong Thuy An", x: 52, y: 20, size: 14, opacity: 0.5 },
  { name: "Le Kieu Trang", x: 68, y: 18, size: 11, opacity: 0.3 },
  { name: "Nguyen Ba Chuc", x: 83, y: 20, size: 13, opacity: 0.45 },

  // === Row 2 (y ~32%) ===
  { name: "Duong Thuy An", x: 3, y: 31, size: 14, opacity: 0.55 },
  { name: "Le Kieu Trang", x: 20, y: 33, size: 16, opacity: 0.7 },
  { name: "Nguyen Hoang Linh", x: 38, y: 32, size: 22, opacity: 1, highlight: true },
  { name: "Ba hoang Minh", x: 60, y: 31, size: 13, opacity: 0.45 },
  { name: "Ha phuong Thuy", x: 76, y: 33, size: 16, opacity: 0.75 },
  { name: "Nguyen Van Quy", x: 90, y: 31, size: 11, opacity: 0.3 },

  // === Row 3 (y ~44%) ===
  { name: "Nguyen Ba Chuc", x: 5, y: 43, size: 16, opacity: 0.7 },
  { name: "Ha phuong Thuy", x: 22, y: 45, size: 11, opacity: 0.3 },
  { name: "Nguyen Van Quy", x: 38, y: 44, size: 13, opacity: 0.5 },
  { name: "Duong Thuy An", x: 55, y: 43, size: 17, opacity: 0.8 },
  { name: "Le Kieu Trang", x: 72, y: 45, size: 14, opacity: 0.55 },
  { name: "Nguyen Hoang Linh", x: 87, y: 44, size: 12, opacity: 0.35 },

  // === Row 4 (y ~56%) ===
  { name: "Le Kieu Trang", x: 2, y: 55, size: 12, opacity: 0.35 },
  { name: "Duong Thuy An", x: 18, y: 57, size: 16, opacity: 0.65 },
  { name: "Nguyen Ba Chuc", x: 36, y: 56, size: 11, opacity: 0.3 },
  { name: "Ha phuong Thuy", x: 52, y: 55, size: 14, opacity: 0.5 },
  { name: "Ba hoang Minh", x: 68, y: 57, size: 16, opacity: 0.7 },
  { name: "Nguyen Van Quy", x: 84, y: 56, size: 13, opacity: 0.45 },

  // === Row 5 (y ~68%) ===
  { name: "Nguyen Hoang Linh", x: 4, y: 67, size: 14, opacity: 0.5 },
  { name: "Ba hoang Minh", x: 22, y: 69, size: 16, opacity: 0.65 },
  { name: "Nguyen Van Quy", x: 40, y: 68, size: 12, opacity: 0.35 },
  { name: "Le Kieu Trang", x: 56, y: 67, size: 17, opacity: 0.75 },
  { name: "Duong Thuy An", x: 73, y: 69, size: 11, opacity: 0.3 },
  { name: "Ha phuong Thuy", x: 88, y: 68, size: 14, opacity: 0.5 },

  // === Row 6 (y ~80%) ===
  { name: "Ha phuong Thuy", x: 3, y: 79, size: 13, opacity: 0.45 },
  { name: "Nguyen Ba Chuc", x: 18, y: 81, size: 11, opacity: 0.3 },
  { name: "Duong Thuy An", x: 35, y: 80, size: 16, opacity: 0.65 },
  { name: "Nguyen Hoang Linh", x: 53, y: 79, size: 12, opacity: 0.35 },
  { name: "Ba hoang Minh", x: 70, y: 81, size: 14, opacity: 0.5 },
  { name: "Le Kieu Trang", x: 86, y: 80, size: 11, opacity: 0.3 },

  // === Extra fills in gaps (y offset by ~6% from rows) ===
  { name: "Nguyen Van Quy", x: 10, y: 25, size: 12, opacity: 0.3 },
  { name: "Ba hoang Minh", x: 45, y: 26, size: 11, opacity: 0.28 },
  { name: "Le Kieu Trang", x: 78, y: 26, size: 12, opacity: 0.28 },
  { name: "Ha phuong Thuy", x: 30, y: 38, size: 11, opacity: 0.28 },
  { name: "Nguyen Ba Chuc", x: 65, y: 38, size: 12, opacity: 0.3 },
  { name: "Duong Thuy An", x: 12, y: 50, size: 11, opacity: 0.28 },
  { name: "Nguyen Van Quy", x: 46, y: 50, size: 12, opacity: 0.28 },
  { name: "Ba hoang Minh", x: 80, y: 50, size: 11, opacity: 0.25 },
  { name: "Le Kieu Trang", x: 28, y: 62, size: 11, opacity: 0.25 },
  { name: "Ha phuong Thuy", x: 62, y: 62, size: 12, opacity: 0.28 },
  { name: "Nguyen Ba Chuc", x: 42, y: 74, size: 11, opacity: 0.25 },
  { name: "Duong Thuy An", x: 80, y: 74, size: 12, opacity: 0.28 },
];

export const SPOTLIGHT_TOTAL_KUDOS = 388;
