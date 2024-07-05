import { Outlet } from 'react-router-dom'
import { Hero } from '../Components/Hero'
import { useDarkMode } from '../Hooks/DarkModeContext';

export const MainLayout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <div className={`flex flex-col items-center h-100 min-h-screen ${isDarkMode ? 'bg-slate-800' : 'bg-white-700'}`}>
        <Hero Title='Remoda' Subtitle='React movie database' />
        <Outlet />
      </div>
    </>
  )
}