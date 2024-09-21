import logo from '../assets/images/logo.png'
import { useDarkMode } from '../Contexts/DarkModeContext';
import { MdLightMode } from "react-icons/md";

export interface HeroProps {
  Title: string,
  Subtitle: string
}

const heroStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 1
};

export const Hero = ({ Title, Subtitle }: HeroProps) => {

  const { isDarkMode, colorSchemes, toggleDarkMode } = useDarkMode();

  return (
    <>
      <section className={`py-4 ${isDarkMode ? 'bg-gray-950' : 'bg-sky-700'}`} style={heroStyle}>
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="absolute top-4 right-4">
            {isDarkMode
              ? <MdLightMode color='gray' onClick={toggleDarkMode} className="h-6 w-6 cursor-pointer hover:text-gray-800" />
              : <MdLightMode color='white' onClick={toggleDarkMode} className="h-6 w-6 cursor-pointer hover:text-gray-200" />}
          </div>
          <div className="text-center">
            <div className="flex">
              <img className="h-5 w-auto" src={logo} alt="Remoda" />
              <h1 className={`text-4xl font-extrabold text-5xl ${colorSchemes.heroText}`}>
                {Title}
              </h1>
            </div>
            <div className={`my-1 text-xl ${colorSchemes.heroText}`}>
              {Subtitle}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}