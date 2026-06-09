import { Router } from "express";
import TaskController from "./controller.js";
import { authMiddleware } from "../../middleware/authMW.js";

const router = Router();

router.use(authMiddleware);

router.get("/stats", TaskController.getTaskStats);  
router.get("/", TaskController.getAllTasks);         
router.get("/:id", TaskController.getTaskById);     
router.post("/", TaskController.createTask);       
router.patch("/:id", TaskController.updateTask); 
router.delete("/:id", TaskController.deleteTask);   

export default router;