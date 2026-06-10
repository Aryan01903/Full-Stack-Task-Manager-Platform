"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User2, Menu } from "lucide-react";
import { NavigationItems } from "@/lib/headerMenu";
import NavigationMenus from "./NavigationMenu";
import MobileSideSheet from "./mobileSideSheet";
import AuthModal from "../modals/authModals";
import { useAuth } from "@/utils/store/authStore";

export type Mode = "login" | "register";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<Mode | null>(null);
  const { navigationItems } = NavigationItems();
  const { user, logout } = useAuth();

  return (
    <>
      <header className="relative z-50 h-20 border-b border-white/[0.06] bg-[#0A0F1E]">

        <div className="hidden lg:block">
          <nav className="relative flex h-20 items-center justify-between px-[8%]">

            <Link href="/">
              <span className="text-3xl font-bold tracking-wide text-white">
                Task<span className="text-[#EE6C0E]">Pilot</span>
              </span>
            </Link>

            <NavigationMenus />

            {!user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModal("login")}
                  className="cursor-pointer rounded-full border border-white/[0.06] bg-[#111827] px-6 py-2 text-sm font-medium text-[#8892A4] transition-colors duration-200 hover:border-[#EE6C0E]/30 hover:text-white"
                >
                  Login
                </button>

                <button
                  onClick={() => setModal("register")}
                  className="cursor-pointer rounded-full bg-[#EE6C0E] px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d45f0a]"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden xl:flex items-center gap-2 rounded-full border border-[#EE6C0E]/30 bg-[#EE6C0E]/10 px-4 py-2">
                  <User2 size={16} className="text-[#EE6C0E]" />
                  <span className="text-sm font-medium text-white">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.06] bg-[#111827] px-6 py-2 text-sm font-medium text-[#8892A4] transition-colors duration-200 hover:border-red-500/30 hover:text-red-400"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>

        <div className="lg:hidden">
          <nav className="relative flex h-20 items-center justify-between px-6">
            <Link href="/">
              <span className="text-2xl font-bold tracking-wide text-white">
                Task<span className="text-[#EE6C0E]">Pilot</span>
              </span>
            </Link>

            <MobileSideSheet
              open={open}
              setOpen={setOpen}
              navigationItems={navigationItems}
              setModal={setModal}
            />
          </nav>
        </div>
      </header>

      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          switchMode={(mode) => setModal(mode)}
        />
      )}
    </>
  );
}