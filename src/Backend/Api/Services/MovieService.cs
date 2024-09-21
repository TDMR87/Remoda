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
                (movie.PosterPath is not null || movie.BackdropPath is not null))
                .OrderByDescending(movie => movie.Popularity).ThenBy(movie => movie.VoteCount)
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

        return response.IsSuccessStatusCode
            ? await response.Content.ReadFromJsonAsync<MovieDetails>()
            : null;
    }

    public void Dispose() => httpClient?.Dispose();
}
