import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/brand-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05030A]/82 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[66px] max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex min-w-0 shrink-0 items-center rounded" aria-label="Nunca Te Disse - início">
          <BrandLogo priority />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-mist/88 lg:flex" aria-label="Navegação principal">
          <Link className="transition hover:text-pinkSoft" href="/#como-funciona">Como funciona</Link>
          <Link className="transition hover:text-pinkSoft" href="/#exemplos">Exemplos</Link>
          <Link className="transition hover:text-pinkSoft" href="/#seguranca">Segurança</Link>
          <Link className="transition hover:text-pinkSoft" href="/#planos">Planos</Link>
          <Link className="transition hover:text-pinkSoft" href="/#faq">FAQ</Link>
        </nav>
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <LinkButton href="/login" variant="ghost" className="min-h-10 rounded-xl bg-white/[0.03] px-2.5 text-[13px] sm:min-h-11 sm:px-5 sm:text-sm">Entrar</LinkButton>
          <LinkButton href="/signup" className="min-h-10 rounded-xl px-2.5 text-[13px] sm:min-h-11 sm:px-5 sm:text-sm"><span className="sm:hidden">Criar</span><span className="hidden sm:inline">Criar caixa grátis</span></LinkButton>
        </div>
      </div>
    </header>
  );
}