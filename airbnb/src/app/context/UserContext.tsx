import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { userApi } from "../../utlis/userApi";
import { setAuthToken, axiosInstance } from "@/utlis/axiosInstance";

type UserContextState = {
  user: UserRecord | null;
  login: (user: UserLogin) => Promise<void>; // Make login async and return Promise<void>
  register: (user: UserRegister) => Promise<void>; // Make register async and return Promise<void>
  logout: () => void;
  token: string | null;
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  bookings?: Booking[];
};

type AuthResponse = {
  token: string;
  status?: number;
};

const UserContext = createContext<UserContextState>({
  user: null,
  login: async () => {}, // Updated to async
  register: async () => {}, // Updated to async
  logout: () => {},
  token: null,
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
      // Assuming you have a way to get the JWT token
      const token = localStorage.getItem("token"); // or any other way you're storing the token

      const response = await axiosInstance.get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const login = async ({ email, password }: UserLogin): Promise<void> => {
    try {
      const loginResponse = await userApi.loginUser({ email, password });
      setToken(loginResponse.token);
      localStorage.setItem("token", loginResponse.token);
      setAuthToken(loginResponse.token); // Set the token for axios instance
      await fetchUser(); // Fetch user after login
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const register = async (user: UserRegister): Promise<void> => {
    try {
      const registeredResponse = await userApi.registerUser(user);
      setToken(registeredResponse.token);
      localStorage.setItem("token", registeredResponse.token);
      setAuthToken(registeredResponse.token); // Sätt token för axios instance
      await fetchUser(); // Hämta användardata efter registrering
    } catch (error: any) {
      // Logga mer detaljerat felmeddelande för att felsöka
      console.error("Registration error", error);
      throw new Error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };
  

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setAuthToken(null); // Clear the token for axios instance
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
