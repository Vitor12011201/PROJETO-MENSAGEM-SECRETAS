"use client";

import { Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { deleteCurrentAccount, eraseCurrentUserMessages, exportCurrentUserData, getCurrentProfile, updateProfileSettings } from "@/lib/local-store";

export function SecurityPageClient() {
  const profile = getCurrentProfile();
  const [feedback, setFeedback] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [customWords, setCustomWords] = useState(profile?.customBlockedWords.join(", ") ?? "");
  const [strictModeration, setStrictModeration] = useState(profile?.strictModeration ?? false);
  const [mediumRiskNeedsReview, setMediumRiskNeedsReview] = useState(profile?.mediumRiskNeedsReview ?? true);
  const [isPaused, setIsPaused] = useState(profile?.isPaused ?? false);

  if (!profile) return <Card>Configure sua caixa primeiro.</Card>;
  const profileId = profile.id;

  function save() {
    const result = updateProfileSettings(profileId, { customBlockedWords: customWords.split(",").map((word) => word.trim()).filter(Boolean), strictModeration, mediumRiskNeedsReview, isPaused });
    setFeedback(result.message);
  }

  function downloadData() {
    const blob = new Blob([JSON.stringify(exportCurrentUserData(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "nunca-te-disse-dados.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="space-y-6">
      <div><p className="text-sm text-lilac">Segurança</p><h1 className="text-3xl font-bold">Controles da caixa</h1></div>
      <Card className="grid gap-4">
        <Toggle label="Pausar recebimento de mensagens" checked={isPaused} onChange={setIsPaused} />
        <Toggle label="Filtros mais rgidos" checked={strictModeration} onChange={setStrictModeration} />
        <Toggle label="Enviar risco médio para revisão" checked={mediumRiskNeedsReview} onChange={setMediumRiskNeedsReview} />
        <Field label="Palavras bloqueadas personalizadas" hint="Separe por vrgula."><Input value={customWords} onChange={(event) => setCustomWords(event.target.value)} /></Field>
        <Button onClick={save}>Salvar segurança</Button>
        {feedback ? <p className="text-sm text-success">{feedback}</p> : null}
      </Card>
      <Card className="grid gap-4">
        <h2 className="text-xl font-bold">Dados e conta</h2>
        <div className="flex flex-wrap gap-3"><Button variant="secondary" onClick={downloadData}><Download size={16} /> Baixar dados</Button><Button variant="danger" onClick={() => { eraseCurrentUserMessages(); setFeedback("Mensagens apagadas."); }}><Trash2 size={16} /> Apagar todas as mensagens</Button></div>
        <Field label="Excluir conta"><Input value={confirmText} onChange={(event) => setConfirmText(event.target.value)} placeholder="Digite EXCLUIR" /></Field>
        <Button variant="danger" onClick={() => setFeedback(deleteCurrentAccount(confirmText).message)}>Excluir conta</Button>
        <p className="text-sm text-slateText">Visualizao e encerramento de outras sesses ficam ativos quando Supabase Auth estiver conectado.</p>
      </Card>
    </main>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.05] p-3 text-sm"><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /></label>;
}


