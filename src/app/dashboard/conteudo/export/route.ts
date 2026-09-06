import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const FORMATO_LABEL: Record<string, string> = {
  carrossel: "Carrossel",
  reels: "Reels",
  stories: "Stories",
  imagem: "Imagem única",
  texto: "Texto",
};

function csvEscape(value: string) {
  const v = value.replace(/"/g, '""');
  return `"${v}"`;
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  const { data: posts } = await supabase
    .from("conteudo_posts")
    .select("data, formato, pilar, titulo, legenda, status")
    .order("data", { ascending: true });

  const header = ["Data", "Formato", "Pilar", "Título", "Legenda", "Status"];
  const linhas = (posts ?? []).map((p) => [
    new Date(`${p.data}T00:00:00`).toLocaleDateString("pt-BR"),
    FORMATO_LABEL[p.formato] ?? p.formato,
    p.pilar ?? "",
    p.titulo,
    p.legenda ?? "",
    p.status,
  ]);

  const csv = [header, ...linhas].map((linha) => linha.map((c) => csvEscape(String(c))).join(";")).join("\r\n");

  // BOM para o Excel reconhecer UTF-8 corretamente
  const body = "﻿" + csv;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pauta-conteudo-mirella.csv"`,
    },
  });
}
