"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItems } from "@/lib/headerMenu";
import { useAuth } from "@/utils/store/authStore";
import { cn } from "@/lib/utils";

const NavigationMenus = () => {
  const { navigationItems } = NavigationItems();
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex items-center",
        user ? "space-x-28" : "space-x-20",
        "2xl:space-x-40"
      )}
    >
      {navigationItems.map((item) => {
        const isActive = item.href === pathname;

        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            className="relative text-sm md:text-base font-medium text-zinc-800 transition hover:text-white"
          >
            {item.label}

            {isActive && (
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#EE6C0E]" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationMenus;