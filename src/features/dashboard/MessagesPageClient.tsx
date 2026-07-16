"use client";

import { Ban, Download, Flag, Heart, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blockSender, categoryLabels, deleteMessage, getVisibleMessagesForCurrentUser, reportMessage, toggleFavorite } from "@/lib/local-store";
import { formatDate } from "@/lib/utils";
import type { MessageCategory } from "@/types/domain";

const filters = ["todas", "nao_lidas", "favoritas", "denunciadas"] as const;

export function MessagesPageClient() {
  const [, setVersion] = useState(0);
  const [filter, setFilter] = useState<(typeof filters)[number]>("todas");
  const [category, setCategory] = useState<MessageCategory | "">("");
  const messages = getVisibleMessagesForCurrentUser();
  const visible = messages.filter((message) => {
    if (filter === "nao_lidas" && message.isRead) return false;
    if (filter === "favoritas" && !message.isFavorite) return false;
    if (filter === "denunciadas" && !message.isReported) return false;
    if (category && message.category !== category) return false;
    return true;
  });
  function refresh(action: () => void) {
    action();
    setVersion((value) => value + 1);
  }

  return (
    <main className="space-y-6">
      <div><p className="text-sm text-lilac">Caixa de mensagens</p><h1 className="text-2xl font-bold leading-tight sm:text-3xl">Mensagens recebidas</h1></div>
      <Card className="grid gap-3 sm:flex sm:flex-wrap">
        {filters.map((item) => <Button key={item} className="min-h-11 w-full sm:w-auto" variant={filter === item ? "primary" : "secondary"} onClick={() => setFilter(item)}>{item.replace("nao_lidas", "não lidas")}</Button>)}
        <select className="focus-ring min-h-12 w-full rounded-xl border border-white/12 bg-night px-4 text-base sm:min-h-11 sm:w-auto sm:text-sm" value={category} onChange={(event) => setCategory(event.target.value as MessageCategory | "")}>
          <option value="">Todas as categorias</option>
          {Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </Card>
      {visible.length === 0 ? <Card><h2 className="text-xl font-bold">Nenhuma mensagem por aqui</h2><p className="mt-2 text-slateText">Quando alguém enviar uma mensagem aprovada ou em revisão, ela aparecerá aqui.</p></Card> : null}
      <div className="grid gap-4">
        {visible.map((message) => (
          <Card key={message.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-lilac">{categoryLabels[message.category]}</span><span className="ml-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slateText">{message.moderationStatus}</span></div>
              <p className="text-xs text-slateText">{formatDate(message.createdAt)}</p>
            </div>
            <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8">{message.content}</p>
            <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap">
              <Button className="min-h-11 w-full sm:w-auto" variant="secondary" onClick={() => refresh(() => toggleFavorite(message.id))}><Heart size={16} /> {message.isFavorite ? "Desfavoritar" : "Favoritar"}</Button>
              <Button className="min-h-11 w-full sm:w-auto" variant="secondary" onClick={() => refresh(() => reportMessage(message.id))}><Flag size={16} /> Denunciar</Button>
              <Button className="min-h-11 w-full sm:w-auto" variant="secondary" onClick={() => refresh(() => blockSender(message.id))}><Ban size={16} /> Bloquear remetente</Button>
              <Button className="min-h-11 w-full sm:w-auto" variant="secondary"><Share2 size={16} /> Compartilhar imagem</Button>
              <Button className="min-h-11 w-full sm:w-auto" variant="secondary"><Download size={16} /> Card visual</Button>
              <Button className="min-h-11 w-full sm:w-auto" variant="danger" onClick={() => refresh(() => deleteMessage(message.id))}><Trash2 size={16} /> Excluir</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}



