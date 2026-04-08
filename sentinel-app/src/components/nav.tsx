"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/viewer", label: "Image Library" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-panel/50 backdrop-blur-sm">
      <Link href="/" className="font-mono text-lg font-bold tracking-widest text-accent">
        SENTINEL
      </Link>

      <div className="flex items-center gap-1">
        {links.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded transition-colors",
                active
                  ? "text-accent bg-accent/10"
                  : "text-secondary hover:text-foreground hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-secondary hover:text-foreground transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-mono text-accent">
          JK
        </div>
      </div>
    </nav>
  );
}
