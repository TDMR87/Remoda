namespace Api.Models;

public class MovieDetailsResults
{
    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("results")]
    public List<MovieDetails> Results { get; set; } = [];
}