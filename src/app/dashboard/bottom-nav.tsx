"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, UsersIcon, WalletIcon, GridIcon } from "@/components/icons";

const ITEMS = [
  { href: "/dashboard", label: "Início", icon: HomeIcon },
  { href: "/dashboard/agenda", label: "Agenda", icon: CalendarIcon },
  { href: "/dashboard/pacientes", label: "Pacientes", icon: UsersIcon },
  { href: "/dashboard/financeiro", label: "Financeiro", icon: WalletIcon },
  { href: "/dashboard/conteudo", label: "Conteúdo", icon: GridIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-border-soft bg-surface md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {ITEMS.map((item) => {
        const active =
          item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
              active ? "text-accent" : "text-ink-faint"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
