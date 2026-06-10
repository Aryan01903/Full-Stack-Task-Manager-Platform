"use client";

import { loginUser, registerUser } from "@/api/auth";
import { IUserPayload } from "@/types/api-response/user";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: Partial<IUserPayload>) =>
      registerUser(data),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
    }) => loginUser(data),
  });
};