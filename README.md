# Nunca Te Disse

MVP funcional de um SaaS de mensagens anônimas consentidas. A primeira versão permite criar uma caixa pública, compartilhar o link, receber mensagens, moderar conteúdo, visualizar o painel, denunciar, excluir, bloquear remetentes, testar upgrade Pro em modo mock e acessar um painel administrativo básico.

## Stack

- Next.js App Router
- TypeScript em modo estrito
- React
- Tailwind CSS
- Componentes no estilo shadcn/ui
- Zod
- React Hook Form
- Supabase preparado por migrations e variáveis de ambiente
- Mercado Pago preparado por `paymentProvider`
- Vitest
- Playwright

## Execução local

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha quando for conectar serviços reais.

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_WEBHOOK_SECRET=
PAYMENT_PROVIDER=mock
TECHNICAL_DATA_RETENTION_DAYS=90
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` ou tokens do Mercado Pago no frontend.

## Credenciais fictícias do seed local

- Gratuito: `gratis@demo.local` / `Senha123!`
- Pro: `pro@demo.local` / `Senha123!`
- Admin: `admin@demo.local` / `Admin123!`

Perfis públicos de demonstração:

- `/v/vitoria`
- `/v/vitor`

## Banco de dados

A migration está em `supabase/migrations/001_initial_schema.sql` e cria:

- `profiles`
- `messages`
- `reports`
- `blocked_senders`
- `subscriptions`
- `analytics_events`
- `moderation_logs`
- `admin_audit_logs`
- `user_roles`
- `user_consents`

Também inclui índices e políticas RLS essenciais. Inserções públicas de mensagem devem passar por endpoint seguro com service role no backend; não confie no frontend para autorização.

## Mercado Pago

A integração real fica atrás da abstração `paymentProvider`:

- `createCheckout`
- `getSubscription`
- `cancelSubscription`
- `handleWebhook`

No desenvolvimento local, `MockPaymentProvider` simula checkout, webhook e ativação Pro. Em produção, implemente um provider Mercado Pago real e valide liberação Pro apenas pelo backend/webhook.

## Comandos

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run check:copy
```

## Segurança e moderação

O MVP inclui filtros locais para ameaça, perseguição, chantagem, discurso de ódio, conteúdo sexual explícito, telefone, CPF, endereço, acusações, violência, humilhação, bullying, links e spam. O serviço retorna `approved`, `rejected` ou `needs_review`, com categorias, pontuação de risco, motivo interno e mensagem segura para o usuário.

A interface nunca exibe IP, e-mail, hash ou identificador técnico do remetente ao destinatário.

## Limitações atuais

- Supabase Auth ainda está preparado, mas o modo local usa `localStorage` para permitir testar sem credenciais.
- Pagamentos reais do Mercado Pago ainda precisam de credenciais e provider real.
- CAPTCHA está preparado como requisito de arquitetura, mas ainda não conectado a um provedor.
- Textos legais são modelos iniciais e exigem revisão jurídica antes do lançamento.
- Compartilhamento de mensagem como imagem está representado na interface; a geração real do arquivo pode ser implementada com canvas/OG image.

## Próximos passos

1. Conectar Supabase Auth e trocar o repositório local por chamadas seguras ao backend.
2. Implementar provider real do Mercado Pago e validar webhooks assinados.
3. Adicionar CAPTCHA e moderação externa opcional.
4. Implementar geração real de imagem compartilhável.
5. Completar auditoria administrativa persistente.
6. Revisar textos legais com advogado.
