
import type { Request, Response } from "express";
import TaskService from "../../services/task.js";

class TaskController {
  static async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { status, search } = req.query;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const filters: { status?: "pending" | "completed"; search?: string } = {};

      if (status === "pending" || status === "completed") {
        filters.status = status;
      }

      if (search && typeof search === "string") {
        filters.search = search;
      }

      const result = await TaskService.getAllTasks(userId, filters);

      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: result.data,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const id = req.params.id as string;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const result = await TaskService.getTaskById(id, userId);

      res.status(200).json({
        success: true,
        message: "Task fetched successfully",
        data: result.data,
      });
    } catch (err: any) {
      if (err.message === "Task not found") {
        res.status(404).json({ success: false, message: err.message });
        return;
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { title, description, dueDate, status } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      if (!title || !description || !dueDate) {
        res.status(400).json({
          success: false,
          message: "Title, description and dueDate are required",
        });
        return;
      }

      const result = await TaskService.createTask(
        { title, description, dueDate, status, userId },
        userId
      );

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: result.data,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const id = req.params.id as string;
      const { title, description, status, dueDate } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      if (!title && !description && !status && !dueDate) {
        res.status(400).json({
          success: false,
          message: "At least one field is required to update",
        });
        return;
      }

      const result = await TaskService.updateTask(id, userId, {
        title,
        description,
        status,
        dueDate,
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: result.data,
      });
    } catch (err: any) {
      if (err.message === "Task not found or unauthorized") {
        res.status(404).json({ success: false, message: err.message });
        return;
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const id = req.params.id as string; 

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      await TaskService.deleteTask(id, userId);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: null,
      });
    } catch (err: any) {
      if (err.message === "Task not found or unauthorized") {
        res.status(404).json({ success: false, message: err.message });
        return;
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getTaskStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const result = await TaskService.getTaskStats(userId);

      res.status(200).json({
        success: true,
        message: "Stats fetched successfully",
        data: result.data,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

export default TaskController;