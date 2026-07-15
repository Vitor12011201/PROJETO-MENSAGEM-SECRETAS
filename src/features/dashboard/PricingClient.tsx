"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { plans } from "@/config/plans";
import { getCurrentUser, upgradeCurrentUserToPro } from "@/lib/local-store";

export function PricingClient() {
  const [feedback, setFeedback] = useState("");
  function upgrade() {
    if (!getCurrentUser()) {
      window.location.href = "/login";
      return;
    }
    setFeedback(upgradeCurrentUserToPro().message);
  }
  return <><SiteHeader /><main className="mx-auto max-w-6xl px-4 py-16"><h1 className="text-3xl font-bold">Planos</h1><p className="mt-3 text-slateText">Pagamentos estão preparados por abstração. No desenvolvimento, o upgrade Pro usa Mercado Pago em modo mock.</p><div className="mt-8 grid gap-5 md:grid-cols-2">{Object.values(plans).map((plan) => <Card key={plan.id} className={plan.id === "pro" ? "border-lilac/70" : undefined}><p className="text-sm uppercase text-lilac">{plan.name}</p><p className="mt-2 text-3xl font-black">{plan.priceLabel}</p><ul className="mt-6 space-y-3 text-sm text-slateText">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="text-success" />{feature}</li>)}</ul>{plan.id === "pro" ? <Button className="mt-6" onClick={upgrade}>Testar upgrade Pro</Button> : <LinkButton className="mt-6" variant="secondary" href="/signup">Começar grátis</LinkButton>}</Card>)}</div>{feedback ? <p className="mt-5 text-success">{feedback}</p> : null}</main><SiteFooter /></>;
}

