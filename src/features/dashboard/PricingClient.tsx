"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { plans } from "@/config/plans";
import { getCurrentUser, upgradeCurrentUserToPro } from "@/lib/local-store";

export function PricingClient({ chrome = true }: { chrome?: boolean } = {}) {
  const [feedback, setFeedback] = useState("");

  function upgrade() {
    if (!getCurrentUser()) {
      window.location.href = "/login";
      return;
    }
    setFeedback(upgradeCurrentUserToPro().message);
  }

  const content = (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Planos</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slateText sm:text-base">Pagamentos estão preparados por abstração. No desenvolvimento, o upgrade Pro usa Mercado Pago em modo mock.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {Object.values(plans).map((plan) => (
          <Card key={plan.id} className={plan.id === "pro" ? "border-lilac/70" : undefined}>
            <p className="text-sm uppercase text-lilac">{plan.name}</p>
            <p className="mt-2 text-3xl font-black">{plan.priceLabel}</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slateText">
              {plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-success" />{feature}</li>)}
            </ul>
            {plan.id === "pro" ? <Button className="mt-6 min-h-12 w-full sm:w-auto" onClick={upgrade}>Testar upgrade Pro</Button> : <LinkButton className="mt-6 min-h-12 w-full sm:w-auto" variant="secondary" href="/signup">Começar grátis</LinkButton>}
          </Card>
        ))}
      </div>
      {feedback ? <p className="mt-5 text-sm leading-6 text-success">{feedback}</p> : null}
    </main>
  );

  if (!chrome) {
    return content;
  }

  return <><SiteHeader />{content}<SiteFooter /></>;
}
