import { Outlet } from 'react-router-dom'
import { Hero } from '../Components/Hero'
import { useAppContext } from '../Contexts/AppContext';
import { Footer } from '../Components/Footer';

export const MainLayout = () => {
  const { colorSchemes } = useAppContext();

  return (
    <>
      <div className={`flex flex-col items-center h-100 min-h-screen ${colorSchemes.background}`}>
        <Hero Title='Remoda' />
        <div className="flex-grow lg:mt-12 mt-6">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}