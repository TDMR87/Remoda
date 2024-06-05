import logo from '../assets/images/logo.png'

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
  return (
    <>
      <section className="bg-sky-700 py-4 mb-4" style={heroStyle}>
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <div className="flex">
              <img className="h-5 w-auto" src={logo} alt="Remoda" />
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                {Title}
              </h1>
            </div>
            <p className="my-1 text-xl text-white">
              {Subtitle}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}