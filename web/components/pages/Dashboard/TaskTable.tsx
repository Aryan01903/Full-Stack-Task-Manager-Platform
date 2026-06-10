// src/components/dashboard/TaskTable.tsx
"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Pencil, Trash2, Calendar } from "lucide-react";
import { useDeleteTask, useMarkTaskCompleted } from "@/hooks/task";
import type { ITask } from "@/types/api-response/task";
import TaskFormModal from "@/components/custom/modals/taskModal";

interface TaskTableProps {
  tasks: ITask[];
  isLoading: boolean;
  isError: boolean;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-3.5 rounded bg-white/[0.06] animate-pulse w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function TaskTable({ tasks, isLoading, isError }: TaskTableProps) {
  const [editTask, setEditTask] = useState<ITask | null>(null);

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: markDone, isPending: isMarking } = useMarkTaskCompleted();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const isDueSoon = (date: string) => {
    const due = new Date(date);
    const now = new Date();
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 2;
  };

  const isOverdue = (date: string, status: string) => {
    return status === "pending" && new Date(date) < new Date();
  };

  if (isError) {
    return (
      <div className="rounded-xl bg-[#111827] border border-red-500/20 p-5 text-sm text-red-400">
        Failed to load tasks. Please refresh.
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#111827] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8892A4] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8892A4] uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8892A4] uppercase tracking-wider hidden md:table-cell">
                  Description
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8892A4] uppercase tracking-wider hidden sm:table-cell">
                  Due date
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#8892A4] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && tasks.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-[#8892A4] text-sm"
                  >
                    No tasks found. Create your first task!
                  </td>
                </tr>
              )}

              {!isLoading &&
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group"
                  >
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() =>
                          task.status === "pending" && markDone(task._id)
                        }
                        disabled={
                          task.status === "completed" || isMarking
                        }
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {task.status === "completed" ? (
                          <CheckCircle2 size={18} className="text-[#EE6C0E]" />
                        ) : (
                          <Circle
                            size={18}
                            className="text-[#8892A4] hover:text-[#EE6C0E] transition-colors"
                          />
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`font-medium ${
                          task.status === "completed"
                            ? "line-through text-[#8892A4]"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-[#8892A4] line-clamp-1 max-w-[200px]">
                        {task.description}
                      </span>
                    </td>

                    {/* Due date */}
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#8892A4]" />
                        <span
                          className={`text-xs ${
                            isOverdue(task.dueDate, task.status)
                              ? "text-red-400"
                              : isDueSoon(task.dueDate)
                              ? "text-yellow-400"
                              : "text-[#8892A4]"
                          }`}
                        >
                          {formatDate(task.dueDate)}
                          {isOverdue(task.dueDate, task.status) && " · Overdue"}
                          {isDueSoon(task.dueDate) &&
                            task.status === "pending" &&
                            " · Due soon"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          onClick={() => setEditTask(task)}
                          className="p-1.5 rounded-md bg-white/[0.04] hover:bg-[#EE6C0E]/10 hover:text-[#EE6C0E] text-[#8892A4] transition-colors duration-150"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          disabled={isDeleting}
                          className="p-1.5 rounded-md bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 text-[#8892A4] transition-colors duration-150 disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!isLoading && tasks.length > 0 && (
          <div className="px-4 py-3 border-t border-white/[0.06]">
            <span className="text-xs text-[#8892A4]">
              {tasks.length} task{tasks.length > 1 ? "s" : ""} found
            </span>
          </div>
        )}
      </div>

      {editTask && (
        <TaskFormModal
          mode="edit"
          task={editTask}
          onClose={() => setEditTask(null)}
        />
      )}
    </>
  );
}