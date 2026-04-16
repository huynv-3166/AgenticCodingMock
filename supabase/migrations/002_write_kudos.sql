-- ============================================================
-- Write Kudos Migration
-- Feature: Write Kudos (ihQ26W78P2)
-- Adds: user_profiles.display_name, Storage bucket, delete policies
-- ============================================================

-- 1. Add display_name to user_profiles for search
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS display_name VARCHAR(200);

CREATE INDEX IF NOT EXISTS idx_user_profiles_display_name
  ON user_profiles(display_name);

-- 2. Add delete policies for kudos (needed for rollback on failed multi-table insert)
DO $$ BEGIN
  CREATE POLICY "kudos_delete_own" ON kudos
    FOR DELETE TO authenticated USING (auth.uid() = sender_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "kudo_hashtags_delete" ON kudo_hashtags
    FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "kudo_images_delete" ON kudo_images
    FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 3. Create Storage bucket for kudo images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'kudo-images',
  'kudo-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 4. Storage RLS policies
DO $$ BEGIN
  CREATE POLICY "kudo_images_upload" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
      bucket_id = 'kudo-images'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "kudo_images_read" ON storage.objects
    FOR SELECT TO authenticated
    USING (bucket_id = 'kudo-images');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "kudo_images_obj_delete" ON storage.objects
    FOR DELETE TO authenticated
    USING (
      bucket_id = 'kudo-images'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 5. Trigger to auto-update user stats on kudo insert
CREATE OR REPLACE FUNCTION update_kudo_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profiles SET kudo_sent_count = kudo_sent_count + 1
    WHERE user_id = NEW.sender_id;
  UPDATE user_profiles SET kudo_received_count = kudo_received_count + 1
    WHERE user_id = NEW.receiver_id;
  UPDATE user_profiles SET star_level = CASE
    WHEN kudo_received_count >= 50 THEN 3
    WHEN kudo_received_count >= 20 THEN 2
    WHEN kudo_received_count >= 10 THEN 1
    ELSE 0
  END
  WHERE user_id = NEW.receiver_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS kudo_stats_trigger ON kudos;
CREATE TRIGGER kudo_stats_trigger
  AFTER INSERT ON kudos
  FOR EACH ROW EXECUTE FUNCTION update_kudo_stats();
