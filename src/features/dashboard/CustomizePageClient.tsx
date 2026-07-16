"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { getCurrentProfile, themeLabels, updateProfileSettings } from "@/lib/local-store";
import type { ThemeName } from "@/types/domain";

export function CustomizePageClient() {
  const profile = getCurrentProfile();
  const [feedback, setFeedback] = useState("");
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");
  const [promptText, setPromptText] = useState(profile?.promptText ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl ?? "");
  const [theme, setTheme] = useState<ThemeName>(profile?.theme ?? "noite");
  const [isPublic, setIsPublic] = useState(profile?.isPublic ?? true);
  const [isPaused, setIsPaused] = useState(profile?.isPaused ?? false);
  const [allowOtherCategory, setAllowOtherCategory] = useState(profile?.allowOtherCategory ?? true);
  const [positivePresetOnly, setPositivePresetOnly] = useState(profile?.positivePresetOnly ?? false);
  const [hideCounter, setHideCounter] = useState(profile?.hideCounter ?? false);
  const [showUsernameOnShares, setShowUsernameOnShares] = useState(profile?.showUsernameOnShares ?? true);

  if (!profile) return <Card>Configure sua caixa primeiro.</Card>;
  const profileId = profile.id;

  function save() {
    const result = updateProfileSettings(profileId, { displayName, promptText, avatarUrl, theme, isPublic, isPaused, allowOtherCategory, positivePresetOnly, hideCounter, showUsernameOnShares });
    setFeedback(result.message);
  }

  return (
    <main className="space-y-6">
      <div><p className="text-sm text-lilac">Personalização</p><h1 className="text-2xl font-bold leading-tight sm:text-3xl">Ajuste sua caixa</h1></div>
      <Card className="grid gap-4">
        <Field label="Nome"><Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></Field>
        <Field label="Frase da caixa"><Textarea value={promptText} onChange={(event) => setPromptText(event.target.value)} /></Field>
        <Field label="Avatar"><Input value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} placeholder="https://..." /></Field>
        <Field label="Tema"><select className="focus-ring min-h-12 w-full rounded-xl border border-white/12 bg-night px-4 text-base sm:min-h-11 sm:text-sm" value={theme} onChange={(event) => setTheme(event.target.value as ThemeName)}>{Object.entries(themeLabels).map(([key, label]) => <option key={key} value={key}>{label}{key === "coracao" ? "  Pro" : ""}</option>)}</select></Field>
        <Toggle label="Caixa pública" checked={isPublic} onChange={setIsPublic} />
        <Toggle label="Pausar recebimento" checked={isPaused} onChange={setIsPaused} />
        <Toggle label="Permitir categoria Outro" checked={allowOtherCategory} onChange={setAllowOtherCategory} />
        <Toggle label="Permitir apenas mensagens positivas pr-definidas" checked={positivePresetOnly} onChange={setPositivePresetOnly} />
        <Toggle label="Ocultar contador" checked={hideCounter} onChange={setHideCounter} />
        <Toggle label="Mostrar username em compartilhamentos" checked={showUsernameOnShares} onChange={setShowUsernameOnShares} />
        <Button onClick={save}>Salvar personalização</Button>
        {feedback ? <p className="text-sm text-success">{feedback}</p> : null}
      </Card>
    </main>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 text-sm leading-6"><span>{label}</span><input className="size-5 shrink-0 accent-pinkHot" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /></label>;
}


