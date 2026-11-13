begin;

-- The old active-profile policy made every profile column readable through the
-- public Supabase REST API, including CV text, CV storage paths and coordinates.
drop policy if exists "Allow reading public profile candidates" on public.profiles;
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

-- Expose only profile fields needed by a user after an introduction or thread
-- exists. Never expose CV files/text, exact coordinates, names, or preferences.
create or replace view public.public_profiles
with (security_barrier = true)
as
select
  p.id,
  p.codename,
  p.city,
  p.country,
  p.age,
  p.gender,
  p.intent,
  p.skill_tags,
  p.interests,
  p.industry,
  p.education_level,
  case when p.folio_score > 0 then p.prompts else '[]'::jsonb end as prompts,
  p.folio_score,
  p.is_active,
  p.languages,
  case when exists (
    select 1 from public.threads t
    where t.day_count >= 7
      and ((t.user_a = auth.uid() and t.user_b = p.id)
        or (t.user_b = auth.uid() and t.user_a = p.id))
  ) then p.first_name else null end as first_name
from public.profiles p
where p.is_active = true
  and (
    p.id = auth.uid()
    or exists (
      select 1 from public.daily_matches dm
      where (dm.user_id = auth.uid() and dm.matched_user_id = p.id)
         or (dm.matched_user_id = auth.uid() and dm.user_id = p.id)
    )
    or exists (
      select 1 from public.threads t
      where (t.user_a = auth.uid() and t.user_b = p.id)
         or (t.user_b = auth.uid() and t.user_a = p.id)
    )
  );

revoke all on public.public_profiles from anon;
grant select on public.public_profiles to authenticated;

-- CV files stay in a private bucket, and each account can access only its own
-- folder. The upload endpoint writes paths as <user-id>/<random-file>.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cvs',
  'cvs',
  false,
  10485760,
  array['application/pdf', 'image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "CV owners can read their own files" on storage.objects;
create policy "CV owners can read their own files"
  on storage.objects for select to authenticated
  using (bucket_id = 'cvs' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "CV owners can upload their own files" on storage.objects;
create policy "CV owners can upload their own files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'cvs' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "CV owners can update their own files" on storage.objects;
create policy "CV owners can update their own files"
  on storage.objects for update to authenticated
  using (bucket_id = 'cvs' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'cvs' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "CV owners can delete their own files" on storage.objects;
create policy "CV owners can delete their own files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cvs' and (storage.foldername(name))[1] = auth.uid()::text);

-- User-facing access is read-only for introductions. Trusted matching writes
-- run on the server with SUPABASE_SERVICE_ROLE_KEY.
drop policy if exists "Users can view and manage their own matches" on public.daily_matches;
create policy "Users can view their own introductions"
  on public.daily_matches for select to authenticated
  using (auth.uid() = user_id or auth.uid() = matched_user_id);

-- Clients can read participant threads; all thread state changes go through
-- authenticated server handlers.
drop policy if exists "Thread participants access" on public.threads;
create policy "Thread participants can read"
  on public.threads for select to authenticated
  using (auth.uid() = user_a or auth.uid() = user_b);

-- Messages are readable by thread participants. A user may only insert their
-- own message into a thread they belong to; editing/deleting is not allowed.
drop policy if exists "Thread participants can view and send messages" on public.messages;
create policy "Thread participants can read messages"
  on public.messages for select to authenticated
  using (
    exists (
      select 1 from public.threads t
      where t.id = messages.thread_id
        and (t.user_a = auth.uid() or t.user_b = auth.uid())
    )
  );
create policy "Participants can send their own messages"
  on public.messages for insert to authenticated
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.threads t
      where t.id = messages.thread_id
        and t.status = 'active'
        and (t.user_a = auth.uid() or t.user_b = auth.uid())
    )
  );

-- Matching feedback and weights are private to their owner.
drop policy if exists "Users can view and update their own weights" on public.user_weights;
create policy "Users can read their own weights"
  on public.user_weights for select to authenticated
  using (auth.uid() = user_id);
drop policy if exists "Users can view and insert their own signals" on public.algo_signals;
create policy "Users can read their own signals"
  on public.algo_signals for select to authenticated
  using (auth.uid() = user_id);

commit;
