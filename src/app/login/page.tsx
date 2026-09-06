"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { field, label as labelClass, buttonPrimary } from "@/lib/ui";
import { Mark } from "@/components/mark";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="gradient-plum relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <Mark
        tone="ivory"
        className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] opacity-30"
      />
      <Mark
        tone="ivory"
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 opacity-20"
      />

      <div className="relative w-full max-w-[380px]">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
            <Mark tone="ivory" className="h-4 w-4" />
          </span>
          <p className="font-display text-[20px] italic text-paper">mirella</p>
        </div>

        <form action={formAction} className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
          <h1 className="mb-1 text-[15px] font-semibold text-ink">Entrar</h1>
          <p className="mb-5 text-[13px] text-ink-soft">Acesse com seu email e senha.</p>

          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={field} />

          <label className={labelClass} htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" required className={field} />

          {state?.error && (
            <p className="mb-4 rounded-lg bg-danger-soft px-3 py-2 text-[13px] text-danger">
              {state.error}
            </p>
          )}

          <button type="submit" disabled={pending} className={`${buttonPrimary} w-full`}>
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
