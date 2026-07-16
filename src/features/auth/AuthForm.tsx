"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { authSchema, type AuthInput } from "@/schemas/auth";
import { createUser, login } from "@/lib/local-store";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthInput>({ resolver: zodResolver(authSchema) });

  function onSubmit(data: AuthInput) {
    const result = mode === "signup" ? createUser(data.email, data.password) : login(data.email, data.password);
    setFeedback(result.message);
    if (result.ok) {
      router.push(mode === "signup" ? "/onboarding" : "/dashboard");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md rounded-2xl">
      <h1 className="text-2xl font-bold">{mode === "signup" ? "Criar minha caixa" : "Entrar"}</h1>
      <p className="mt-2 text-sm text-slateText">Modo local com dados simulados. Depois você pode conectar Supabase Auth.</p>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Field label="E-mail">
          <Input data-testid="auth-email" aria-label="E-mail" type="email" autoComplete="email" placeholder="voce@email.com" {...register("email")} />
          {errors.email ? <p className="text-sm text-danger">{errors.email.message}</p> : null}
        </Field>
        <Field label="Senha">
          <Input data-testid="auth-password" aria-label="Senha" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="Mínimo 8 caracteres" {...register("password")} />
          {errors.password ? <p className="text-sm text-danger">{errors.password.message}</p> : null}
        </Field>
        <Button disabled={isSubmitting} className="min-h-12 w-full text-base sm:text-sm" type="submit">{mode === "signup" ? "Criar conta" : "Entrar"}</Button>
      </form>
      {feedback ? <p className="mt-4 text-sm text-lilac">{feedback}</p> : null}
      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slateText">
        {mode === "signup" ? <a className="inline-flex min-h-10 items-center rounded-lg px-2 hover:text-mist" href="/login">Já tenho conta</a> : <a className="inline-flex min-h-10 items-center rounded-lg px-2 hover:text-mist" href="/signup">Criar conta</a>}
        <span className="hidden">?</span>
        <a className="inline-flex min-h-10 items-center rounded-lg px-2 hover:text-mist" href="/login?recover=1">Recuperar senha</a>
      </div>
      <p className="mt-4 text-xs text-slateText">Confirmação de e-mail e recuperação real dependem do Supabase Auth em produção.</p>
    </Card>
  );
}

