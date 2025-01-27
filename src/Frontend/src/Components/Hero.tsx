import logo from '../assets/images/logo.png'
import { useAppContext } from '../Contexts/AppContext';
import { MdLightMode } from "react-icons/md";
import { useLocation } from 'react-router-dom';

export interface HeroProps {
  Title: string
}

const heroStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 1,
  transition: 'height 2s ease-in-out'
};


export const Hero = ({ Title }: HeroProps) => {

  const location = useLocation();
  const { isDarkMode, isSearchMode, colorSchemes, toggleDarkMode } = useAppContext();

  return (
    <>
      <section className={`py-4 ${isDarkMode ? 'bg-gray-950' : 'bg-sky-700'}`} style={heroStyle}>
        <div className={`max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ${location.pathname == "/" && !isSearchMode ? 'h-56' : 'h-16'}`}>
          <div className="absolute top-4 right-4">
            {isDarkMode
              ? <MdLightMode color='gray' onClick={toggleDarkMode} className="h-6 w-6 cursor-pointer hover:text-gray-800" />
              : <MdLightMode color='white' onClick={toggleDarkMode} className="h-6 w-6 cursor-pointer hover:text-gray-200" />}
          </div>
          <div className='flex'>
            <img className="h-5 w-auto" src={logo} alt="Remoda" />
            <h1 className={`font-extrabold lg:text-5xl md:text-5xl text-4xl ${colorSchemes.heroText}`}>
              {Title}
              <p className='text-lg'>The world's quickest movie search</p>
            </h1>
          </div>
        </div>
      </section>
    </>
  )
}