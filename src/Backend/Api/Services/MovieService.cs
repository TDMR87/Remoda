namespace Api.Services;

public class MovieService(HttpClient httpClient) : IDisposable
{
    public async Task<MovieSearchResults> SearchByKeywordAsync(string keyword, int page, CancellationToken cancellationToken = default)
    {
        var httpResponse = await httpClient.GetAsync(
            $"search/multi?query={keyword}&include_adult=false&page={page}", 
            cancellationToken);

        if (httpResponse.IsSuccessStatusCode)
        {
            var results = await httpResponse.Content.ReadFromJsonAsync<MovieSearchResults>(cancellationToken) ?? new();

            results.Movies = results.Movies.Where(
                movie =>
                movie.Title is not null &&
                (movie.PosterPath is not null || movie.BackdropPath is not null))
                .OrderByDescending(movie => movie.Popularity)
                .ThenBy(movie => movie.VoteCount)
                .ToList();

            return results;
        }
        else
        {
            return new MovieSearchResults();
        }
    }

    public async Task<MovieDetails?> GetByIdAsync(string movieId, CancellationToken cancellationToken = default)
    {
        var response = await httpClient.GetAsync($"movie/{movieId}", cancellationToken);

        return response.IsSuccessStatusCode
            ? await response.Content.ReadFromJsonAsync<MovieDetails>(cancellationToken)
            : null;
    }

    public void Dispose() => httpClient?.Dispose();
}
