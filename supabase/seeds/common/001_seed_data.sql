-- ============================================================
-- Seed data for development
-- ============================================================

-- Departments
INSERT INTO departments (id, name, code) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Engineering', 'ENG'),
  ('d1000000-0000-0000-0000-000000000002', 'Design', 'DES'),
  ('d1000000-0000-0000-0000-000000000003', 'Product', 'PRD'),
  ('d1000000-0000-0000-0000-000000000004', 'Human Resources', 'HR'),
  ('d1000000-0000-0000-0000-000000000005', 'Marketing', 'MKT')
ON CONFLICT DO NOTHING;

-- Hashtags
INSERT INTO hashtags (id, name) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'TeamPlayer'),
  ('b1000000-0000-0000-0000-000000000002', 'Innovation'),
  ('b1000000-0000-0000-0000-000000000003', 'Leadership'),
  ('b1000000-0000-0000-0000-000000000004', 'Dedication'),
  ('b1000000-0000-0000-0000-000000000005', 'Mentorship'),
  ('b1000000-0000-0000-0000-000000000006', 'Creativity'),
  ('b1000000-0000-0000-0000-000000000007', 'Communication'),
  ('b1000000-0000-0000-0000-000000000008', 'ProblemSolving'),
  ('b1000000-0000-0000-0000-000000000009', 'GoAboveAndBeyond'),
  ('b1000000-0000-0000-0000-000000000010', 'CustomerFocus')
ON CONFLICT DO NOTHING;

-- Test users: created via Supabase Admin API after seed (see post-seed script)
-- We cannot INSERT directly into auth.users — GoTrue requires many non-NULL columns.
-- Instead, use the helper function below to create users via auth.users properly.

-- Helper: create auth user with all required fields set correctly
DO $$
DECLARE
  _users jsonb := '[
    {"id":"a1000000-0000-0000-0000-000000000001","email":"alice@sun-asterisk.com","password":"password123","name":"Alice Nguyen"},
    {"id":"a1000000-0000-0000-0000-000000000002","email":"bob@sun-asterisk.com","password":"password123","name":"Bob Tran"},
    {"id":"a1000000-0000-0000-0000-000000000003","email":"charlie@sun-asterisk.com","password":"password123","name":"Charlie Le"}
  ]';
  _user jsonb;
  _uid uuid;
BEGIN
  FOR _user IN SELECT * FROM jsonb_array_elements(_users)
  LOOP
    _uid := (_user->>'id')::uuid;

    -- Skip if user already exists
    IF EXISTS (SELECT 1 FROM auth.users WHERE id = _uid) THEN
      CONTINUE;
    END IF;

    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at, last_sign_in_at,
      confirmation_token, recovery_token, email_change, email_change_token_new,
      email_change_token_current, email_change_confirm_status, phone, phone_change,
      phone_change_token, reauthentication_token,
      raw_app_meta_data, raw_user_meta_data, is_sso_user
    ) VALUES (
      _uid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
      _user->>'email', extensions.crypt(_user->>'password', extensions.gen_salt('bf')),
      now(), now(), now(), now(),
      '', '', '', '', '', 0, NULL, '', '', '',
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('full_name', _user->>'name'),
      false
    );

    -- Create identity (required for email login)
    INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    VALUES (
      _uid, _uid, _uid::text,
      jsonb_build_object('sub', _uid::text, 'email', _user->>'email', 'email_verified', true),
      'email', now(), now(), now()
    );
  END LOOP;
END $$;

-- User profiles
-- Stats start at 0 — triggers auto-increment when kudos/hearts are created
INSERT INTO user_profiles (user_id, department_id, display_name, star_level, kudo_received_count, kudo_sent_count, heart_received_count) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'Alice Nguyen', 0, 0, 0, 0),
  ('a1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000002', 'Bob Tran', 0, 0, 0, 0),
  ('a1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000003', 'Charlie Le', 0, 0, 0, 0)
ON CONFLICT DO NOTHING;

-- A sample kudo
INSERT INTO kudos (id, sender_id, receiver_id, message, category, is_anonymous, heart_count) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', '<p>Cam on Bob da ho tro minh trong du an vua roi! Ban la nguoi dong doi tuyet voi.</p>', 'Nguoi dong doi tuyet voi', false, 0)
ON CONFLICT DO NOTHING;

INSERT INTO kudo_hashtags (kudo_id, hashtag_id) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001'),
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;
