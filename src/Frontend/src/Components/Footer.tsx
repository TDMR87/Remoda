import { useDarkMode } from '../Contexts/DarkModeContext';

export const Footer = () => {

  const { isDarkMode, colorSchemes } = useDarkMode();

  return (
    <div className={`${isDarkMode ? 'bg-gray-950' : 'bg-sky-700'} w-full h-10 flex justify-center items-center`}>
      <p className={`${colorSchemes.heroText}`}>Copyright &#169; 2024 Diego Rönkkömäki-Tapia</p>
    </div>
  )
}