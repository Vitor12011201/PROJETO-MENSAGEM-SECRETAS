import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/brand-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[70px] max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex min-w-0 shrink-0 items-center rounded" aria-label="Nunca Te Disse - início">
          <BrandLogo priority />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slateText lg:flex" aria-label="Navegação principal">
          <Link className="transition hover:text-mist" href="/#como-funciona">Como funciona</Link>
          <Link className="transition hover:text-mist" href="/#exemplos">Exemplos</Link>
          <Link className="transition hover:text-mist" href="/#seguranca">Segurança</Link>
          <Link className="transition hover:text-mist" href="/#planos">Planos</Link>
        </nav>
        <div className="flex min-w-0 items-center gap-2">
          <LinkButton href="/login" variant="ghost" className="hidden sm:inline-flex">Entrar</LinkButton>
          <LinkButton href="/signup" className="min-h-11 rounded-[14px] px-3.5 text-[13px] sm:px-5 sm:text-sm">Criar caixa grátis</LinkButton>
        </div>
      </div>
    </header>
  );
}
