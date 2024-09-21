import React, { FC, ReactNode, useContext, useEffect } from "react";
import { useState } from "react";

export const DarkModeContext = React.createContext<DarkModeContextProps>(undefined!);

interface DarkModeContextProps {
  isDarkMode: boolean;
  colorSchemes: ColorSchemes;
  toggleDarkMode: () => void;
}

export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
  children?: ReactNode;
}

type ColorSchemes = {
  background: string;
  backgroundSkeleton: string;
  backgroundCard: string;
  heroText: string;
  text: string;
  linkHover: string;
};

export const DarkModeProvider: FC<DarkModeProviderProps> = ({ children }) => {

  const [isDarkMode, setDarkMode] = useState(false);

  const colorSchemes = {
    background: isDarkMode ? 'bg-slate-900' : 'bg-gray-200',
    backgroundSkeleton: isDarkMode ? 'bg-stone-600' : 'bg-stone-200',
    backgroundCard: isDarkMode ? 'bg-slate-800' : 'bg-stone-100',
    text: isDarkMode ? 'text-gray-200' : 'text-gray-600',
    heroText: isDarkMode ? 'text-gray-200' : 'text-gray-200',
    linkHover: isDarkMode ? 'hover:text-slate-600' : 'hover:text-stone-400'
  };

  const toggleDarkMode = () => {
    localStorage.setItem('isDarkMode', (!isDarkMode).toString())
    setDarkMode(!isDarkMode);
  }

  useEffect(() => {
    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode) {
      setDarkMode(JSON.parse(darkMode));
    }
  }, []);

  return (
    <>
      <DarkModeContext.Provider value={{ isDarkMode, colorSchemes, toggleDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    </>
  )
}