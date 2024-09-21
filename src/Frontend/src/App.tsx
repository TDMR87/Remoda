import { MainLayout } from './Layouts/MainLayout';
import { MovieDetailsPage } from './Pages/MovieDetailsPage';
import { ErrorPage } from './Pages/ErrorPage';
import { MovieSearchPage } from './Pages/MovieSearchPage';
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
        <Route path='*' element={<ErrorPage Title='404' Text="Oops, there's nothing here.." />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App
