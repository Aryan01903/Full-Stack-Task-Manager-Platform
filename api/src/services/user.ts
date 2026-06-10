import UserModel from "../models/user.js";
import type { IUser } from "../types/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type AuthResponse = {
  user: InstanceType<typeof UserModel>;
  token: string;
};

type ServiceResponse<T> = {
  data: T | null;
  status: boolean;
};

class UserService {
  static async register(
  data: IUser
): Promise<ServiceResponse<AuthResponse>> {
  const response: ServiceResponse<AuthResponse> = {
    data: null,
    status: false,
  };

  const existingUser = await UserModel.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = bcrypt.hashSync(
    data.password,
    10
  );

  const newUser = new UserModel({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  response.data = {
    user: newUser,
    token,
  };

  response.status = true;

  return response;
}

  static async login(
  email: string,
  password: string
): Promise<ServiceResponse<AuthResponse>> {
  const response: ServiceResponse<AuthResponse> = {
    data: null,
    status: false,
  };

  const existingUser = await UserModel.findOne({
    email,
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordValid =
    bcrypt.compareSync(
      password,
      existingUser.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  response.data = {
    user: existingUser,
    token,
  };

  response.status = true;

  return response;
}
}

export default UserService;