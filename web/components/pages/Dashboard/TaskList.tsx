"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { useGetAllTasks } from "@/hooks/task";
import TaskTable from "./TaskTable";
import TaskFormModal from "@/components/custom/modals/taskModal";

type StatusFilter = "all" | "pending" | "completed";

export default function TaskList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [openModal, setOpenModal] = useState(false);

  const { data: tasks, isLoading, isError } = useGetAllTasks({
    search: search || undefined,
    status: status === "all" ? undefined : status,
  });

  const filters: StatusFilter[] = ["all", "pending", "completed"];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium tracking-widest uppercase text-[#EE6C0E] mb-1">
            Tasks
          </p>
          <h2 className="text-2xl font-bold text-white">My tasks</h2>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 self-start sm:self-auto bg-[#EE6C0E] hover:bg-[#d45f0a] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200"
        >
          <Plus size={16} />
          New task
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892A4]"
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111827] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[#8892A4] outline-none focus:border-[#EE6C0E]/40 transition-colors duration-200"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#111827] border border-white/[0.06] rounded-lg p-1">
          <SlidersHorizontal size={14} className="text-[#8892A4] ml-1 mr-1" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors duration-200
                ${status === f
                  ? "bg-[#EE6C0E] text-white"
                  : "text-[#8892A4] hover:text-white"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <TaskTable
        tasks={tasks ?? []}
        isLoading={isLoading}
        isError={isError}
      />

      {openModal && (
        <TaskFormModal
          mode="create"
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}