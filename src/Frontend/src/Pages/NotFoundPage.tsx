import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <>
      <br></br>
      <section className="pt-50 text-center flex flex-col justify-center items-center h-96">
        <i className="fas fa-exclamation-triangle text-yellow-400 fa-4x mb-4"></i>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-5">Oops, there's nothing here..</p>
        <Link to='/' className="text-white bg-sky-700 hover:bg-sky-900 rounded-md px-3 py-2 mt-4">
          Go back
        </Link>
      </section>
    </>
  )
}