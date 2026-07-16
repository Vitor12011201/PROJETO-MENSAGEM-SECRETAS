import type { LucideIcon } from "lucide-react";
import { ArrowRight, Ban, Check, ChevronDown, CirclePlay, Flag, Gift, Heart, Lock, PauseCircle, Send, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type IconCard = {
  title: string;
  text: string;
  icon: LucideIcon;
  tone: string;
};

type MessageExample = {
  category: string;
  text: string;
  icon: LucideIcon;
  tone: string;
};

const curiosityCards: IconCard[] = [
  {
    title: "Alguém tem um crush em você?",
    text: "Talvez exista alguém esperando uma oportunidade para se declarar.",
    icon: Heart,
    tone: "text-pinkSoft shadow-[0_0_34px_rgba(255,61,127,0.26)]"
  },
  {
    title: "Uma amizade sente sua falta?",
    text: "Algumas conversas só precisam de um pequeno empurrão para recomeçar.",
    icon: Users,
    tone: "text-[#B970FF] shadow-[0_0_34px_rgba(185,112,255,0.22)]"
  },
  {
    title: "Você marcou a vida de alguém?",
    text: "Descubra elogios e agradecimentos que nunca chegaram até você.",
    icon: Sparkles,
    tone: "text-honey shadow-[0_0_34px_rgba(255,209,102,0.22)]"
  },
  {
    title: "Existe algo que precisam te contar?",
    text: "Abra espaço para pedidos de desculpas e palavras que ficaram guardadas.",
    icon: Lock,
    tone: "text-coral shadow-[0_0_34px_rgba(255,118,87,0.22)]"
  }
];

const messageExamples: MessageExample[] = [
  { category: "Crush", text: "Eu gosto de você desde o começo do ano, mas nunca consegui falar pessoalmente.", icon: Heart, tone: "text-pinkSoft" },
  { category: "Saudade", text: "Sinto falta da nossa amizade. Queria saber se ainda dá para conversar.", icon: Users, tone: "text-[#B970FF]" },
  { category: "Elogio", text: "Você não faz ideia do quanto sua presença deixa os dias das pessoas melhores.", icon: Sparkles, tone: "text-honey" },
  { category: "Agradecimento", text: "Você me ajudou em uma fase difícil sem nem perceber.", icon: Gift, tone: "text-success" },
  { category: "Desculpa", text: "Eu devia ter pedido desculpas há muito tempo.", icon: Lock, tone: "text-[#6F8DFF]" }
];

const steps = [
  ["Crie sua caixa", "Escolha seu nome, personalize a pergunta e receba um link exclusivo."],
  ["Compartilhe seu link", "Publique no Instagram, TikTok, WhatsApp ou envie diretamente para seus amigos."],
  ["Descubra o inesperado", "Receba elogios, confissões e tudo aquilo que nunca tiveram coragem de dizer na sua frente."]
];

const safetyItems = [
  ["Pause o recebimento quando quiser.", PauseCircle],
  ["Bloqueie remetentes que ultrapassem os limites.", Ban],
  ["Denuncie conteúdos inadequados.", Flag],
  ["Mensagens passam por filtros de segurança.", ShieldCheck],
  ["A identidade do remetente não é exibida ao destinatário.", Lock]
] as const;

const freeFeatures = ["Página pública da sua caixa", "Até 20 mensagens por mês", "Categorias básicas", "Compartilhamento de link", "Denúncia e bloqueio"];
const proFeatures = ["Mensagens ilimitadas", "Temas exclusivos", "Cards compartilháveis", "Efeitos ao abrir mensagens", "Música na sua caixa", "Estatísticas completas", "Sua caixa sem marca", "Agendamento de mensagens"];

const faq = [
  "Como funciona o anonimato?",
  "Posso bloquear alguém?",
  "As mensagens são moderadas?",
  "Posso pausar o recebimento?",
  "O plano gratuito é realmente grátis?"
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <HeroGlow />
          <div className="mx-auto grid min-h-[calc(100vh-66px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-pinkSoft/45 bg-[#130C18]/80 px-3 py-1 text-[11px] font-black uppercase tracking-[0.05em] text-mist shadow-[0_0_30px_rgba(255,61,127,0.22)]">
                <span aria-hidden="true">💌</span> Sua caixa secreta fica pronta em menos de 1 minuto
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-[39px] font-black leading-[1.02] tracking-normal text-mist sm:text-6xl lg:text-[64px]">
                  Descubra o que as pessoas <span className="bg-gradient-to-r from-pinkHot via-pinkSoft to-coral bg-clip-text text-transparent">nunca tiveram coragem de te dizer.</span>
                </h1>
                <p className="max-w-[600px] text-base leading-8 text-slateText sm:text-lg">
                  Compartilhe seu link e receba confissões, elogios, pedidos de desculpas e mensagens secretas — sem revelar quem enviou.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <LinkButton href="/signup" className="min-h-[56px] rounded-xl px-7 text-base lg:w-full xl:w-auto">
                  Criar minha caixa grátis
                </LinkButton>
                <LinkButton href="/v/vitoria" variant="secondary" className="min-h-[56px] rounded-xl px-6 text-base lg:w-full xl:w-auto">
                  <CirclePlay size={19} /> Ver uma caixa funcionando
                </LinkButton>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mutedText">
                <span className="inline-flex items-center gap-1.5"><Sparkles size={14} className="text-honey" /> Grátis para começar</span>
                <span className="inline-flex items-center gap-1.5"><Lock size={14} /> Sem cartão</span>
                <span className="inline-flex items-center gap-1.5"><PauseCircle size={14} /> Você pode pausar quando quiser</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["#FF3D7F", "#FF7657", "#FFD166", "#B970FF", "#35D07F"].map((color, index) => (
                    <span key={color} className="flex size-8 items-center justify-center rounded-full border-2 border-night text-[10px] font-black text-night" style={{ backgroundColor: color }}>{index + 1}</span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-mist"><span className="text-pinkSoft">+23 mil</span> pessoas já criaram suas caixas secretas</p>
              </div>
            </div>
            <HeroMessagePreview />
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#090711]/72 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black leading-tight text-mist sm:text-4xl">O que será que <span className="text-pinkSoft">nunca te disseram?</span></h2>
              <p className="mt-2 text-sm text-slateText">Algumas pessoas só precisam de uma forma mais fácil de falar.</p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {curiosityCards.map(({ title, text, icon: Icon, tone }) => (
                <Card key={title} className="group min-h-[205px] rounded-xl border-white/12 bg-[#100D18]/78 p-5 transition duration-200 hover:-translate-y-1 hover:border-pinkSoft/40 hover:bg-[#17101F]">
                  <div className={`mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-white/[0.04] ${tone}`}><Icon size={34} strokeWidth={1.8} /></div>
                  <h3 className="max-w-[12rem] text-xl font-black leading-snug text-mist">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slateText">{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="border-b border-white/10 bg-[#05030A]/88 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-black text-mist sm:text-3xl">Sua caixa fica pronta em três passos</h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start">
              {steps.map(([title, text], index) => (
                <StepItem key={title} index={index + 1} title={title} text={text} />
              )).flatMap((item, index) => index < 2 ? [item, <div key={`line-${index}`} className="hidden h-px w-full translate-y-8 border-t border-dashed border-white/22 lg:block" />] : [item])}
            </div>
            <div className="mt-8 flex justify-center">
              <LinkButton href="/signup" className="min-h-[52px] rounded-xl px-9">Criar minha caixa grátis</LinkButton>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#07050D]/92 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.95fr]">
            <div id="exemplos">
              <h2 className="text-2xl font-black text-mist sm:text-3xl">Mensagens que você pode receber</h2>
              <p className="mt-1 text-sm text-slateText">Nunca dá para saber o que alguém está guardando.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {messageExamples.map(({ category, text, icon: Icon, tone }) => (
                  <Card key={category} className="relative flex min-h-[170px] flex-col justify-between rounded-lg border-white/12 bg-[#100D18]/80 p-4">
                    <div>
                      <span className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-bold ${tone}`}><Icon size={12} />{category}</span>
                      <p className="mt-4 text-[13px] leading-6 text-mist/88">“{text}”</p>
                    </div>
                    <Icon className={`mx-auto mt-5 ${tone}`} size={24} strokeWidth={1.7} />
                  </Card>
                ))}
              </div>
            </div>
            <div id="seguranca">
              <h2 className="text-2xl font-black text-mist sm:text-3xl">Sua caixa, suas regras</h2>
              <p className="mt-1 text-sm text-slateText">Você decide quando receber mensagens e mantém o controle.</p>
              <div className="mt-6 space-y-4">
                {safetyItems.map(([item, Icon]) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-mist/88">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-pinkHot text-white"><Icon size={16} /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-lg text-sm leading-6 text-mutedText">Algumas informações técnicas podem ser armazenadas para prevenir abusos e cumprir obrigações legais.</p>
            </div>
          </div>
        </section>

        <section id="planos" className="bg-[#05030A] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <h2 className="text-2xl font-black text-mist sm:text-3xl">Comece grátis. Personalize quando quiser.</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <PlanCard name="Gratuito" price="R$ 0" suffix="/mês" features={freeFeatures} href="/signup" cta="Criar minha caixa grátis" />
                <PlanCard featured name="Pro" price="R$ 19,90" suffix="/mês" features={proFeatures} href="/pricing" cta="Desbloquear minha caixa completa" />
              </div>
            </div>
            <div id="faq">
              <h2 className="text-2xl font-black text-mist sm:text-3xl">Perguntas frequentes</h2>
              <div className="mt-7 space-y-3">
                {faq.map((question) => (
                  <button key={question} className="focus-ring flex min-h-12 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.055] px-4 text-left text-sm font-semibold text-mist transition hover:border-pinkSoft/35 hover:bg-white/[0.075]" type="button">
                    {question}<ChevronDown size={16} className="text-slateText" />
                  </button>
                ))}
              </div>
              <a href="/safety" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slateText transition hover:text-pinkSoft">Ver todas as perguntas <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function HeroGlow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_28%,rgba(255,61,127,0.18),transparent_22rem),radial-gradient(circle_at_86%_48%,rgba(255,118,87,0.12),transparent_20rem),linear-gradient(180deg,#05030A_0%,#0A0711_62%,#100912_100%)]" />
      <span className="absolute left-[58%] top-[28%] size-1.5 rounded-full bg-pinkHot shadow-[0_0_18px_5px_rgba(255,61,127,0.45)]" />
      <span className="absolute right-[8%] top-[36%] size-2 rounded-full bg-coral shadow-[0_0_20px_6px_rgba(255,118,87,0.45)]" />
      <span className="absolute right-[16%] top-[54%] size-2 rounded-full bg-pinkSoft shadow-[0_0_24px_7px_rgba(255,107,157,0.45)]" />
      <span className="absolute left-[62%] top-[62%] size-1 rounded-full bg-honey shadow-[0_0_16px_4px_rgba(255,209,102,0.38)]" />
    </div>
  );
}

function HeroMessagePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[430px] lg:mr-0">
      <div className="absolute -left-16 top-1/2 z-10 hidden animate-float rounded-xl border border-pinkSoft/35 bg-[#211322]/88 px-4 py-3 text-sm font-semibold text-mist shadow-soft backdrop-blur md:block">
        <span className="inline-flex items-center gap-2"><Star size={16} className="text-honey" /> Alguém enviou<br />um elogio</span>
      </div>
      <div className="absolute -right-14 top-16 z-10 hidden animate-float rounded-xl border border-pinkSoft/35 bg-[#211322]/88 px-4 py-3 text-sm font-bold text-mist shadow-soft backdrop-blur [animation-delay:1s] md:block">
        <span className="inline-flex items-center gap-2"><Send size={16} className="text-pinkSoft" /> +1 nova<br />mensagem</span>
      </div>
      <div className="absolute -right-12 bottom-20 z-10 hidden animate-float rounded-xl border border-coral/35 bg-[#211322]/88 px-4 py-3 text-sm font-semibold text-mist shadow-soft backdrop-blur [animation-delay:1.8s] md:block">
        <span className="inline-flex items-center gap-2"><Send size={16} className="text-honey" /> Sua caixa foi<br />compartilhada</span>
      </div>

      <div className="relative mx-auto w-[min(100%,330px)] rounded-[38px] border-[5px] border-white/25 bg-[#090711] p-5 shadow-[0_34px_120px_rgba(255,61,127,0.26)] sm:w-[350px]">
        <div className="absolute inset-3 rounded-[30px] border border-white/8 pointer-events-none" />
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#17101F] to-[#08060D] p-5">
          <div className="text-center">
            <p className="text-sm text-slateText">Você recebeu</p>
            <h2 className="mt-1 text-2xl font-black text-mist"><span className="text-pinkHot">3</span> mensagens secretas</h2>
            <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-pinkHot to-coral" />
          </div>
          <div className="mt-5 space-y-3">
            <PhoneMessage category="Crush" time="Agora" text="Tenho vontade de falar com você há meses." icon={Heart} tone="text-pinkSoft" />
            <PhoneMessage category="Saudade" time="5 min" text="Sinto falta da nossa amizade." icon={Star} tone="text-honey" />
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <div className="blur-[2px]">
                <div className="flex items-center justify-between text-xs"><span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5 font-bold text-[#C78BFF]"><Sparkles size={12} /> Elogio</span><span className="text-mutedText">12 min</span></div>
                <p className="mt-3 text-sm leading-6 text-mist">Você é mais importante para mim do que imagina.</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-[#090711]/42 backdrop-blur-[1px]"><span className="inline-flex items-center gap-2 text-sm font-bold text-mist">Toque para revelar <Lock size={14} /></span></div>
            </div>
          </div>
          <LinkButton href="/signup" className="mt-5 min-h-[52px] w-full rounded-xl">Abrir minha caixa <ArrowRight size={18} /></LinkButton>
        </div>
      </div>
    </div>
  );
}

function PhoneMessage({ category, time, text, icon: Icon, tone }: { category: string; time: string; text: string; icon: LucideIcon; tone: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-center justify-between text-xs">
        <span className={`inline-flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5 font-bold ${tone}`}><Icon size={12} /> {category}</span>
        <span className="text-mutedText">{time}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-mist">{text}</p>
    </div>
  );
}

function StepItem({ index, title, text }: { index: number; title: string; text: string }) {
  const icons = [Heart, Users, Sparkles];
  const Icon = icons[index - 1];
  return (
    <div className="grid gap-4 sm:grid-cols-[56px_1fr] lg:grid-cols-[64px_1fr]">
      <div className="flex items-start gap-4">
        <span className="text-2xl font-black text-pinkHot">{index}</span>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-pinkSoft/30 bg-pinkHot/18 text-pinkSoft shadow-[0_0_40px_rgba(255,61,127,0.20)]"><Icon size={24} /></span>
      </div>
      <div>
        <h3 className="font-black text-mist">{title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slateText">{text}</p>
      </div>
    </div>
  );
}

function PlanCard({ name, price, suffix, features, href, cta, featured = false }: { name: string; price: string; suffix: string; features: string[]; href: string; cta: string; featured?: boolean }) {
  return (
    <Card className={`relative flex min-h-[330px] flex-col rounded-xl p-6 ${featured ? "border-pinkHot/85 bg-gradient-to-br from-[#241121] to-[#120B14] shadow-rose" : "bg-[#100D18]/78"}`}>
      {featured ? <span className="absolute -top-3 right-7 rounded-full bg-gradient-to-r from-pinkHot to-coral px-4 py-1 text-xs font-black text-white">MAIS POPULAR</span> : null}
      <p className="text-base font-semibold text-mist">{name}</p>
      <p className="mt-2 text-3xl font-black text-mist">{price} <span className="text-sm font-medium text-slateText">{suffix}</span></p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-slateText">
        {features.map((feature) => <li key={feature} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-success" />{feature}</li>)}
      </ul>
      <LinkButton href={href} variant={featured ? "primary" : "secondary"} className="mt-6 min-h-[50px] rounded-xl">{cta}</LinkButton>
    </Card>
  );
}