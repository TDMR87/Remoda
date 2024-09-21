interface MovieSearchResults {
  page: number;
  results: MovieDetails[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails {
  imageBaseAddress: string;
  budget: number;
  homepage?: string | null;
  id: number;
  imdbId?: string | null;
  originalLanguage?: string | null;
  originalTitle?: string | null;
  overview?: string | null;
  popularity: number;
  poster_path?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  revenue: number;
  runtime: number;
  status?: string | null;
  tagline?: string | null;
  title?: string | null;
  genres?: Genre[];
}

interface Genre {
  id: number;
  name: string;
}