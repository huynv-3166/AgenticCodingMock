-- ============================================================
-- Anonymous display name for kudos
-- Feature: Write Kudos (ihQ26W78P2) — User Story 8
-- Adds: kudos.anonymous_name (custom display name when is_anonymous = true)
-- ============================================================

ALTER TABLE kudos
  ADD COLUMN IF NOT EXISTS anonymous_name VARCHAR(50);
