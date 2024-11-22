"use client";
import React, { useContext, createContext, useState, useEffect, useMemo, ReactNode } from "react";
import { userApi } from "../../utlis/userApi";
import { setAuthToken, axiosInstance } from "@/utlis/axiosInstance";

const UserContext = createContext<UserContextState>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  token: null,
  fetchUserProperties: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setAuthToken(storedToken);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserProperties = async () => {
    try {
      if (user?.id) {
        const response = await axiosInstance.get(`/api/user/${user.id}/properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser((prevUser) => ({
          ...prevUser!,
          properties: response.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching user properties:", error);
    }
  };

  const login = async (data: UserLogin): Promise<void> => {
    try {
      const loginResponse = await userApi.loginUser(data);
      setToken(loginResponse.token);
      localStorage.setItem("token", loginResponse.token);
      setAuthToken(loginResponse.token);
      await fetchUser();
      window.location.href = "/"; // Redirect after login
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const register = async (user: UserRegister): Promise<void> => {
    try {
      const registeredResponse = await userApi.registerUser(user);
      setToken(registeredResponse.token);
      localStorage.setItem("token", registeredResponse.token);
      setAuthToken(registeredResponse.token);
      await fetchUser();
    } catch (error: any) {
      console.error("Registration error", error);
      throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.href = "/";
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      token,
      fetchUserProperties,
    }),
    [user, token]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
