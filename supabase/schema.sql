-- ==============================================================================
-- FOLIO DATABASE SCHEMA (PostgreSQL / Supabase)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists profiles (
  id uuid references auth.users primary key,
  codename text unique not null,
  first_name text,
  city text,
  intent text[] default '{}', -- ['dating','friends','collab','mentor']
  cv_url text,
  cv_text text,
  skill_tags text[] default '{}',
  prompts jsonb default '[]', -- [{question, answer}]
  voice_note_url text,
  folio_score int default 0,
  is_active bool default true,
  
  -- Demographics & Preferences
  age int,
  gender text, -- 'man','woman','non-binary','prefer-not'
  languages text[] default '{}',
  country text default 'United Kingdom',
  region text,
  latitude float,
  longitude float,
  preferred_age_min int default 18,
  preferred_age_max int default 60,
  preferred_genders text[] default '{}',
  max_distance_km int default 100,
  industry text,
  education_level text, -- 'high-school','bachelors','masters','phd'
  interests text[] default '{}',
  
  created_at timestamptz default now()
);

-- 2. Daily Matches Table (4 per user per day)
create table if not exists daily_matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  matched_user_id uuid references profiles(id) on delete cascade,
  match_date date default current_date,
  expires_at timestamptz default now() + interval '24 hours',
  user_decision text, -- 'continue' | 'pass' | null
  matched_user_decision text, -- 'continue' | 'pass' | null
  status text default 'pending', -- 'pending' | 'spark' | 'passed' | 'expired'
  match_score float default 50.0,
  match_reasons text[] default '{}',
  feedback_signal text, -- 'strong_yes' | 'yes' | 'no' | 'strong_no'
  created_at timestamptz default now()
);

-- 3. Threads Table (Progressive 30-day connection ladder)
create table if not exists threads (
  id uuid primary key default gen_random_uuid(),
  user_a uuid references profiles(id) on delete cascade,
  user_b uuid references profiles(id) on delete cascade,
  day_count int default 0,
  streak int default 0,
  status text default 'active', -- 'active' | 'permanent' | 'ended'
  user_a_confirmed bool default false,
  user_b_confirmed bool default false,
  last_confirmed_date date,
  created_at timestamptz default now()
);

-- 4. Messages Table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- 5. Reveals Table (Unlock milestones log)
create table if not exists reveals (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  day int not null,
  reveal_type text not null, -- 'first_name' | 'photo' | 'full_name' | 'full_cv' | 'social_hint'
  unlocked_at timestamptz default now()
);

-- 6. User Dynamic Weights (Self-improving machine learning weights per user)
create table if not exists user_weights (
  user_id uuid references profiles(id) on delete cascade primary key,
  w_age float default 1.0,
  w_gender float default 1.0,
  w_distance float default 1.0,
  w_language float default 1.5,
  w_intent float default 2.0,
  w_skills float default 1.0,
  w_industry float default 1.0,
  w_education float default 0.5,
  w_interests float default 1.0,
  w_activity float default 1.0,
  updated_at timestamptz default now()
);

-- 7. Global Algorithm Signals Tracking (For Reinforcement Learning)
create table if not exists algo_signals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  matched_user_id uuid references profiles(id) on delete cascade,
  match_score float,
  outcome text, -- 'spark','thread_7d','thread_30d','permanent','passed','expired','pending'
  feature_vector jsonb,
  created_at timestamptz default now()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
create index if not exists idx_profiles_active on profiles(is_active);
create index if not exists idx_profiles_country on profiles(country);
create index if not exists idx_daily_matches_user_date on daily_matches(user_id, match_date);
create index if not exists idx_threads_users on threads(user_a, user_b);
create index if not exists idx_messages_thread on messages(thread_id, created_at);
create index if not exists idx_reveals_thread on reveals(thread_id);

-- ==============================================================================
-- PUBLIC PROFILE VIEW
-- ==============================================================================
create or replace view public_profiles as
select 
  id,
  codename,
  city,
  country,
  age,
  gender,
  intent,
  skill_tags,
  interests,
  industry,
  education_level,
  case when folio_score > 0 then prompts else '[]'::jsonb end as prompts,
  folio_score,
  is_active
from profiles 
where is_active = true;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table profiles enable row level security;
alter table daily_matches enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table reveals enable row level security;
alter table user_weights enable row level security;
alter table algo_signals enable row level security;

-- Profiles Policies
create policy "Users can read own profile" 
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile" 
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile" 
  on profiles for insert with check (auth.uid() = id);

create policy "Allow reading public profile candidates" 
  on profiles for select using (is_active = true);

-- Daily Matches Policies
create policy "Users can view and manage their own matches"
  on daily_matches for all using (auth.uid() = user_id or auth.uid() = matched_user_id);

-- Threads Policies
create policy "Thread participants access"
  on threads for all using (auth.uid() = user_a or auth.uid() = user_b);

-- Messages Policies
create policy "Thread participants can view and send messages"
  on messages for all using (
    exists (
      select 1 from threads 
      where threads.id = messages.thread_id 
        and (threads.user_a = auth.uid() or threads.user_b = auth.uid())
    )
  );

-- Reveals Policies
create policy "Thread participants can view reveals"
  on reveals for select using (
    exists (
      select 1 from threads 
      where threads.id = reveals.thread_id 
        and (threads.user_a = auth.uid() or threads.user_b = auth.uid())
    )
  );

-- User Weights Policies
create policy "Users can view and update their own weights"
  on user_weights for all using (auth.uid() = user_id);

-- Algo Signals Policies
create policy "Users can view and insert their own signals"
  on algo_signals for all using (auth.uid() = user_id);

-- Enable Realtime publication on messages
alter publication supabase_realtime add table messages;
