// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { OpenAPI, User } from "../api";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(
    null
  );

  OpenAPI.HEADERS = { "X-API-KEY": user?.token || "" };
  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("token", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Add any additional logic here to check token validity, e.g., expiration.
    try {
      const userString = localStorage.getItem("user")
      if (userString != null)
      {
        const storageUser = JSON.parse(userString)
        setUser(storageUser)
      }

    } catch (error) {
      
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
