"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InternalNavGlyph } from "@/components/internal/InternalNavGlyph";
import {
  INTERNAL_NAV,
  internalNavIdFromPath,
  type InternalNavId,
} from "@/lib/internal/routes";
import { cn } from "@/lib/utils";

const LAUNCHER_ORDER: InternalNavId[] = ["profile", "sigma", "messages"];

export function InternalBottomNav() {
  const pathname = usePathname();
  const activeId = internalNavIdFromPath(pathname);
  const items = LAUNCHER_ORDER.map((id) => INTERNAL_NAV.find((item) => item.id === id)).filter(
    (item): item is (typeof INTERNAL_NAV)[number] => Boolean(item),
  );

  return (
    <nav aria-label="SIGMA apps" className="internal-dock">
      <div className="glass-surface rounded-[1.7rem] p-1.5 lg:rounded-[1.85rem] lg:p-2">
        <ul className="flex items-stretch gap-1 lg:gap-1.5">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="min-w-0 flex-1 lg:flex-none">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("internal-app-tile", active && "internal-app-tile-active")}
                >
                  <span className="flex h-7 w-7 items-center justify-center lg:h-8 lg:w-8">
                    <InternalNavGlyph id={item.id} active={active} />
                  </span>
                  <span className="max-w-full truncate font-display text-[10px] uppercase leading-none tracking-[0.16em]">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
