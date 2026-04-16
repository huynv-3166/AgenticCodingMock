-- ============================================================
-- Sun* Kudos Schema Migration
-- Feature: Sun* Kudos - Live Board (MaZUn5xHXZ)
-- ============================================================

-- ============================================================
-- 1. Reference tables (created first — referenced by others)
-- ============================================================

CREATE TABLE hashtags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE departments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(200) NOT NULL,
  code        VARCHAR(20) NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. Core tables
-- ============================================================

CREATE TABLE kudos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id     UUID NOT NULL REFERENCES auth.users(id),
  receiver_id   UUID NOT NULL REFERENCES auth.users(id),
  message       TEXT NOT NULL CHECK (char_length(message) <= 2000),
  category      VARCHAR(100) NOT NULL DEFAULT 'Loi cam on',
  is_anonymous  BOOLEAN NOT NULL DEFAULT false,
  heart_count   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX idx_kudos_heart_count ON kudos(heart_count DESC);
CREATE INDEX idx_kudos_sender ON kudos(sender_id);
CREATE INDEX idx_kudos_receiver ON kudos(receiver_id);

CREATE TABLE kudo_hashtags (
  kudo_id     UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  hashtag_id  UUID NOT NULL REFERENCES hashtags(id),
  PRIMARY KEY (kudo_id, hashtag_id)
);

CREATE TABLE kudo_images (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id        UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  image_url      TEXT NOT NULL,
  display_order  SMALLINT NOT NULL DEFAULT 0,
  CONSTRAINT max_5_images CHECK (display_order < 5)
);

CREATE TABLE hearts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id     UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id),
  multiplier  SMALLINT NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (kudo_id, user_id)
);
CREATE INDEX idx_hearts_kudo ON hearts(kudo_id);

-- ============================================================
-- 3. Gamification
-- ============================================================

CREATE TABLE secret_boxes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id),
  is_opened     BOOLEAN NOT NULL DEFAULT false,
  opened_at     TIMESTAMPTZ,
  gift_details  TEXT
);
CREATE INDEX idx_secret_boxes_user ON secret_boxes(user_id);

CREATE TABLE special_days (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date             DATE NOT NULL UNIQUE,
  heart_multiplier SMALLINT NOT NULL DEFAULT 2,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. User extensions (extends Supabase auth.users)
-- ============================================================

CREATE TABLE user_profiles (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  department_id        UUID REFERENCES departments(id),
  star_level           SMALLINT NOT NULL DEFAULT 0,
  kudo_received_count  INTEGER NOT NULL DEFAULT 0,
  kudo_sent_count      INTEGER NOT NULL DEFAULT 0,
  heart_received_count INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- 5. Trigger: auto-update kudos.heart_count on hearts INSERT/DELETE
-- ============================================================

CREATE OR REPLACE FUNCTION update_heart_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE kudos SET heart_count = heart_count + 1 WHERE id = NEW.kudo_id;
    UPDATE user_profiles SET heart_received_count = heart_received_count + NEW.multiplier
      WHERE user_id = (SELECT sender_id FROM kudos WHERE id = NEW.kudo_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE kudos SET heart_count = GREATEST(heart_count - 1, 0) WHERE id = OLD.kudo_id;
    UPDATE user_profiles SET heart_received_count = GREATEST(heart_received_count - OLD.multiplier, 0)
      WHERE user_id = (SELECT sender_id FROM kudos WHERE id = OLD.kudo_id);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER heart_count_trigger
  AFTER INSERT OR DELETE ON hearts
  FOR EACH ROW EXECUTE FUNCTION update_heart_count();

-- ============================================================
-- 6. RLS Policies (enable on ALL tables)
-- ============================================================

-- kudos
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudos_select" ON kudos FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudos_insert" ON kudos FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- kudo_hashtags
ALTER TABLE kudo_hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudo_hashtags_select" ON kudo_hashtags FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudo_hashtags_insert" ON kudo_hashtags FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- kudo_images
ALTER TABLE kudo_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudo_images_select" ON kudo_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudo_images_insert" ON kudo_images FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- hearts
ALTER TABLE hearts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hearts_select" ON hearts FOR SELECT TO authenticated USING (true);
CREATE POLICY "hearts_insert" ON hearts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "hearts_delete" ON hearts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select" ON user_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- secret_boxes
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "boxes_select" ON secret_boxes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "boxes_update" ON secret_boxes FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- reference tables + special_days
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hashtags_select" ON hashtags FOR SELECT TO authenticated USING (true);
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "departments_select" ON departments FOR SELECT TO authenticated USING (true);
ALTER TABLE special_days ENABLE ROW LEVEL SECURITY;
CREATE POLICY "special_days_select" ON special_days FOR SELECT TO authenticated USING (true);
