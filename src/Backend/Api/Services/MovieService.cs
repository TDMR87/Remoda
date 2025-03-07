namespace Api.Services;

public class MovieService(HttpClient httpClient) : IDisposable
{
    public async Task<MovieSearchResults> SearchByKeywordAsync(string keyword, int page, CancellationToken cancellationToken = default)
    {
        var results = new MovieSearchResults();

        while (results.Movies.Count < 16)
        {
            var httpResponse = await httpClient.GetAsync(
                $"search/multi?query={keyword}&include_adult=false&page={page}", cancellationToken);

            if (httpResponse.IsSuccessStatusCode)
            {
                var result = await httpResponse.Content.ReadFromJsonAsync<MovieSearchResults>(cancellationToken) ?? new();

                results.TotalResults = result.TotalResults;
                results.TotalPages = result.TotalPages;
                results.Page = result.Page;

                results.Movies.AddRange(result.Movies.Where(movie =>
                    movie.Title is not null &&
                    (movie.PosterPath is not null || movie.BackdropPath is not null))
                    .OrderByDescending(movie => movie.Popularity)
                    .ThenBy(movie => movie.VoteCount)
                    .ToList());
            }

            page++;

            if (page >= results.TotalPages) break;
        }

        return results;
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
