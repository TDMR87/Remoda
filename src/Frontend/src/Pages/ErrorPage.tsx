import { useAppContext } from '../Contexts/AppContext';

type ErrorProps = {
  Title: string;
  Text: string;
  HideBackButton?: boolean;
}

export const ErrorPage = ({ Title, Text }: ErrorProps) => {

  const { colorSchemes } = useAppContext();

  return (
    <>
      <section className="mt-82 text-center flex flex-col justify-center items-center h-96">
        <i className="fas fa-exclamation-triangle text-yellow-400 fa-4x mb-4"></i>
        <h1 className={`text-6xl font-bold mb-4 ${colorSchemes.text}`}>{Title}</h1>
        <p className={`text-xl mb-5 ${colorSchemes.text}`}>{Text}</p>
      </section>
    </>
  )
}