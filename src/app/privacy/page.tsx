import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  const items = [
    "A identidade do remetente não será exibida ao destinatário.",
    "Dados técnicos podem ser armazenados para segurança, prevenção de abuso e obrigações legais.",
    "O conteúdo da mensagem não deve ser registrado em analytics.",
    "Dados técnicos devem ter retenção configurável.",
    "Este texto precisa de revisão jurídica antes do lançamento em produção."
  ];

  return <><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-16"><Card><h1 className="text-3xl font-bold">Política de Privacidade</h1><p className="mt-4 text-slateText">Modelo inicial para o MVP.</p><ul className="mt-6 space-y-3 text-sm text-slateText">{items.map((item) => <li key={item}>{"\u2022"} {item}</li>)}</ul></Card></main><SiteFooter /></>;
}
