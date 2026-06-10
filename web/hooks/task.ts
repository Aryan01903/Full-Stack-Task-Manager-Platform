import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from "@/api/task";
import type { ITaskFilters, ITaskPayload } from "@/types/api-response/task";

const TASK_KEYS = {
  all: ["tasks"] as const,
  list: (filters?: ITaskFilters) => ["tasks", "list", filters] as const,
  detail: (id: string) => ["tasks", "detail", id] as const,
  stats: ["tasks", "stats"] as const,
};

export const useGetAllTasks = (filters?: ITaskFilters) => {
  return useQuery({
    queryKey: TASK_KEYS.list(filters),
    queryFn: () => getAllTasks(filters),
  });
};

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryKey: TASK_KEYS.detail(id),
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
};

export const useGetTaskStats = () => {
  return useQuery({
    queryKey: TASK_KEYS.stats,
    queryFn: getTaskStats,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ITaskPayload) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.stats });
    },
  });
};

export const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ITaskPayload>) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.stats });
    },
  });
};

export const useMarkTaskCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      updateTask(id, { status: "completed" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.stats });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.stats });
    },
  });
};