import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/brand-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-night/78 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded" aria-label="Nunca Te Disse">
          <BrandLogo priority />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slateText md:flex">
          <Link className="hover:text-mist" href="/#como-funciona">Como funciona</Link>
          <Link className="hover:text-mist" href="/#seguranca">Segurança</Link>
          <Link className="hover:text-mist" href="/pricing">Planos</Link>
        </nav>
        <div className="flex min-w-0 items-center gap-2">
          <LinkButton href="/login" variant="ghost" className="hidden sm:inline-flex">Entrar</LinkButton>
          <LinkButton href="/signup">Criar minha caixa</LinkButton>
        </div>
      </div>
    </header>
  );
}
