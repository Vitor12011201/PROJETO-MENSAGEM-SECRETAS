import { BrandLogo } from "@/components/site/brand-logo";

export function SiteFooter() {
  const links = [
    ["Termos", "/terms"],
    ["Privacidade", "/privacy"],
    ["Diretrizes", "/community-guidelines"],
    ["Segurança", "/safety"],
    ["Contato", "mailto:contato@nuncatedisse.local"],
    ["Instagram", "#"],
    ["TikTok", "#"]
  ];

  return (
    <footer className="border-t border-white/10 bg-night/70 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-slateText sm:px-6 lg:px-8">
        <BrandLogo imageClassName="h-10 w-10 sm:h-11 sm:w-11 lg:h-11 lg:w-11" textClassName="text-[18px] sm:text-xl" />
        <p className="max-w-md text-base leading-7 text-mist/80">O que nunca foi dito pode começar por aqui.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {links.map(([label, href]) => <a key={label} className="transition hover:text-mist" href={href}>{label}</a>)}
        </div>
        <p className="text-xs leading-6 text-mutedText">Modelo inicial. Os textos legais precisam de revisão jurídica antes do lançamento em produção.</p>
      </div>
    </footer>
  );
}
