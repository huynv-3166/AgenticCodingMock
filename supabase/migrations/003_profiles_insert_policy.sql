-- ============================================================
-- Add INSERT policy for user_profiles
-- Allows authenticated users to create their own profile on first login
-- ============================================================

DO $$ BEGIN
  CREATE POLICY "profiles_insert" ON user_profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
