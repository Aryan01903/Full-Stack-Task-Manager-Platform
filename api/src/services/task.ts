import TaskModel from "../models/task.js";
import type { ITask } from "../types/task.js";

type ServiceResponse<T> = {
  data: T | null;
  status: boolean;
};

class TaskService {
  static async getAllTasks(
    userId: string,
    filters?: { status?: "pending" | "completed"; search?: string }
  ): Promise<ServiceResponse<InstanceType<typeof TaskModel>[]>> {
    const response: ServiceResponse<InstanceType<typeof TaskModel>[]> = {
      data: null,
      status: false,
    };

    try {
      const query: Record<string, unknown> = { userId };

      if (filters?.status) {
        query.status = filters.status;
      }

      if (filters?.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: "i" } },
          { description: { $regex: filters.search, $options: "i" } },
        ];
      }

      const tasks = await TaskModel.find(query).sort({ createdAt: -1 });

      response.data = tasks;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getTaskById(
    taskId: string,
    userId: string
  ): Promise<ServiceResponse<InstanceType<typeof TaskModel>>> {
    const response: ServiceResponse<InstanceType<typeof TaskModel>> = {
      data: null,
      status: false,
    };

    try {
      const task = await TaskModel.findOne({ _id: taskId, userId });
      if (!task) {
        throw new Error("Task not found");
      }

      response.data = task;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async createTask(
    data: Omit<ITask, "createdAt" | "updatedAt">,
    userId: string
  ): Promise<ServiceResponse<InstanceType<typeof TaskModel>>> {
    const response: ServiceResponse<InstanceType<typeof TaskModel>> = {
      data: null,
      status: false,
    };

    try {
      const newTask = new TaskModel({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status ?? "pending",
        userId,
      });

      await newTask.save();

      response.data = newTask;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async updateTask(
    taskId: string,
    userId: string,
    updates: Partial<Pick<ITask, "title" | "description" | "status" | "dueDate">>
  ): Promise<ServiceResponse<InstanceType<typeof TaskModel>>> {
    const response: ServiceResponse<InstanceType<typeof TaskModel>> = {
      data: null,
      status: false,
    };

    try {
      const task = await TaskModel.findOneAndUpdate(
        { _id: taskId, userId },
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!task) {
        throw new Error("Task not found or unauthorized");
      }

      response.data = task;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async deleteTask(
    taskId: string,
    userId: string
  ): Promise<ServiceResponse<null>> {
    const response: ServiceResponse<null> = {
      data: null,
      status: false,
    };

    try {
      const task = await TaskModel.findOneAndDelete({ _id: taskId, userId });

      if (!task) {
        throw new Error("Task not found or unauthorized");
      }

      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getTaskStats(userId: string){
    const response: ServiceResponse<{
      total: number;
      completed: number;
      pending: number;
      completionPercentage: number;
    }> = {
      data: null,
      status: false,
    };

    try {
      const [total, completed] = await Promise.all([
        TaskModel.countDocuments({ userId }),
        TaskModel.countDocuments({ userId, status: "completed" }),
      ]);

      const pending = total - completed;
      const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

      response.data = { total, completed, pending, completionPercentage };
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default TaskService;