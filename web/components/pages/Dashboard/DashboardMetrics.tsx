"use client";

import { CheckCheck, Clock, ListTodo, TrendingUp } from "lucide-react";
import { useGetTaskStats } from "@/hooks/task";
import { useAuth } from "@/utils/store/authStore";

const metricConfig = [
  {
    key: "total" as const,
    label: "Total tasks",
    icon: ListTodo,
    sub: (v: number) => `${v} tasks added`,
    accent: false,
  },
  {
    key: "completed" as const,
    label: "Completed",
    icon: CheckCheck,
    sub: (v: number, pct: number) => `${pct}% completion rate`,
    accent: true,
  },
  {
    key: "pending" as const,
    label: "Pending",
    icon: Clock,
    sub: (v: number) => `${v} still remaining`,
    accent: false,
  },
  {
    key: "completionPercentage" as const,
    label: "Completion rate",
    icon: TrendingUp,
    sub: (_v: number, _pct: number, completed: number, total: number) =>
      `${completed} of ${total} done`,
    accent: false,
    isPercent: true,
  },
];

function MetricCardSkeleton() {
  return (
    <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-5 flex flex-col gap-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-white/[0.06]" />
      <div className="flex flex-col gap-2">
        <div className="h-8 w-16 rounded bg-white/[0.06]" />
        <div className="h-3 w-20 rounded bg-white/[0.06]" />
        <div className="h-3 w-24 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

export default function DashboardMetrics() {
  const { data: stats, isLoading, isError } = useGetTaskStats();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="rounded-xl bg-[#111827] border border-red-500/20 p-5 text-sm text-red-400">
        Failed to load stats. Please refresh.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricConfig.map((metric) => {
          const Icon = metric.icon;
          const value = stats[metric.key];
          const displayValue = metric.isPercent ? `${value}%` : value;
          const subText = metric.sub(
            value,
            stats.completionPercentage,
            stats.completed,
            stats.total
          );

          return (
            <div
              key={metric.key}
              className={`
                rounded-xl p-5 flex flex-col gap-4 border transition-colors duration-200
                ${metric.accent
                  ? "bg-[#EE6C0E]/10 border-[#EE6C0E]/30 hover:border-[#EE6C0E]/50"
                  : "bg-[#111827] border-white/[0.06] hover:border-[#EE6C0E]/30"
                }
              `}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${metric.accent ? "bg-[#EE6C0E]/20" : "bg-[#EE6C0E]/10"}
                `}
              >
                <Icon size={20} className="text-[#EE6C0E]" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white">
                  {displayValue}
                </span>
                <span className="text-xs font-medium text-white/70">
                  {metric.label}
                </span>
                <span className="text-xs text-[#8892A4]">{subText}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">
            Overall completion
          </span>
          <span className="text-sm font-medium text-[#EE6C0E]">
            {stats.completionPercentage}%
          </span>
        </div>

        <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#EE6C0E] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-xs text-[#8892A4]">
            {stats.completed} of {stats.total} tasks done
          </span>
          <span className="text-xs text-[#8892A4]">
            {stats.pending} remaining
          </span>
        </div>
      </div>
    </div>
  );
}