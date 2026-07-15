import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Card } from "@/components/ui/card";

export default function SafetyPage() {
  const items = ["Filtro local antes de salvar mensagens.", "Rate limit por identificador técnico.", "Bloqueio de mensagens duplicadas.", "Denncia, exclusão e bloqueio de remetente.", "Preparao para CAPTCHA e moderação externa.", "Dados privados nunca aparecem para o destinatário."];
  return <><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-16"><Card><h1 className="text-3xl font-bold">Segurança</h1><p className="mt-4 text-slateText">A primeira verso foi desenhada para reduzir abuso e manter o consentimento não centro do produto.</p><ul className="mt-6 space-y-3 text-sm text-slateText">{items.map((item) => <li key={item}> {item}</li>)}</ul></Card></main><SiteFooter /></>;
}

