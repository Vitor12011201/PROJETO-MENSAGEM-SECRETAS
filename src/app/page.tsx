import { ArrowRight, Bell, Check, Heart, Lock, Mail, MessageCircle, ShieldAlert, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const curiosityCards = [
  {
    title: "Alguém tem um crush em você?",
    text: "Talvez exista alguém esperando uma oportunidade para se declarar.",
    icon: Heart,
    color: "text-pinkSoft"
  },
  {
    title: "Uma amizade sente sua falta?",
    text: "Algumas conversas só precisam de um pequeno empurrão para recomeçar.",
    icon: Users,
    color: "text-honey"
  },
  {
    title: "Você marcou a vida de alguém?",
    text: "Descubra elogios e agradecimentos que nunca chegaram até você.",
    icon: Sparkles,
    color: "text-coral"
  },
  {
    title: "Existe algo que precisam te contar?",
    text: "Abra espaço para pedidos de desculpas e palavras que ficaram guardadas.",
    icon: Mail,
    color: "text-success"
  }
];

const messageExamples = [
  ["Crush", "Eu gosto de você desde o começo do ano, mas nunca consegui falar pessoalmente.", Heart],
  ["Saudade", "Sinto falta da nossa amizade. Queria saber se ainda dá para conversar.", MessageCircle],
  ["Elogio", "Você não faz ideia do quanto sua presença deixa os dias das pessoas melhores.", Sparkles],
  ["Agradecimento", "Você me ajudou em uma fase difícil sem nem perceber.", Check],
  ["Desculpa", "Eu devia ter pedido desculpas há muito tempo.", Lock]
];

const steps = [
  ["Crie sua caixa", "Escolha seu nome, personalize a pergunta e receba um link exclusivo."],
  ["Compartilhe seu link", "Publique no Instagram, TikTok, WhatsApp ou envie diretamente para seus amigos."],
  ["Descubra o inesperado", "Receba elogios, confissões e tudo aquilo que nunca tiveram coragem de dizer na sua frente."]
];

const safetyItems = [
  "Pause o recebimento quando quiser.",
  "Bloqueie remetentes que ultrapassem os limites.",
  "Denuncie conteúdos inadequados.",
  "Mensagens passam por filtros de segurança.",
  "A identidade do remetente não é exibida ao destinatário."
];

const freeFeatures = ["Página pública", "Até 20 mensagens por mês", "Categorias básicas", "Compartilhamento do link", "Denúncia e bloqueio"];
const proFeatures = ["Mensagens ilimitadas", "Temas exclusivos", "Cards compartilháveis", "Efeitos ao abrir mensagens", "Música", "Estatísticas", "Caixa sem marca", "Agendamento"];

const faq = [
  ["As mensagens são realmente anônimas?", "A identidade não será exibida ao destinatário. Algumas informações técnicas podem ser armazenadas para segurança, prevenção de abuso e obrigações legais."],
  ["A pessoa consegue descobrir quem enviou?", "A interface nunca mostra IP, e-mail ou identificador técnico do remetente."],
  ["Posso bloquear mensagens?", "Sim. Você pode denunciar, excluir e bloquear o identificador técnico de um remetente sem saber quem ele é."]
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_48%_20%,rgba(255,61,127,0.20),transparent_32rem)]" />
          <div className="mx-auto grid min-h-[calc(100vh-70px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
            <div className="max-w-3xl space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-pinkSoft/25 bg-white/8 px-3 py-1.5 text-sm font-semibold text-pinkSoft shadow-[0_0_32px_rgba(255,61,127,0.18)]">
                <span aria-hidden="true">💌</span> Sua caixa secreta fica pronta em menos de 1 minuto
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-[40px] font-black leading-[0.98] tracking-normal text-mist sm:text-6xl lg:text-[66px]">
                  Descubra o que as pessoas <span className="bg-gradient-to-r from-pinkHot to-coral bg-clip-text text-transparent">nunca tiveram coragem</span> de te dizer.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slateText sm:text-xl">
                  Compartilhe seu link e receba confissões, elogios, pedidos de desculpas e mensagens secretas — sem revelar quem enviou.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <LinkButton href="/signup" className="min-h-[56px] rounded-2xl px-7 text-base sm:text-[17px] lg:w-full xl:w-auto">
                  Criar minha caixa grátis <ArrowRight size={20} />
                </LinkButton>
                <LinkButton href="/v/vitoria" variant="secondary" className="min-h-[56px] rounded-2xl px-7 text-base sm:text-[17px] lg:w-full xl:w-auto">
                  Ver uma caixa funcionando
                </LinkButton>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-slateText">Grátis para começar · sem cartão · você pode pausar quando quiser</p>
                <p className="max-w-xl text-base leading-7 text-mutedText">Talvez alguém esteja esperando uma oportunidade para falar com você.</p>
              </div>
            </div>
            <HeroMessagePreview />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black leading-tight text-mist sm:text-5xl">O que será que nunca te disseram?</h2>
            <p className="mt-4 text-lg leading-8 text-slateText">Algumas pessoas só precisam de uma forma mais fácil de falar.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {curiosityCards.map(({ title, text, icon: Icon, color }) => (
              <Card key={title} className="group min-h-[230px] transition duration-200 hover:-translate-y-1 hover:border-pinkSoft/35 hover:bg-cardElevated/80">
                <div className={`mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/8 ${color}`}><Icon size={22} /></div>
                <h3 className="text-xl font-black leading-snug text-mist">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slateText">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="border-y border-white/10 bg-midnight/70 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-pinkSoft">Como funciona</p>
                <h2 className="mt-3 text-3xl font-black text-mist sm:text-5xl">Sua caixa fica pronta em três passos</h2>
              </div>
              <LinkButton href="/signup" className="w-full min-h-[54px] rounded-2xl px-6 text-base sm:w-auto">Criar minha caixa grátis</LinkButton>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map(([title, text], index) => (
                <Card key={title} className={index === 2 ? "border-pinkSoft/45 bg-gradient-to-b from-cardElevated to-card shadow-rose" : undefined}>
                  <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pinkHot to-coral text-base font-black text-white">{index + 1}</div>
                  <h3 className="text-2xl font-black text-mist">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slateText">{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="exemplos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Exemplos</p>
            <h2 className="mt-3 text-3xl font-black text-mist sm:text-5xl">Mensagens que você pode receber</h2>
            <p className="mt-4 text-lg leading-8 text-slateText">Nunca dá para saber o que alguém está guardando.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:items-start">
            {messageExamples.map(([category, text, Icon], index) => (
              <Card key={category as string} className={`relative overflow-hidden p-4 ${index % 2 ? "lg:mt-8" : ""}`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-pinkSoft"><Icon size={14} />{category as string}</span>
                  <span className="size-2 rounded-full bg-success shadow-[0_0_18px_rgba(53,208,127,0.8)]" />
                </div>
                <p className="text-sm leading-6 text-mist">“{text as string}”</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="seguranca" className="border-y border-white/10 bg-midnight/70 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
            <div>
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success"><ShieldCheck /></div>
              <h2 className="text-3xl font-black text-mist sm:text-5xl">Sua caixa, suas regras</h2>
              <p className="mt-4 text-lg leading-8 text-slateText">Você decide quando receber mensagens e mantém o controle da experiência.</p>
              <p className="mt-5 max-w-md text-sm leading-6 text-mutedText">Algumas informações técnicas podem ser armazenadas para prevenir abusos e cumprir obrigações legais.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {safetyItems.map((item) => <Card key={item} className="flex gap-3"><Check className="mt-1 shrink-0 text-success" size={18} /><span className="text-sm leading-6 text-slateText">{item}</span></Card>)}
            </div>
          </div>
        </section>

        <section id="planos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-pinkSoft">Planos</p>
            <h2 className="mt-3 text-3xl font-black text-mist sm:text-5xl">Comece grátis. Personalize quando quiser.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card className="flex flex-col">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slateText">Gratuito</p>
              <p className="mt-3 text-4xl font-black text-mist">R$ 0</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slateText">
                {freeFeatures.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-success" />{feature}</li>)}
              </ul>
              <LinkButton className="mt-7 min-h-[54px] rounded-2xl text-base" href="/signup">Criar minha caixa grátis</LinkButton>
            </Card>
            <Card className="relative flex flex-col border-pinkSoft/55 bg-gradient-to-b from-cardElevated to-card shadow-rose">
              <span className="absolute right-5 top-5 rounded-full bg-honey px-3 py-1 text-xs font-black text-night">Mais popular</span>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-pinkSoft">Pro</p>
              <p className="mt-3 text-4xl font-black text-mist">R$ 9,90/mês</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slateText">
                {proFeatures.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-success" />{feature}</li>)}
              </ul>
              <LinkButton className="mt-7 min-h-[54px] rounded-2xl text-base" href="/pricing">Desbloquear minha caixa completa</LinkButton>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-mist">Perguntas comuns</h2>
          <div className="mt-8 space-y-4">
            {faq.map(([question, answer]) => <Card key={question}><h3 className="font-bold text-mist">{question}</h3><p className="mt-2 text-sm leading-6 text-slateText">{answer}</p></Card>)}
          </div>
          <div className="mt-8 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm leading-6 text-slateText"><ShieldAlert className="mb-2 text-danger" /> Não use a plataforma para acusações, ameaças, perseguição, exposição ou humilhação.</div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-pinkSoft/25 bg-gradient-to-br from-cardElevated via-midnight to-night p-8 text-center shadow-rose sm:p-12">
            <div className="absolute left-1/2 top-0 -z-0 size-72 -translate-x-1/2 rounded-full bg-pinkHot/20 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl space-y-5">
              <h2 className="text-3xl font-black leading-tight text-mist sm:text-5xl">Talvez alguém esteja esperando uma chance de falar com você.</h2>
              <p className="text-lg leading-8 text-slateText">Crie sua caixa, compartilhe seu link e descubra o que nunca tiveram coragem de dizer.</p>
              <LinkButton href="/signup" className="min-h-[56px] rounded-2xl px-8 text-base sm:text-[17px]">Quero criar minha caixa grátis</LinkButton>
              <p className="text-sm font-medium text-mutedText">Leva menos de 1 minuto.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function HeroMessagePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[430px] lg:mr-0">
      <div className="absolute -left-4 top-10 hidden animate-float rounded-2xl border border-white/10 bg-card/90 px-4 py-3 text-sm font-bold text-mist shadow-soft backdrop-blur md:block">+1 nova mensagem</div>
      <div className="absolute -right-3 top-28 hidden animate-float rounded-2xl border border-white/10 bg-card/90 px-4 py-3 text-sm text-slateText shadow-soft backdrop-blur [animation-delay:1.2s] md:block">Alguém enviou um elogio</div>
      <div className="absolute -bottom-4 left-7 hidden animate-float rounded-2xl border border-white/10 bg-card/90 px-4 py-3 text-sm text-slateText shadow-soft backdrop-blur [animation-delay:2s] md:block">Sua caixa foi compartilhada</div>
      <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-gradient-to-b from-cardElevated to-card p-4 shadow-[0_32px_110px_rgba(255,61,127,0.25)]">
        <div className="rounded-[28px] border border-white/10 bg-night/80 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-pinkSoft">Caixa secreta</p>
              <h2 className="mt-1 text-xl font-black text-mist">Você recebeu 3 mensagens secretas</h2>
            </div>
            <div className="relative flex size-11 items-center justify-center rounded-2xl bg-pinkHot/15 text-pinkSoft">
              <Bell size={20} />
              <span className="absolute right-2 top-2 size-2.5 animate-pulse-soft rounded-full bg-success" />
            </div>
          </div>
          <div className="space-y-3">
            <PreviewBubble category="Crush" text="Tenho vontade de falar com você há meses." />
            <PreviewBubble category="Saudade" text="Sinto falta da nossa amizade." muted />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <div className="blur-[2px]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-honey">Elogio</p>
                <p className="mt-2 text-sm leading-6 text-mist">Você é mais importante para mim do que imagina.</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-night/38 backdrop-blur-[1px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-mist"><Lock size={16} /> Toque para revelar</span>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-gradient-to-r from-pinkHot to-coral p-4 text-sm font-bold text-white">Sua identidade não será exibida ao destinatário.</div>
        </div>
      </div>
    </div>
  );
}

function PreviewBubble({ category, text, muted = false }: { category: string; text: string; muted?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.06] p-4 ${muted ? "ml-5" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-pinkSoft">{category}</p>
      <p className="mt-2 text-sm leading-6 text-mist">{text}</p>
    </div>
  );
}
