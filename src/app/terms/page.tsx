import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return <LegalPage title="Termos de Uso" items={["Use apenas caixas criadas voluntariamente.", "Não envie ameaças, acusações, humilhação ou dados pessoais de terceiros.", "Mensagens podem ser filtradas, rejeitadas, revisadas ou removidas.", "Este modelo precisa de revisão jurídica antes do lançamento em produção."]} />;
}

function LegalPage({ title, items }: { title: string; items: string[] }) {
  return <><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-16"><Card><h1 className="text-3xl font-bold">{title}</h1><p className="mt-4 text-slateText">Modelo inicial para orientação do MVP. Revise com assessoria jurídica antes de publicar.</p><ul className="mt-6 space-y-3 text-sm text-slateText">{items.map((item) => <li key={item}>{"\u2022"} {item}</li>)}</ul></Card></main><SiteFooter /></>;
}
