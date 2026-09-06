import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { NavLink } from "./nav-link";
import { BottomNav } from "./bottom-nav";
import { HomeIcon, CalendarIcon, UsersIcon, WalletIcon, GridIcon } from "@/components/icons";
import { Mark } from "@/components/mark";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mesh-bg min-h-screen">
      <header className="gradient-plum sticky top-0 z-10 flex items-center gap-4 px-4 py-2.5 shadow-[0_2px_16px_-4px_rgba(58,27,61,0.35)] sm:px-5">
        <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
          <Mark tone="accent" className="h-4 w-4" />
          <span className="font-display text-[14px] italic text-plum">mirella</span>
        </span>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          <NavLink href="/dashboard" icon={<HomeIcon className="h-4 w-4 shrink-0" />}>Início</NavLink>
          <NavLink href="/dashboard/agenda" icon={<CalendarIcon className="h-4 w-4 shrink-0" />}>Agenda</NavLink>
          <NavLink href="/dashboard/pacientes" icon={<UsersIcon className="h-4 w-4 shrink-0" />}>Pacientes</NavLink>
          <NavLink href="/dashboard/financeiro" icon={<WalletIcon className="h-4 w-4 shrink-0" />}>Financeiro</NavLink>
          <NavLink href="/dashboard/conteudo" icon={<GridIcon className="h-4 w-4 shrink-0" />}>Conteúdo</NavLink>
        </nav>
        <div className="flex-1 md:hidden" />

        <span className="hidden text-[12px] text-white/70 sm:inline">{user?.email}</span>
        <LogoutButton />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-8 sm:py-7 md:pb-7">{children}</main>

      <BottomNav />
    </div>
  );
}
