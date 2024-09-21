import { Outlet } from 'react-router-dom'
import { Hero } from '../Components/Hero'
import { useDarkMode } from '../Contexts/DarkModeContext';
import { Footer } from '../Components/Footer';

export const MainLayout = () => {
  const { colorSchemes } = useDarkMode();

  return (
    <>
      <div className={`flex flex-col items-center h-100 min-h-screen ${colorSchemes.background}`}>
        <Hero Title='Remoda' Subtitle='React movie database' />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}