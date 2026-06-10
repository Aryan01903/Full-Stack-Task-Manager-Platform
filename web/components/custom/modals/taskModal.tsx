"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateTask, useUpdateTask } from "@/hooks/task";
import type { ITask } from "@/types/api-response/task";

interface TaskFormModalProps {
  mode: "create" | "edit";
  task?: ITask;
  onClose: () => void;
}

interface FormState {
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}

export default function TaskFormModal({
  mode,
  task,
  onClose,
}: TaskFormModalProps) {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(
    task?._id ?? ""
  );

  const isPending = isCreating || isUpdating;

  // edit mode mein form prefill karo
  useEffect(() => {
    if (mode === "edit" && task) {
      setForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.split("T")[0] ?? "",
        status: task.status,
      });
    }
  }, [mode, task]);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.dueDate) newErrors.dueDate = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (mode === "create") {
      createTask(
        {
          title: form.title,
          description: form.description,
          dueDate: form.dueDate,
          status: form.status,
        },
        { onSuccess: onClose }
      );
    } else {
      updateTask(
        {
          title: form.title,
          description: form.description,
          dueDate: form.dueDate,
          status: form.status,
        },
        { onSuccess: onClose }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#111827] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {mode === "create" ? "New task" : "Edit task"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8892A4] hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#8892A4]">
              Title
            </label>
            <input
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              className="bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#8892A4] outline-none focus:border-[#EE6C0E]/40 transition-colors duration-200"
            />
            {errors.title && (
              <span className="text-xs text-red-400">{errors.title}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#8892A4]">
              Description
            </label>
            <textarea
              placeholder="Task description"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
              className="bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#8892A4] outline-none focus:border-[#EE6C0E]/40 transition-colors duration-200 resize-none"
            />
            {errors.description && (
              <span className="text-xs text-red-400">
                {errors.description}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#8892A4]">
                Due date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, dueDate: e.target.value }))
                }
                className="bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#EE6C0E]/40 transition-colors duration-200 [color-scheme:dark]"
              />
              {errors.dueDate && (
                <span className="text-xs text-red-400">{errors.dueDate}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#8892A4]">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    status: e.target.value as "pending" | "completed",
                  }))
                }
                className="bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#EE6C0E]/40 transition-colors duration-200"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-[#8892A4] hover:text-white border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-[#EE6C0E] hover:bg-[#d45f0a] text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {mode === "create" ? "Create task" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}