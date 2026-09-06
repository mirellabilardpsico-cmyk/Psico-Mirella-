import { createPost } from "../actions";
import { card, field, label as labelClass, buttonPrimary } from "@/lib/ui";

const PILARES = [
  "Ansiedade & regulação",
  "Autoestima & autoconhecimento",
  "Relacionamentos & vínculos",
  "Cada fase, seu tempo",
  "Por trás da terapia",
];

export default function NovoPostPage() {
  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-[19px] font-semibold text-ink">Novo post</h2>

      <form action={createPost} className={`${card} p-6`}>
        <label className={labelClass} htmlFor="titulo">Título / gancho *</label>
        <input id="titulo" name="titulo" type="text" required className={field} placeholder="Ex: Ansiedade x estresse: qual a diferença?" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="data">Data *</label>
            <input id="data" name="data" type="date" required className={field} />
          </div>
          <div>
            <label className={labelClass} htmlFor="formato">Formato</label>
            <select id="formato" name="formato" defaultValue="carrossel" className={field}>
              <option value="carrossel">Carrossel</option>
              <option value="reels">Reels</option>
              <option value="stories">Stories</option>
              <option value="imagem">Imagem única</option>
              <option value="texto">Texto</option>
            </select>
          </div>
        </div>

        <label className={labelClass} htmlFor="pilar">Pilar</label>
        <select id="pilar" name="pilar" defaultValue="" className={field}>
          <option value="">Selecione...</option>
          {PILARES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label className={labelClass} htmlFor="legenda">Legenda / observações</label>
        <textarea id="legenda" name="legenda" rows={4} className={field} placeholder="Gancho, ideia de legenda, CTA..." />

        <button type="submit" className={buttonPrimary}>
          Salvar post
        </button>
      </form>
    </div>
  );
}
