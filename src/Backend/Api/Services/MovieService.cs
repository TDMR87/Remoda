namespace Api.Services;

public class MovieService(HttpClient httpClient) : IDisposable
{
    public async Task<MovieSearchResults> SearchByKeywordAsync(string keyword, int page)
    {
        var httpResponse = await httpClient.GetAsync
        (
            $"search/multi?query={keyword}" +
            $"&include_adult=false" +
            $"&page={page}"
        );

        if (httpResponse.IsSuccessStatusCode)
        {
            var results = await httpResponse.Content.ReadFromJsonAsync<MovieSearchResults>() ?? new();

            results.Movies = results.Movies.Where(
                movie =>
                movie.Title is not null &&
                movie.PosterPath is not null)
                .OrderByDescending(movie => movie.ReleaseDate)
                .ToList();

            return results;
        }
        else
        {
            return new MovieSearchResults();
        }
    }

    public async Task<MovieDetails?> GetByIdAsync(string movieId)
    {
        var response = await httpClient.GetAsync($"movie/{movieId}");

        if (response.IsSuccessStatusCode)
        {
            var movie = await response.Content.ReadFromJsonAsync<MovieDetails>();
            return movie;
        }
        else
        {
            return null;
        }
    }

    public void Dispose() => httpClient?.Dispose();
}
