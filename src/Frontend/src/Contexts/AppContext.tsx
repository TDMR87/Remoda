import React, { FC, ReactNode, useContext, useEffect } from "react";
import { useState } from "react";

interface AppContextProps {
  currentSearchTerm: string;
  isDarkMode: boolean;
  isSearchActive: boolean;
  colorSchemes: ColorSchemes;
  toggleDarkMode: () => void;
  setIsSearchActive: (val: boolean) => void;
  setSearchTerm: (val: string) => void;
}

interface AppContextProviderProps {
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

export const AppContext = React.createContext<AppContextProps>(undefined!);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentSearchTerm, setSearchTerm] = useState<string>('');
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
      <AppContext.Provider value={{
        currentSearchTerm,
        isDarkMode,
        isSearchActive,
        colorSchemes,
        toggleDarkMode,
        setIsSearchActive,
        setSearchTerm
      }}>
        {children}
      </AppContext.Provider>
    </>
  )
}