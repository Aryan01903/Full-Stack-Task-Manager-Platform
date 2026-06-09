import { Router } from "express";
import UserController from "./controller.js";

const userRoutes = Router();

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);


export default userRoutes;