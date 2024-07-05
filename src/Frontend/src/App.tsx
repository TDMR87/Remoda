import { MainLayout } from './Layouts/MainLayout';
import { MovieSearchPage } from './Pages/MovieSearchPage'
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
        <Route index element={<MovieSearchPage />} />
        <Route path='/movie/:id' element={<MovieDetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App
