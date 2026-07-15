import { BrandLogo } from "@/components/site/brand-logo";

export function SiteFooter() {
  const links = [
    ["Termos de Uso", "/terms"],
    ["Política de Privacidade", "/privacy"],
    ["Diretrizes da Comunidade", "/community-guidelines"],
    ["Segurança", "/safety"],
    ["Contato", "mailto:contato@nuncatedisse.local"],
    ["Instagram", "#"],
    ["TikTok", "#"]
  ];

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-slateText sm:px-6 lg:px-8">
        <BrandLogo className="h-10 max-w-[48px] sm:h-11" />
        <div className="flex flex-wrap gap-4">
          {links.map(([label, href]) => <a key={label} className="hover:text-mist" href={href}>{label}</a>)}
        </div>
        <p>Modelo inicial. Os textos legais precisam de revisão jurídica antes do lançamento em produção.</p>
      </div>
    </footer>
  );
}
