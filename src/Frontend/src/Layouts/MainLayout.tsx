import { Outlet } from 'react-router-dom'
import { Hero } from '../Components/Hero'

export const MainLayout = () => {
  return (
    <>
      <div className='flex flex-col items-center pb-10'>
        <Hero Title='Remoda' Subtitle='React movie database' />
        <Outlet />
      </div>
    </>
  )
}