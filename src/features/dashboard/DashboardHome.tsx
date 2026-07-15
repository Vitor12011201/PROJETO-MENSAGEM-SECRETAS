"use client";

import { Copy, QrCode, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useState } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getCurrentSubscription, getPlanLimitLabel, getState, getVisibleMessagesForCurrentUser } from "@/lib/local-store";
import { absoluteUrl } from "@/lib/utils";

export function DashboardHome() {
  const [copied, setCopied] = useState(false);
  const profile = getCurrentProfile();
  const subscription = getCurrentSubscription();
  const messages = getVisibleMessagesForCurrentUser();
  const state = getState();
  const publicUrl = profile ? absoluteUrl(`/v/${profile.username}`) : "";
  const stats = useMemo(() => ({
    total: messages.length,
    unread: messages.filter((message) => !message.isRead).length,
    favorites: messages.filter((message) => message.isFavorite).length,
    views: state.analyticsEvents.filter((event) => event.profileId === profile?.id && event.eventType === "profile_view").length,
    shares: state.analyticsEvents.filter((event) => event.profileId === profile?.id && event.eventType === "share_click").length
  }), [messages, profile?.id, state.analyticsEvents]);

  if (!profile) {
    return <Card><h1 className="text-2xl font-bold">Sua caixa ainda não existe</h1><p className="mt-2 text-slateText">Finalize o onboarding para gerar seu link público.</p><LinkButton className="mt-5" href="/onboarding">Configurar caixa</LinkButton></Card>;
  }

  async function copyLink() {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
  }

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm text-lilac">Painel</p>
        <h1 className="text-3xl font-bold">Olá, {profile.displayName}</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <Metric label="Mensagens" value={stats.total} /><Metric label="No lidas" value={stats.unread} /><Metric label="Favoritas" value={stats.favorites} /><Metric label="Visualizaes" value={stats.views} /><Metric label="Compartilhamentos" value={stats.shares} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <Card>
          <p className="text-sm text-slateText">Link público</p>
          <p className="mt-2 break-all text-lg font-semibold">{publicUrl}</p>
          <div className="mt-5 flex flex-wrap gap-3"><Button onClick={copyLink}><Copy size={18} /> {copied ? "Copiado" : "Copiar link"}</Button><Button variant="secondary"><Share2 size={18} /> Compartilhar</Button><LinkButton variant="secondary" href={publicUrl}>Abrir caixa</LinkButton></div>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-3"><QrCode className="text-lilac" /><QRCodeSVG value={publicUrl} bgColor="transparent" fgColor="#F8FAFC" /><p className="text-center text-xs text-slateText">QR Code do perfil</p></Card>
      </div>
      <Card id="stats"><h2 className="text-xl font-bold">Plano atual</h2><p className="mt-2 text-slateText">{subscription?.plan === "pro" ? "Pro" : "Gratuito"}  limite: {getPlanLimitLabel(subscription?.plan ?? "free")}</p><LinkButton className="mt-4" href="/dashboard/subscription">Gerenciar assinatura</LinkButton></Card>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <Card><p className="text-sm text-slateText">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></Card>;
}

