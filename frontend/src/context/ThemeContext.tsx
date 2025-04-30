import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  unsavedToggleDarkMode: (darkMode: boolean | undefined) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [userDidSetDarkMode, setUserDidSetDarkMode] = useState(darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
    setUserDidSetDarkMode(!darkMode);
  };

  const unsavedToggleDarkMode = (darkMode: boolean | undefined) => {
    if (darkMode === undefined) {
      setDarkMode(userDidSetDarkMode);
    }
    setDarkMode(darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleDarkMode, unsavedToggleDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
