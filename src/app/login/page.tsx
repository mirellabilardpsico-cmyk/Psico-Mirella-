"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { field, label as labelClass, buttonPrimary } from "@/lib/ui";
import { Mark } from "@/components/mark";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="w-full max-w-[360px]">
          <div className="mb-8 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-plum">
              <Mark tone="ivory" className="h-4 w-4" />
            </span>
            <p className="font-display text-[18px] italic text-plum">mirella</p>
          </div>

          <h1 className="mb-1 text-[20px] font-semibold text-ink">Entrar</h1>
          <p className="mb-7 text-[13px] text-ink-soft">Acesse sua agenda, pacientes e financeiro.</p>

          <form action={formAction}>
            <label className={labelClass} htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              required
              className={field}
            />

            <label className={labelClass} htmlFor="password">Senha</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required className={field} />

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

      <div className="gradient-plum relative hidden items-center justify-center overflow-hidden px-12 py-16 md:flex">
        <Mark
          tone="ivory"
          className="pointer-events-none absolute -right-28 -top-24 h-[26rem] w-[26rem] opacity-40"
        />
        <Mark
          tone="ivory"
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 opacity-25"
        />

        <div className="relative max-w-sm">
          <p className="font-display text-[26px] italic leading-snug text-paper">
            &ldquo;Um espaço para dizer o que ainda não teve palavra — e ser ouvido com presença e
            sem pressa.&rdquo;
          </p>
          <p className="mt-6 text-[12px] tracking-[0.14em] text-mist uppercase">
            Psicoterapia · Adolescentes, adultos e idosos
          </p>
        </div>
      </div>
    </div>
  );
}
