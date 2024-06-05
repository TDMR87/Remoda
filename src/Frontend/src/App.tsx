import { MainLayout } from './Layouts/MainLayout';
import { HomePage } from './Pages/HomePage'
import { MovieDetailsPage } from './Pages/MovieDetailsPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/movie/:id' element={<MovieDetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App
