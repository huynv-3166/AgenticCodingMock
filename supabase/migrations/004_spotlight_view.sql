-- ============================================================
-- Spotlight Receiver Counts View
-- Aggregates kudo counts from the `kudos` table directly so the
-- spotlight board cannot drift from real data (the denormalized
-- user_profiles.kudo_received_count column is kept for star_level
-- and per-user stats but is no longer the source of truth for the board).
-- ============================================================

CREATE OR REPLACE VIEW spotlight_receiver_counts
  WITH (security_invoker = on) AS
SELECT
  k.receiver_id,
  p.display_name,
  COUNT(*)::int AS kudo_count
FROM kudos k
JOIN user_profiles p ON p.user_id = k.receiver_id
WHERE p.display_name IS NOT NULL
GROUP BY k.receiver_id, p.display_name;

GRANT SELECT ON spotlight_receiver_counts TO authenticated;
