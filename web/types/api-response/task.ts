// src/types/api-response/task.ts
export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskStats {
  total: number;
  completed: number;
  pending: number;
  completionPercentage: number;
}

export interface ITaskFilters {
  status?: "pending" | "completed";
  search?: string;
}

export interface ITaskPayload {
  title: string;
  description: string;
  dueDate: string;
  status?: "pending" | "completed";
}