"use client";

import { useState } from "react";
import {
  Loader2,
  Mail,
  Lock,
  User,
  X,
} from "lucide-react";

import { useAuth } from "@/utils/store/authStore";
import {
  useLoginUser,
  useRegisterUser,
} from "@/hooks/auth";

type Mode = "login" | "register";

interface Props {
  mode: Mode;
  onClose: () => void;
  switchMode: (mode: Mode) => void;
}

export default function AuthModal({
  mode,
  onClose,
  switchMode,
}: Props) {
  const { login } = useAuth();

  const loginMutation =
    useLoginUser();

  const registerMutation =
    useRegisterUser();

  const isLoading =
    loginMutation.isPending ||
    registerMutation.isPending;

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const handleSubmit =
    async () => {
      try {
        setError("");

        if (mode === "register") {
          const res = await registerMutation.mutateAsync({
            name: form.name,
            email: form.email,
            password: form.password,
          });
          login({
            token: res.token,
            user: {
              id: res.user.id,
              name: res.user.name ?? "",
              email: res.user.email ?? "",
            },
          });

          onClose();
          return;
        }

        const res =
          await loginMutation.mutateAsync(
            {
              email: form.email,
              password:
                form.password,
            }
          );

        login({
          token: res.token,
          user: {
            id: res?.user?.id,
            name:
              res.user.name ??
              "",
            email:
              res.user.email ??
              "",
          },
        });

        onClose();
      } catch (err: unknown) {
        const error =
          err as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

        setError(
          error.response?.data
            ?.message ??
            "Something went wrong"
        );
      }
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#EE6C0E]/10 via-transparent to-yellow-300/10" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 cursor-pointer rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 mb-8 text-center">
          <h2 className="bg-gradient-to-r from-[#EE6C0E] via-orange-300 to-yellow-200 bg-clip-text text-4xl font-black text-transparent">
            {mode === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          <p className="mt-2 text-sm text-white/60">
            {mode === "login"
              ? "Login to continue your journey"
              : "Create your account"}
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          {mode ===
            "register" && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                placeholder="Full Name"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={
                handleChange
              }
              placeholder="Email Address"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={
                handleChange
              }
              placeholder="Password"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            onClick={
              handleSubmit
            }
            disabled={
              isLoading
            }
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#EE6C0E] to-orange-400 font-semibold text-white disabled:opacity-70"
          >
            {isLoading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {isLoading
              ? "Please wait..."
              : mode ===
                "login"
              ? "Login"
              : "Create Account"}
          </button>

          <p className="text-center text-sm text-white/60">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() =>
                switchMode(
                  mode ===
                    "login"
                    ? "register"
                    : "login"
                )
              }
              className="ml-2 cursor-pointer font-semibold text-orange-300"
            >
              {mode === "login"
                ? "Register"
                : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}