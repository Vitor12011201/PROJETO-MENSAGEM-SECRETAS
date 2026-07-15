-- Seed ilustrativo. Crie os usuários pelo Supabase Auth antes de associar UUIDs áreais.
insert into public.admin_audit_logs (action, target_type, metadata) values
('seed_created', 'system', '{"note":"Dados de demonstrao; não contm credenciais áreais."}');

