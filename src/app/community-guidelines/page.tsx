import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Card } from "@/components/ui/card";

export default function GuidelinesPage() {
  const forbidden = ["ameaa", "perseguição", "assdio", "bullying", "discurso de dio", "conteúdo sexual envolvendo menores", "exposição de dados pessoais", "acusações não verificadas", "difamao", "chantagem", "spam", "uso para humilhar ou constranger"];
  return <><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-16"><Card><h1 className="text-3xl font-bold">Diretrizes da Comunidade</h1><p className="mt-4 text-slateText">Mensagens devem ser positivas, respeitosas e consentidas.</p><div className="mt-6 flex flex-wrap gap-2">{forbidden.map((item) => <span key={item} className="rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-sm text-red-100">{item}</span>)}</div></Card></main><SiteFooter /></>;
}

