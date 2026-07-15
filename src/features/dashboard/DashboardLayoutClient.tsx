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

  if (!ready) {
    return <main className="px-4 py-16 text-center text-slateText">Carregando seu painel...</main>;
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-white/10 bg-night/80 p-4 lg:min-h-screen lg:border-b-0 lg:border-r">
        <Link href="/" className="focus-ring inline-flex items-center rounded" aria-label="Nunca Te Disse">
          <BrandLogo className="h-10 max-w-[48px] sm:h-11" />
        </Link>
        <p className="mt-3 text-sm text-slateText">{profile ? `/v/${profile.username}` : "Configure sua caixa"}</p>
        <nav className="mt-8 flex gap-2 overflow-auto lg:flex-col">
          {nav.map(([label, href, Icon]) => (
            <Link key={label} href={href} className={`flex min-w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm ${pathname === href ? "bg-white/12 text-mist" : "text-slateText hover:bg-white/8 hover:text-mist"}`}>
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <Button className="mt-8 w-full" variant="secondary" onClick={() => { logout(); router.push("/"); }}>Sair</Button>
      </aside>
      <section className="px-4 py-8 sm:px-6 lg:px-8">{children}</section>
    </div>
  );
}
