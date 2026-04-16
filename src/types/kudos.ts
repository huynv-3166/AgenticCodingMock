// Types for the Sun* Kudos - Live Board feature
// Matches API contracts defined in plan.md

export type UserInfo = {
  user_id: string;
  name: string;
  avatar_url: string | null;
  department: string;
  department_code: string;
  star_level: number; // 0 = no badge, 1 = 10+ kudos, 2 = 20+, 3 = 50+
};

export type Kudo = {
  id: string;
  sender: UserInfo;
  receiver: UserInfo;
  message: string;
  category: string;
  hashtags: string[];
  images: string[];
  heart_count: number;
  is_hearted_by_me: boolean;
  is_anonymous: boolean;
  created_at: string; // ISO 8601
};

export type KudoFeedResponse = {
  data: Kudo[];
  nextCursor: string | null;
  total: number;
};

export type HighlightResponse = {
  data: Kudo[];
};

export type KudoDetailResponse = {
  data: Kudo;
};

export type HeartResponse = {
  heart_count: number;
  multiplier?: number;
};

export type SpotlightNode = {
  user_id: string;
  name: string;
  kudo_count: number;
  avatar_url: string | null;
};

export type SpotlightResponse = {
  total_kudos: number;
  nodes: SpotlightNode[];
};

export type UserStats = {
  kudos_received: number;
  kudos_sent: number;
  hearts_received: number;
  secret_boxes_opened: number;
  secret_boxes_unopened: number;
};

export type GiftRecipient = {
  user_id: string;
  name: string;
  avatar_url: string | null;
  gift_description: string;
  opened_at: string; // ISO 8601
};

export type GiftRecipientsResponse = {
  data: GiftRecipient[];
};

export type Hashtag = {
  id: string;
  name: string;
};

export type Department = {
  id: string;
  name: string;
  code: string;
};

export type SecretBoxOpenResponse = {
  gift_details: string;
  remaining_unopened: number;
};

export type SpecialDayInfo = {
  active: boolean;
  multiplier: number;
};

export type KudoFilters = {
  hashtag?: string;
  department?: string;
};

// === Write Kudos types ===

export type CreateKudoPayload = {
  recipient_id: string;
  badge_title: string;
  message: string; // HTML from TipTap editor
  hashtag_ids: string[];
  image_urls: string[];
  is_anonymous: boolean;
  anonymous_name?: string;
  mentioned_user_ids?: string[];
};

export type CreateKudoResponse = {
  data: Kudo;
};

export type UserSearchResult = {
  user_id: string;
  name: string;
  avatar_url: string | null;
  department: string;
};

export type ImageAttachment = {
  url: string;
  thumbnail_url: string;
};

export type WriteKudoFormState = {
  recipient: UserSearchResult | null;
  badgeTitle: string;
  messageContent: string;
  hashtags: Hashtag[];
  images: ImageAttachment[];
  isAnonymous: boolean;
  anonymousName: string;
  isSubmitting: boolean;
  errors: Record<string, string>;
  recipientQuery: string;
  uploadingImages: number;
};
