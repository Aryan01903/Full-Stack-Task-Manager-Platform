"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id?: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;

  taskPilotToken: string | null;

  login: (data: AuthResponse) => void;

  logout: () => void;

  setUser: (user: User | null) => void;

  isAuthenticated: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUserState] =
    useState<User | null>(null);

  const [
    taskPilotToken,
    setTaskPilotToken,
  ] = useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const storedToken =
        localStorage.getItem(
          "taskPilotToken"
        );

      const storedUser =
        localStorage.getItem(
          "taskPilotUser"
        );

      if (
        storedToken &&
        storedUser
      ) {
        setTaskPilotToken(
          storedToken
        );

        setUserState(
          JSON.parse(storedUser)
        );
      }
    } catch (error) {
      console.error(
        "Auth restore failed:",
        error
      );

      localStorage.removeItem(
        "taskPilotToken"
      );

      localStorage.removeItem(
        "taskPilotUser"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const setUser = (
    user: User | null
  ) => {
    if (user) {
      localStorage.setItem(
        "taskPilotUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "taskPilotUser"
      );
    }

    setUserState(user);
  };

  const login = (
    data: AuthResponse
  ) => {
    localStorage.setItem(
      "taskPilotToken",
      data.token
    );

    localStorage.setItem(
      "taskPilotUser",
      JSON.stringify(data.user)
    );

    setTaskPilotToken(
      data.token
    );

    setUserState(data.user);
  };

  const logout = () => {
    localStorage.removeItem(
      "taskPilotToken"
    );

    localStorage.removeItem(
      "taskPilotUser"
    );

    setTaskPilotToken(null);

    setUserState(null);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        taskPilotToken,
        login,
        logout,
        setUser,
        isAuthenticated:
          !!taskPilotToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};