import axios from "@/lib/axios";
import type { ITask, ITaskStats, ITaskFilters, ITaskPayload } from "@/types/api-response/task";
import type { TResponse } from "@/types/common";

export const getAllTasks = async (filters?: ITaskFilters) => {
  const res = await axios.get<TResponse<ITask[]>>("/tasks", {
    params: filters,
  });
  return res.data.data;
};

export const getTaskById = async (id: string) => {
  const res = await axios.get<TResponse<ITask>>(`/tasks/${id}`);
  return res.data.data;
};

export const createTask = async (data: ITaskPayload) => {
  const res = await axios.post<TResponse<ITask>>("/tasks", data);
  return res.data.data;
};

export const updateTask = async (
  id: string,
  data: Partial<ITaskPayload>
) => {
  const res = await axios.patch<TResponse<ITask>>(`/tasks/${id}`, data);
  return res.data.data;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete<TResponse<null>>(`/tasks/${id}`);
  return res.data;
};

export const getTaskStats = async () => {
  const res = await axios.get<TResponse<ITaskStats>>("/tasks/stats");
  return res.data.data;
};
