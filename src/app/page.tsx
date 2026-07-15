import { ArrowRight, Check, Lock, ShieldAlert, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { plans } from "@/config/plans";

const examples = [
  "Sempre achei seu sorriso lindo.",
  "Sinto falta da nossa amizade.",
  "Queria pedir desculpas.",
  "Tenho vontade de te chamar para sair.",
  "Você me ajudou mais do que imagina."
];

const faq = [
  ["As mensagens são realmente anônimas?", "A identidade não será exibida ao destinatário. Algumas informações técnicas podem ser armazenadas para segurança, prevenção de abuso e obrigações legais."],
  ["A pessoa consegue descobrir quem enviou?", "A interface nunca mostra IP, e-mail ou identificador técnico do remetente."],
  ["Posso bloquear mensagens?", "Sim. Você pode denunciar, excluir e bloquear o identificador técnico de um remetente sem saber quem ele é."],
  ["O que acontece com mensagens ofensivas?", "Elas podem ser bloqueadas automaticamente ou enviadas para revisão antes de aparecerem."],
  ["Preciso pagar?", "Não. O plano gratuito inclui uma caixa pública e limite mensal inicial."],
  ["Posso excluir minha conta?", "Sim. A área de segurança inclui exportação de dados e exclusão com confirmação."]
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-sm text-lilac">
              <Sparkles size={16} /> Mensagens anônimas consentidas
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-mist sm:text-6xl">Descubra o que nunca tiveram coragem de dizer para você.</h1>
              <p className="max-w-2xl text-lg leading-8 text-slateText">Crie sua caixa secreta, compartilhe o link e receba mensagens sem que a identidade do remetente seja exibida.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/signup">Criar minha caixa <ArrowRight size={18} /></LinkButton>
              <LinkButton href="#como-funciona" variant="secondary">Ver como funciona</LinkButton>
            </div>
          </div>
          <Card className="relative overflow-hidden p-0">
            <div className="border-b border-white/10 p-5">
              <p className="text-sm text-slateText">/v/vitoria</p>
              <h2 className="mt-2 text-2xl font-bold">Tem alguma coisa que você nunca teve coragem de me dizer?</h2>
            </div>
            <div className="space-y-4 p-5">
              {examples.slice(0, 3).map((example, index) => (
                <div key={example} className="rounded-lg border border-white/10 bg-white/[0.06] p-4" style={{ transform: `translateX(${index * 10}px)` }}>
                  <p className="text-sm text-slateText">Mensagem secreta</p>
                  <p className="mt-2 text-mist">{example}</p>
                </div>
              ))}
              <div className="rounded-lg bg-gradient-to-r from-violetDeep to-roseSoft p-4 text-sm font-semibold text-white">Sua identidade não será exibida ao destinatário.</div>
            </div>
          </Card>
        </section>

        <section id="como-funciona" className="border-y border-white/10 bg-white/[0.03] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">Como funciona</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["Crie sua página.", "Compartilhe seu link.", "Receba mensagens secretas."].map((item, index) => (
                <Card key={item}>
                  <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-violetDeep font-bold">{index + 1}</div>
                  <h3 className="text-xl font-semibold">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-slateText">Tudo acontece em uma caixa criada voluntariamente por quem quer receber mensagens.</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Exemplos de mensagens</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {examples.map((example) => <Card key={example} className="text-sm leading-6">“{example}”</Card>)}
          </div>
        </section>

        <section id="seguranca" className="border-y border-white/10 bg-white/[0.03] py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-success/15 text-success"><Lock /></div>
              <h2 className="text-3xl font-bold">Segurança desde o começo</h2>
              <p className="mt-4 text-slateText">A plataforma não promete anonimato absoluto. Ela protege a identidade na interface e mantém controles contra abuso.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "O destinatário escolhe receber mensagens.",
                "Mensagens ofensivas podem ser denunciadas.",
                "Usuários podem bloquear remetentes.",
                "Conteúdos proibidos são filtrados.",
                "A identidade não aparece para o destinatário.",
                "Informações técnicas podem ser armazenadas para segurança."
              ].map((item) => <Card key={item} className="flex gap-3"><Check className="mt-1 text-success" size={18} /><span className="text-sm leading-6 text-slateText">{item}</span></Card>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Planos</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {Object.values(plans).map((plan) => (
              <Card key={plan.id} className={plan.id === "pro" ? "border-lilac/70" : undefined}>
                <p className="text-sm uppercase text-lilac">{plan.name}</p>
                <p className="mt-2 text-3xl font-black">{plan.priceLabel}</p>
                <ul className="mt-6 space-y-3 text-sm text-slateText">
                  {plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="text-success" />{feature}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faq.map(([question, answer]) => <Card key={question}><h3 className="font-semibold">{question}</h3><p className="mt-2 text-sm leading-6 text-slateText">{answer}</p></Card>)}
          </div>
          <div className="mt-8 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-slateText"><ShieldAlert className="mb-2 text-danger" /> Não use a plataforma para acusações, ameaças, perseguição, exposição ou humilhação.</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
