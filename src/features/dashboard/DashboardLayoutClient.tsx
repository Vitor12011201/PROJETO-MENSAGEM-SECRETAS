"use client";

import Link from "next/link";
import { BarChart3, Brush, Home, Lock, Mail, Shield, WalletCards } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/brand-logo";
import { getCurrentProfile, getCurrentUser, logout } from "@/lib/local-store";

const nav = [
  ["Visão geral", "/dashboard", Home],
  ["Mensagens", "/dashboard/messages", Mail],
  ["Personalização", "/dashboard/customize", Brush],
  ["Estatísticas", "/dashboard#stats", BarChart3],
  ["Assinatura", "/dashboard/subscription", WalletCards],
  ["Segurança", "/dashboard/security", Shield],
  ["Configurações", "/dashboard/customize", Lock]
] as const;

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const profile = useMemo(() => (ready ? getCurrentProfile() : undefined), [ready]);

  useEffect(() => {
    if (!getCurrentUser()) {
      router.push("/login");
      return;
    }
    setReady(true);
  }, [router]);

  function leave() {
    logout();
    router.push("/");
  }

  if (!ready) {
    return <main className="px-4 py-16 text-center text-slateText">Carregando seu painel...</main>;
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-white/10 bg-night/88 p-3 sm:p-4 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 lg:block">
          <Link href="/" className="focus-ring inline-flex min-h-11 min-w-0 items-center rounded" aria-label="Nunca Te Disse">
            <BrandLogo className="h-10 max-w-[180px] sm:h-11" />
          </Link>
          <Button className="min-h-10 shrink-0 px-3 text-xs lg:hidden" variant="secondary" onClick={leave}>Sair</Button>
        </div>
        <p className="mt-3 truncate text-sm text-slateText">{profile ? `/v/${profile.username}` : "Configure sua caixa"}</p>
        <nav className="-mx-3 mt-5 flex gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-8 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {nav.map(([label, href, Icon]) => (
            <Link key={label} href={href} className={`flex min-h-11 min-w-fit items-center gap-2 rounded-xl px-3.5 py-2 text-sm ${pathname === href ? "bg-white/12 text-mist" : "text-slateText hover:bg-white/8 hover:text-mist"}`}>
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <Button className="mt-8 hidden w-full lg:inline-flex" variant="secondary" onClick={leave}>Sair</Button>
      </aside>
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</section>
    </div>
  );
}
