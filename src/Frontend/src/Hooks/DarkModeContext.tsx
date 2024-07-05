import React, { FC, ReactNode, useContext } from "react";
import { useState } from "react";

interface Blaa {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
  children?: ReactNode;
}

const DarkModeContext = React.createContext<Blaa>({
  isDarkMode: true,
  toggleDarkMode: () => { }
});

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export const DarkModeProvider: FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <DarkModeContext.Provider value={{ isDarkMode: darkMode, toggleDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    </>
  )
}
