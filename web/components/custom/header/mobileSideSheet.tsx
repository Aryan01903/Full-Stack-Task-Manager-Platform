"use client";

import React from "react";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { Mode } from "./header";
import { useAuth } from "@/utils/store/authStore";


interface NavigationItem {
  id: string;
  label: string;
  href?: string;
}

interface MobileBottomSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigationItems: NavigationItem[];
  logo?: string;
  setModal: (modal: Mode) => void;
}

const MobileSideSheet: React.FC<MobileBottomSheetProps> = ({
  open,
  setOpen,
  navigationItems,
  setModal,
}) => {
  const { user, logout } = useAuth();

  return (
    <>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        <Menu className="h-7 w-7 text-zinc-300" />
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 backdrop-blur-md transition-opacity duration-300"
          />

          <div
            className="
              fixed right-0 top-0 z-50
              h-screen w-[85%] max-w-[340px]
              overflow-y-auto
              border-l border-white/10
              bg-black/80
              shadow-2xl
              transform transition-transform duration-300 ease-out
              translate-x-0
            "
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#EE6C0E]/10 via-transparent to-transparent" />

            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-5">
              <h2 className="text-xl font-bold tracking-tight text-[#EE6C0E]">
                Menu
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-zinc-400 transition hover:text-white" />
              </button>
            </div>

            <div className="relative flex flex-col gap-2 px-6 py-6">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <Link
                    href={item.href || "#"}
                    onClick={() => setOpen(false)}
                    className="
                      block rounded-xl px-4 py-3
                      text-lg font-medium text-zinc-200
                      transition-all duration-300
                      hover:bg-white/5
                      hover:text-[#EE6C0E]
                      cursor-pointer
                    "
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="px-9">
              {!user ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setModal("login")}
                    className="
                      rounded-full
                      border border-white/20
                      bg-white/5
                      px-6 py-2
                      text-sm text-white
                      backdrop-blur-md
                      cursor-pointer
                    "
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setModal("register")}
                    className="
                      rounded-full
                      bg-gradient-to-r
                      from-[#EE6C0E]
                      to-orange-400
                      px-4 py-2
                      text-sm font-medium text-white
                      cursor-pointer
                    "
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={logout}
                  className="
                    flex items-center gap-2
                    rounded-full
                    bg-red-500
                    px-4 py-2
                    text-sm font-medium text-white
                    cursor-pointer
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              )}
            </div>

            {/* Bottom Glow Line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-full animate-pulse"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #EE6C0E, transparent)",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MobileSideSheet;