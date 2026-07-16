"use client";

import { Check, ShieldAlert, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAdminMetrics, getCurrentUser, getState, resolveReport, reviewMessage } from "@/lib/local-store";

export function AdminPageClient() {
  const router = useRouter();
  const [version, setVersion] = useState(0);
  const user = getCurrentUser();
  const state = getState();
  const metrics = getAdminMetrics();

  useEffect(() => {
    if (!user) router.push("/login");
    if (user && user.role !== "admin") router.push("/dashboard");
  }, [router, user]);

  if (!user || user.role !== "admin") {
    return <main className="px-4 py-16 text-center text-slateText">Verificando acesso administrativo...</main>;
  }

  function refresh(action: () => void) {
    action();
    setVersion((value) => value + 1);
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div><p className="text-sm text-lilac">Admin</p><h1 className="text-2xl font-bold leading-tight sm:text-3xl">Painel administrativo</h1></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {Object.entries(metrics).map(([key, value]) => <Card key={key}><p className="text-xs uppercase text-slateText">{key}</p><p className="mt-2 text-2xl font-black">{typeof value === "number" ? value.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) : value}</p></Card>)}
      </div>
      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold">Mensagens em revisão</h2>
          <div className="mt-4 space-y-3">{state.messages.filter((message) => message.moderationStatus === "needs_review").map((message) => <div key={`${message.id}-${version}`} className="rounded-lg border border-white/10 p-3"><p className="text-sm text-slateText">Score {message.moderationScore}  {message.moderationReasons.join(", ")}</p><p className="mt-2">{message.content}</p><div className="mt-3 grid gap-2 sm:flex"><Button className="min-h-11 w-full sm:w-auto" onClick={() => refresh(() => reviewMessage(message.id, "approved"))}><Check size={16} /> Aprovar</Button><Button className="min-h-11 w-full sm:w-auto" variant="danger" onClick={() => refresh(() => reviewMessage(message.id, "rejected"))}><Trash2 size={16} /> Remover</Button></div></div>)}</div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">Denúncias abertas</h2>
          <div className="mt-4 space-y-3">{state.reports.filter((report) => report.status === "open").map((report) => <div key={`${report.id}-${version}`} className="rounded-lg border border-white/10 p-3"><p className="text-sm text-slateText">{report.reason}</p><p className="mt-2">Mensagem: {report.messageId}</p><Button className="mt-3 min-h-11 w-full sm:w-auto" variant="secondary" onClick={() => refresh(() => resolveReport(report.id))}><ShieldAlert size={16} /> Marcar como resolvida</Button></div>)}</div>
        </Card>
      </section>
      <Card><h2 className="text-xl font-bold">Auditoria administrativa</h2><p className="mt-2 text-slateText">As aes administrativas so estruturadas na migration `admin_audit_logs`; o modo local registra a mudana visualmente nesta tela.</p></Card>
    </main>
  );
}

