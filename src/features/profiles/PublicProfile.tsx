"use client";

import { Send, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/field";
import { categoryLabels, getProfileByUsername, getTechnicalId, registerProfileView, submitAnonymousMessage } from "@/lib/local-store";
import { messageSchema } from "@/schemas/message";
import type { MessageCategory, Profile } from "@/types/domain";

export function PublicProfile({ username }: { username: string }) {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<MessageCategory>("crush");
  const [confirmed, setConfirmed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const loaded = getProfileByUsername(username);
    setProfile(loaded);
    if (loaded) {
      registerProfileView(loaded.id);
    }
  }, [username]);

  const categories = useMemo(() => Object.entries(categoryLabels).filter(([key]) => profile?.allowOtherCategory || key !== "outro_positivo"), [profile]);

  if (!profile) {
    return <StateCard title="Caixa inexistente" message="Essa caixa não existe, foi removida ou ainda não foi criada." />;
  }

  if (!profile.isPublic) {
    return <StateCard title="Perfil privado" message="Essa pessoa deixou a caixa privada no momento." />;
  }

  if (profile.isPaused) {
    return <StateCard title="Caixa pausada" message="Essa pessoa pausou temporariamente o recebimento de mensagens." />;
  }

  function onSubmit() {
    const parsed = messageSchema.safeParse({ content, category, safetyConfirmation: confirmed });
    if (!parsed.success) {
      setFeedback(parsed.error.issues[0]?.message ?? "Revise a mensagem antes de enviar.");
      return;
    }

    const result = submitAnonymousMessage({ username, content, category, technicalId: getTechnicalId() });
    setFeedback(result.userMessage);
    setSent(result.ok);
    if (result.ok) {
      setContent("");
      setConfirmed(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-12">
      <Card className="text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violetDeep to-roseSoft text-2xl font-black">
          {profile.avatarUrl ? <span aria-hidden="true" className="size-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${profile.avatarUrl})` }} /> : profile.displayName.slice(0, 1)}
        </div>
        <p className="mt-4 text-sm text-slateText">@{profile.username}</p>
        <h1 className="mt-2 text-3xl font-bold">{profile.displayName}</h1>
        <p className="mt-4 text-lg leading-8 text-mist">{profile.promptText}</p>
      </Card>

      <Card className="mt-5">
        <div className="grid gap-4">
          <Field label="Categoria">
            <select className="focus-ring min-h-11 w-full rounded-lg border border-white/12 bg-night px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value as MessageCategory)}>
              {categories.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </Field>
          <Field label="Mensagem">
            <Textarea data-testid="public-message" aria-label="Mensagem" maxLength={500} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Escreva algo positivo, respeitoso e verdadeiro..." />
            {!profile.hideCounter ? <p className="text-right text-xs text-slateText">{content.length}/500</p> : null}
          </Field>
          <label className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.05] p-3 text-sm leading-6 text-slateText">
            <input data-testid="public-safety" className="mt-1" type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
            Confirmo que esta mensagem não contém ameaça, humilhação, acusação, informação privada ou conteúdo ofensivo.
          </label>
          <div className="rounded-lg border border-lilac/30 bg-lilac/10 p-3 text-sm leading-6 text-slateText">
            <ShieldCheck className="mb-2 text-lilac" size={18} /> Sua identidade não será exibida ao destinatário. Algumas informações técnicas podem ser armazenadas para segurança, prevenção de abuso e cumprimento de obrigações legais.
          </div>
          <Button onClick={onSubmit}><Send size={18} /> Enviar mensagem</Button>
          {feedback ? <p className={sent ? "text-sm text-success" : "text-sm text-danger"}>{feedback}</p> : null}
          {sent ? <LinkButton href="/signup" variant="secondary">Agora crie sua própria caixa secreta</LinkButton> : null}
        </div>
      </Card>
    </main>
  );
}

function StateCard({ title, message }: { title: string; message: string }) {
  return <main className="mx-auto flex min-h-screen max-w-lg items-center px-4"><Card><h1 className="text-2xl font-bold">{title}</h1><p className="mt-3 text-slateText">{message}</p><LinkButton className="mt-6" href="/signup">Criar minha caixa</LinkButton></Card></main>;
}


