import { Router } from "express";
import TaskController from "./controller.js";
import { authMiddleware } from "../../middleware/authMW.js";

const taskRoutes = Router();

taskRoutes.use(authMiddleware);

taskRoutes.get("/stats", TaskController.getTaskStats);  
taskRoutes.get("/", TaskController.getAllTasks);         
taskRoutes.get("/:id", TaskController.getTaskById);     
taskRoutes.post("/", TaskController.createTask);       
taskRoutes.patch("/:id", TaskController.updateTask); 
taskRoutes.delete("/:id", TaskController.deleteTask);   

export default taskRoutes;