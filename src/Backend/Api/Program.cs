var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options
    .AddPolicy("default-policy", policy => policy
    .WithOrigins("http://localhost:5001", "https://remoda.azurewebsites.net")
    .WithMethods("GET")));

builder.Services.AddHttpClient<MovieService>((httpClient) =>
{
    httpClient.BaseAddress = new Uri(builder.Configuration["MovieDatabase:ApiBaseAddress"]!);
    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue
    (
        "Bearer", builder.Configuration["MovieDatabase:ApiAccessToken"]
    );
}).AddStandardResilienceHandler();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors("default-policy");

app.MapGet("api/search", async (MovieService movieService, [FromQuery] string keyword, [FromQuery] int page = 1) =>
{
    return await movieService.SearchByKeywordAsync(keyword, page);
});

app.MapGet("api/movie/{id}", async (MovieService movieService, string id) =>
{
    return await movieService.GetByIdAsync(id);
});

app.Run();