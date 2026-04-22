import { z } from "zod";

export const kudoFeedParamsSchema = z.object({
  // Cursor is a Postgres TIMESTAMPTZ echoed back from the previous page's last row,
  // which serializes as `YYYY-MM-DDTHH:MM:SS.ffffff+00:00`. Zod's default datetime
  // validator only accepts the `Z` suffix, so explicitly allow numeric offsets.
  cursor: z.string().datetime({ offset: true }).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  hashtag: z.string().max(100).optional(),
  department: z.string().max(20).optional(),
});

export type KudoFeedParams = z.infer<typeof kudoFeedParamsSchema>;

export const kudoIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const spotlightSearchSchema = z.object({
  query: z.string().max(100).optional(),
});

export type SpotlightSearchParams = z.infer<typeof spotlightSearchSchema>;

export const highlightParamsSchema = z.object({
  hashtag: z.string().max(100).optional(),
  department: z.string().max(20).optional(),
});

export type HighlightParams = z.infer<typeof highlightParamsSchema>;

// === Write Kudos schemas ===

// UUID-like pattern (accepts any hex UUID format, not just strict v4)
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const uuidString = z.string().regex(uuidPattern, "Invalid UUID format");

export const createKudoSchema = z.object({
  recipient_id: uuidString,
  badge_title: z.string().min(1, "Badge title is required").max(100, "Badge title must be 100 characters or less"),
  message: z.string().min(1, "Message is required").max(10000, "Message too long"),
  hashtag_ids: z.array(uuidString).min(1, "At least 1 hashtag required").max(5, "Maximum 5 hashtags"),
  image_urls: z.array(z.string()).max(5, "Maximum 5 images").default([]),
  is_anonymous: z.boolean().default(false),
  anonymous_name: z.string().max(50).optional(),
  mentioned_user_ids: z.array(uuidString).optional().default([]),
});

export type CreateKudoInput = z.infer<typeof createKudoSchema>;

export const userSearchSchema = z.object({
  q: z.string().min(1, "Query is required").max(100),
});

export type UserSearchParams = z.infer<typeof userSearchSchema>;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const imageUploadSchema = z.object({
  type: z.string().refine((t) => ACCEPTED_IMAGE_TYPES.includes(t), "File must be JPEG, PNG, GIF, or WebP"),
  size: z.number().max(MAX_IMAGE_SIZE, "File must be under 5MB"),
});

export { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE };
