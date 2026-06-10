"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User2 } from "lucide-react";
import { NavigationItems } from "@/lib/headerMenu";
import NavigationMenus from "./NavigationMenu";
import MobileSideSheet from "./mobileSideSheet";
import AuthModal from "../modals/authModals";
import { useAuth } from "@/utils/store/authStore";

export type Mode =
  | "login"
  | "register"

export default function Header() {
  const [open, setOpen] =
    useState(false);

  const [modal, setModal] =
    useState<Mode | null>(null);

  const { navigationItems } =
    NavigationItems();

  const {
    user,
    logout,
  } = useAuth();
  console.log(user)

  return (
    <>
      <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 h-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-300/50 to-yellow-400/40" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse" />

        <div className="hidden lg:block">
          <nav
            className="
              relative flex h-20 items-center justify-between px-[8%]
              animate-fade-down
            "
          >
            <Link href="/">
              <div className="cursor-pointer text-4xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-primary via-orange-300 to-yellow-500 bg-clip-text text-transparent">
                  TaskPilot
                </span>
              </div>
            </Link>

            <NavigationMenus />

            {!user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setModal("login")
                  }
                  className="group relative cursor-pointer overflow-hidden rounded-full border border-white/5 bg-white/5 px-9 py-2.5 text-sm font-medium text-zinc-500 backdrop-blur-md transition-all duration-300 hover:border-orange-400/80 hover:bg-white/10 text-black"
                >
                  <span className="relative z-10">
                    Login
                  </span>

                  <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-orange-500/20 to-yellow-400/20 transition-transform duration-300 group-hover:translate-y-0" />
                </button>

                <button
                  onClick={() =>
                    setModal("register")
                  }
                  className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-primary to-orange-400 px-9 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40"
                >
                  <span className="relative z-10">
                    Sign Up
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden xl:flex items-center gap-2 rounded-full border border-primary/40 text-primary bg-white/50 px-4 py-2 ">
                  <User2 size={18} />

                  <span className="text-base font-medium">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="group relative cursor-pointer flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-red-400 px-9 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-red-500/40"
                >
                  <LogOut
                    size={18}
                    className="relative z-10"
                  />

                  <span className="relative z-10">
                    Logout
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            )}
          </nav>
        </div>

        <div className="lg:hidden">
          <nav className="relative flex h-20 items-center justify-between px-[6%]">
            <Link href="/">
              <div className="text-2xl font-extrabold tracking-wide">
                <span className="bg-gradient-to-r from-primary via-orange-300 to-yellow-500 bg-clip-text text-transparent">
                  TaskPilot
                </span>
              </div>
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
          onClose={() =>
            setModal(null)
          }
          switchMode={(mode) =>
            setModal(mode)
          }
        />
      )}
    </>
  );
}