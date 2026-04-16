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
  ('h1000000-0000-0000-0000-000000000001', 'TeamPlayer'),
  ('h1000000-0000-0000-0000-000000000002', 'Innovation'),
  ('h1000000-0000-0000-0000-000000000003', 'Leadership'),
  ('h1000000-0000-0000-0000-000000000004', 'Dedication'),
  ('h1000000-0000-0000-0000-000000000005', 'Mentorship'),
  ('h1000000-0000-0000-0000-000000000006', 'Creativity'),
  ('h1000000-0000-0000-0000-000000000007', 'Communication'),
  ('h1000000-0000-0000-0000-000000000008', 'ProblemSolving'),
  ('h1000000-0000-0000-0000-000000000009', 'GoAboveAndBeyond'),
  ('h1000000-0000-0000-0000-000000000010', 'CustomerFocus')
ON CONFLICT DO NOTHING;

-- Test users in auth.users (Supabase auth)
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, confirmation_token, raw_app_meta_data, raw_user_meta_data)
VALUES
  ('a1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'alice@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '{"provider":"google","providers":["google"]}', '{"full_name":"Alice Nguyen","avatar_url":null}'),
  ('a1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'bob@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '{"provider":"google","providers":["google"]}', '{"full_name":"Bob Tran","avatar_url":null}'),
  ('a1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'charlie@sun-asterisk.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '{"provider":"google","providers":["google"]}', '{"full_name":"Charlie Le","avatar_url":null}')
ON CONFLICT (id) DO NOTHING;

-- Create identities for test users (required for Supabase auth)
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', '{"sub":"a1000000-0000-0000-0000-000000000001","email":"alice@sun-asterisk.com"}', 'email', now(), now(), now()),
  ('a1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', '{"sub":"a1000000-0000-0000-0000-000000000002","email":"bob@sun-asterisk.com"}', 'email', now(), now(), now()),
  ('a1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', '{"sub":"a1000000-0000-0000-0000-000000000003","email":"charlie@sun-asterisk.com"}', 'email', now(), now(), now())
ON CONFLICT DO NOTHING;

-- User profiles
INSERT INTO user_profiles (user_id, department_id, display_name, star_level, kudo_received_count, kudo_sent_count, heart_received_count) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'Alice Nguyen', 1, 12, 5, 8),
  ('a1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000002', 'Bob Tran', 0, 3, 2, 1),
  ('a1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000003', 'Charlie Le', 2, 25, 10, 15)
ON CONFLICT DO NOTHING;

-- A sample kudo
INSERT INTO kudos (id, sender_id, receiver_id, message, category, is_anonymous, heart_count) VALUES
  ('k1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', '<p>Cam on Bob da ho tro minh trong du an vua roi! Ban la nguoi dong doi tuyet voi.</p>', 'Nguoi dong doi tuyet voi', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO kudo_hashtags (kudo_id, hashtag_id) VALUES
  ('k1000000-0000-0000-0000-000000000001', 'h1000000-0000-0000-0000-000000000001'),
  ('k1000000-0000-0000-0000-000000000001', 'h1000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;
