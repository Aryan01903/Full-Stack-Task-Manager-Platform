import UserModel from "../models/user.js";
import type { IUser } from "../types/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type ServiceResponse<T> = {
  data: T | null;
  status: boolean;
  token?: string;
};

class UserService {
  static async register(data: IUser): Promise<ServiceResponse<InstanceType<typeof UserModel>>> {
    const response: ServiceResponse<InstanceType<typeof UserModel>> = {
      data: null,
      status: false,
    };

    try {
      const existingUser = await UserModel.findOne({ email: data.email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = bcrypt.hashSync(data.password, 10);

      const newUser = new UserModel({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      response.data = newUser;
      response.status = true;
      response.token = token;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async login(
    email: string,
    password: string
  ): Promise<ServiceResponse<InstanceType<typeof UserModel>>> {
    const response: ServiceResponse<InstanceType<typeof UserModel>> = {
      data: null,
      status: false,
    };

    try {
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        throw new Error("User not found");
      }

      const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      response.data = existingUser;
      response.status = true;
      response.token = token;

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;