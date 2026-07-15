"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { getCurrentUser, upsertProfile } from "@/lib/local-store";
import { profileSchema, type ProfileInput } from "@/schemas/profile";

export function OnboardingForm() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      promptText: "Tem alguma coisa que você nunca teve coragem de me dizer?",
      theme: "noite",
      termsAccepted: true,
      privacyAccepted: true,
      minimumAgeConfirmed: true
    }
  });

  useEffect(() => {
    if (!getCurrentUser()) {
      router.push("/login");
    }
  }, [router]);

  function onSubmit(data: ProfileInput) {
    const result = upsertProfile(data);
    setFeedback(result.message);
    if (result.ok && result.profile) {
      router.push(`/dashboard`);
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Configure sua caixa secreta</h1>
      <p className="mt-2 text-sm text-slateText">Seu link público será criado a partir do username.</p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Nome de exibicao"><Input data-testid="onboarding-display-name" aria-label="Nome de exibicao" {...register("displayName")} placeholder="Vitoria" />{errors.displayName ? <p className="text-sm text-danger">{errors.displayName.message}</p> : null}</Field>
        <Field label="Username" hint="3 a 30 caracteres: letras, números, hífen e underscore."><Input data-testid="onboarding-username" aria-label="Username" {...register("username")} placeholder="vitoria" />{errors.username ? <p className="text-sm text-danger">{errors.username.message}</p> : null}</Field>
        <Field label="Frase da caixa"><Textarea aria-label="Frase da caixa" {...register("promptText")} />{errors.promptText ? <p className="text-sm text-danger">{errors.promptText.message}</p> : null}</Field>
        <Field label="Avatar opcional"><Input {...register("avatarUrl")} placeholder="https://..." />{errors.avatarUrl ? <p className="text-sm text-danger">{errors.avatarUrl.message}</p> : null}</Field>
        <Field label="Tema visual">
          <select className="focus-ring min-h-11 rounded-lg border border-white/12 bg-night px-3 text-sm" {...register("theme")}>
            <option value="noite">Noite</option><option value="aurora">Aurora</option><option value="coracao">Coração</option><option value="minimalista">Minimalista</option>
          </select>
        </Field>
        <label className="flex gap-3 text-sm text-slateText"><input type="checkbox" {...register("termsAccepted")} /> Aceito os Termos de Uso.</label>
        <label className="flex gap-3 text-sm text-slateText"><input type="checkbox" {...register("privacyAccepted")} /> Aceito a Política de Privacidade.</label>
        <label className="flex gap-3 text-sm text-slateText"><input type="checkbox" {...register("minimumAgeConfirmed")} /> Confirmo que tenho a idade mínima exigida.</label>
        <Button data-testid="onboarding-submit" disabled={isSubmitting} type="submit">Criar minha página</Button>
      </form>
      {feedback ? <p className="mt-4 text-sm text-lilac">{feedback}</p> : null}
    </Card>
  );
}

