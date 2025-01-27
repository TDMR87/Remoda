import React, { FC, ReactNode, useContext, useEffect } from "react";
import { useState } from "react";

interface AppContextProps {
  isDarkMode: boolean;
  isSearchMode: boolean;
  colorSchemes: ColorSchemes;
  toggleDarkMode: () => void;
  setSearchMode: (val: boolean) => void;
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
  const [isSearchMode, setSearchMode] = useState(false);

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

  const toggleSearching = (val: boolean) => {
    setSearchMode(val);
  }

  useEffect(() => {
    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode) {
      setDarkMode(JSON.parse(darkMode));
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ isDarkMode, isSearchMode, colorSchemes, toggleDarkMode, setSearchMode: toggleSearching }}>
        {children}
      </AppContext.Provider>
    </>
  )
}