import logo from '../assets/images/remoda-icon.png';
import { useAppContext } from '../Contexts/AppContext';
import { MdLightMode } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

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

  const {
    isDarkMode,
    isSearchActive,
    colorSchemes,
    toggleDarkMode } = useAppContext();

  return (
    <>
      <section className={`py-4 ${isDarkMode ? 'bg-gray-950' : 'bg-sky-700'}`} style={heroStyle}>
        <div className={`max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ${location.pathname == "/" && !isSearchActive ? 'h-56' : 'h-18'}`}>
          <div className="absolute top-4 right-4">
            {isDarkMode
              ? <MdLightMode color='gray' onClick={toggleDarkMode} className="h-6 w-6 cursor-pointer hover:text-gray-800" />
              : <MdLightMode color='white' onClick={toggleDarkMode} className="h-6 w-6 cursor-pointer hover:text-gray-200" />}
          </div>
          <Link to="/" className="block">
            <div className='flex'>
              <img className="h-10 md:h-16 lg:h-20 w-auto" src={logo} alt="Remoda" />
              <h1 className={`font-extrabold lg:text-4xl md:text-4xl text-3xl ${colorSchemes.heroText}`}>
                {Title}
                <p className='text-lg'>The world's quickest movie search</p>
                <p className='text-[8px] text-gray-400 italic leading-none'>*claim based on internal enthusiasm. Your results may vary.</p>
              </h1>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}