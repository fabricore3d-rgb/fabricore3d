"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Printer, Package, Settings, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/login/actions";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Pedidos & CRM", href: "/pedidos", icon: Package },
    { name: "Fazenda & Estoque", href: "/fazenda", icon: Printer },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          <Layers className="text-blue-500 w-8 h-8" />
          <span>PRINT<span className="text-blue-500">FLOW</span></span>
        </div>
        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-mono">Operacional</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium",
                isActive 
                  ? "bg-zinc-800/50 text-blue-400 border border-blue-900/30" 
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 border border-transparent"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <Link href="/settings" className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          pathname === "/settings" ? "bg-zinc-800/50 text-blue-400" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        )}>
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
        <form action={logout}>
          <button type="submit" className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-red-400 hover:bg-red-400/10">
            <LogOut className="w-5 h-5" />
            Sair da Fazenda
          </button>
        </form>
      </div>
    </aside>
  );
}
