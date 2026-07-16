import { Heart, Instagram, Music2 } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { LinkButton } from "@/components/ui/button";

const columns = [
  {
    title: "Produto",
    links: [
      ["Como funciona", "/#como-funciona"],
      ["Exemplos", "/#exemplos"],
      ["Planos", "/#planos"]
    ]
  },
  {
    title: "Suporte",
    links: [
      ["FAQ", "/#faq"],
      ["Segurança", "/safety"],
      ["Diretrizes", "/community-guidelines"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Termos de Uso", "/terms"],
      ["Política de Privacidade", "/privacy"],
      ["Contato", "mailto:contato@nuncatedisse.local"]
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="bg-[#05030A] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-t-3xl border border-pinkSoft/28 bg-[#0B0710] shadow-[0_-18px_90px_rgba(255,61,127,0.12)]">
        <div className="relative grid gap-6 border-b border-pinkSoft/28 bg-gradient-to-r from-pinkHot/16 via-[#140B16] to-coral/16 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr_0.9fr] lg:items-center">
          <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 rounded-3xl bg-pinkHot/20 p-5 text-pinkSoft shadow-[0_0_70px_rgba(255,61,127,0.42)] lg:block"><Heart size={54} fill="currentColor" /></div>
          <h2 className="max-w-xl text-2xl font-black leading-tight text-mist sm:text-3xl">Talvez alguém esteja esperando uma chance de falar com você.</h2>
          <p className="max-w-md text-sm leading-6 text-slateText">Crie sua caixa, compartilhe seu link e descubra o que nunca tiveram coragem de dizer.</p>
          <div className="relative z-10 flex flex-col gap-2 lg:items-start">
            <LinkButton href="/signup" className="min-h-[52px] rounded-xl px-8">Quero criar minha caixa grátis</LinkButton>
            <span className="text-center text-xs text-mutedText lg:pl-8">Leva menos de 1 minuto.</span>
          </div>
        </div>
        <div className="grid gap-8 p-6 text-sm text-slateText sm:p-8 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo imageClassName="h-8 w-8 sm:h-9 sm:w-9 lg:h-9 lg:w-9" textClassName="text-[17px] sm:text-lg" />
            <p className="mt-4 max-w-48 leading-6 text-mutedText">O que nunca foi dito pode começar por aqui.</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-bold text-mist">{column.title}</h3>
              <div className="mt-3 flex flex-col gap-2">
                {column.links.map(([label, href]) => <a key={label} className="transition hover:text-pinkSoft" href={href}>{label}</a>)}
              </div>
            </div>
          ))}
          <div>
            <h3 className="font-bold text-mist">Redes</h3>
            <div className="mt-3 flex flex-col gap-2">
              <a className="inline-flex items-center gap-2 transition hover:text-pinkSoft" href="#"><Instagram size={15} /> Instagram</a>
              <a className="inline-flex items-center gap-2 transition hover:text-pinkSoft" href="#"><Music2 size={15} /> TikTok</a>
            </div>
          </div>
        </div>
        <p className="border-t border-white/8 px-6 py-4 text-center text-xs text-mutedText sm:px-8">© 2026 Nunca Te Disse. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}