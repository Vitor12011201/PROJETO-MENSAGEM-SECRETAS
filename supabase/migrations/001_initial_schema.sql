create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-zA-Z0-9_-]{3,30}$'),
  display_name text not null,
  bio text,
  avatar_url text,
  prompt_text text not null default 'Tem alguma coisa que você nunca teve coragem de me dizer?',
  theme text not null default 'noite',
  is_public boolean not null default true,
  is_paused boolean not null default false,
  allow_custom_messages boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  category text not null,
  moderation_status text not null check (moderation_status in ('approved', 'rejected', 'needs_review')),
  moderation_score numeric not null default 0,
  moderation_reasons text[] not null default '{}',
  is_read boolean not null default false,
  is_favorite boolean not null default false,
  sender_hash text not null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  reporter_user_id uuid references auth.users(id) on delete set null,
  reason text not null,
  description text,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id) on delete set null
);

create table public.blocked_senders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  sender_hash text not null,
  reason text,
  created_at timestamptz not null default now(),
  unique(profile_id, sender_hash)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text,
  plan text not null default 'free',
  status text not null default 'free',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  anonymous_session_hash text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references public.messages(id) on delete set null,
  status text not null,
  score numeric not null,
  reasons text[] not null default '{}',
  provider text not null default 'local',
  created_at timestamptz not null default now()
);

create table public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

create table public.user_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null,
  version text not null,
  accepted_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index profiles_user_id_idx on public.profiles(user_id);
create index profiles_username_idx on public.profiles(username);
create index messages_recipient_idx on public.messages(recipient_profile_id, created_at desc) where deleted_at is null;
create index messages_sender_hash_idx on public.messages(sender_hash);
create index reports_status_idx on public.reports(status);
create index subscriptions_user_id_idx on public.subscriptions(user_id);
create index analytics_profile_event_idx on public.analytics_events(profile_id, event_type, created_at desc);
create index moderation_status_idx on public.moderation_logs(status, created_at desc);
create index user_roles_user_id_idx on public.user_roles(user_id);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(select 1 from public.user_roles where user_id = auth.uid() and role = 'admin');
$$;

alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
alter table public.blocked_senders enable row level security;
alter table public.subscriptions enable row level security;
alter table public.analytics_events enable row level security;
alter table public.moderation_logs enable row level security;
alter table public.admin_audit_logs enable row level security;
alter table public.user_roles enable row level security;
alter table public.user_consents enable row level security;

create policy "profiles are public when enabled" on public.profiles for select using (is_public = true or user_id = auth.uid() or public.is_admin());
create policy "users edit own profile" on public.profiles for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users insert own profile" on public.profiles for insert with check (user_id = auth.uid());

create policy "users read own messages" on public.messages for select using (exists(select 1 from public.profiles where profiles.id = messages.recipient_profile_id and profiles.user_id = auth.uid()) or public.is_admin());
create policy "users update own messages" on public.messages for update using (exists(select 1 from public.profiles where profiles.id = messages.recipient_profile_id and profiles.user_id = auth.uid()) or public.is_admin());
create policy "service inserts messages" on public.messages for insert with check (false);

create policy "users manage reports for own messages" on public.reports for all using (public.is_admin() or exists(select 1 from public.messages join public.profiles on profiles.id = messages.recipient_profile_id where messages.id = reports.message_id and profiles.user_id = auth.uid()));
create policy "users manage blocked senders" on public.blocked_senders for all using (public.is_admin() or exists(select 1 from public.profiles where profiles.id = blocked_senders.profile_id and profiles.user_id = auth.uid()));
create policy "users read own subscriptions" on public.subscriptions for select using (user_id = auth.uid() or public.is_admin());
create policy "admins read analytics" on public.analytics_events for select using (public.is_admin());
create policy "admins read moderation logs" on public.moderation_logs for select using (public.is_admin());
create policy "admins manage audit" on public.admin_audit_logs for all using (public.is_admin());
create policy "admins read roles" on public.user_roles for select using (user_id = auth.uid() or public.is_admin());
create policy "users read own consents" on public.user_consents for select using (user_id = auth.uid() or public.is_admin());
create policy "users insert own consents" on public.user_consents for insert with check (user_id = auth.uid());

