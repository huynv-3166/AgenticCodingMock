import { z } from "zod";

export const kudoFeedParamsSchema = z.object({
  cursor: z.string().datetime().optional(),
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
