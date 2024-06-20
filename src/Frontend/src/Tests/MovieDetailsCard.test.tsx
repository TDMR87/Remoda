import { render, screen } from '@testing-library/react'
import { MovieDetailsCard } from '../Components/MovieDetailsCard'

const movieDetails: MovieDetails = {
  title: 'Test Movie Title',
  release_date: '1987-03-30',
  vote_average: 8.7,
  tagline: 'movie tagline',
  overview: 'Movie overview',
  runtime: 128,
  genres: [
    {
      id: 1,
      name: 'Action'
    },
    {
      id: 2,
      name: 'Thriller'
    }
  ],
  imageBaseAddress: '',
  budget: 0,
  id: 0,
  popularity: 0,
  revenue: 0
}

describe('MovieDetailsCard', () => {
  it('should render movie title', () => {
    render(<MovieDetailsCard movie={movieDetails} />)
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(movieDetails.title!)
  })

  it('should render movie release year', () => {
    render(<MovieDetailsCard movie={movieDetails} />)
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('1987')
  })
})