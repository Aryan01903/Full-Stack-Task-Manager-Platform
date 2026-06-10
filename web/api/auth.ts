import axios from "@/lib/axios";
import { ILoginResponse, IUserPayload } from "@/types/api-response/user";
import { TResponse } from "@/types/common";

export const registerUser = async (data: Partial<IUserPayload>) => {
  const res = await axios.post<TResponse<ILoginResponse>>(
    "/auth/register",
    data
  );
  return res.data.data;
};


export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post<TResponse<ILoginResponse>>(
    "/auth/login",
    data
  );
  return res.data.data;
};
