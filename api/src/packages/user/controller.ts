import type { Request, Response } from "express";
import UserService from "../../services/user.js";

class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Name, email and password are required",
        });
        return;
      }

      const result = await UserService.register({ name, email, password });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: result.data?._id,
            name: result.data?.name,
            email: result.data?.email,
          },
          token: result.token,
        },
      });
    } catch (err: any) {
      if (err.message === "User already exists") {
        res.status(409).json({
          success: false,
          message: err.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      const result = await UserService.login(email, password);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: result.data?._id,
            name: result.data?.name,
            email: result.data?.email,
          },
          token: result.token,
        },
      });
    } catch (err: any) {
      if (err.message === "User not found") {
        res.status(404).json({
          success: false,
          message: err.message,
        });
        return;
      }

      if (err.message === "Invalid credentials") {
        res.status(401).json({
          success: false,
          message: err.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

}

export default UserController;