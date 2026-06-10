"use client"
import { useAuth } from "@/utils/store/authStore";
import DashboardMetrics from "./DashboardMetrics";
import TaskList from "./TaskList";

export default function DashboardPageWrapper() {
    const {user} = useAuth()
       if (!user) {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center px-6 text-center bg-[#111827]">
      <div className="max-w-md">
        <h2 className="mb-3 text-3xl font-bold text-white">
          Please Login
        </h2>

        <p className="mb-6 text-zinc-400">
          You need to be logged in to create, manage, and track your tasks.
        </p>
      </div>
    </div>
  );
}
  return (
    <main className="min-h-screen bg-[#0A0F1E] px-6 md:px-10 py-9 md:py-16">
      <div className="flex flex-col gap-10">

        <div>
          <p className="text-sm font-medium tracking-widest uppercase text-[#EE6C0E] mb-1">
            Overview
          </p>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>

        <DashboardMetrics />
        <TaskList/>

      </div>
    </main>
  );
}