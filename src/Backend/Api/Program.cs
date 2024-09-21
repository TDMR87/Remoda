var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddCors(options => options
    .AddDefaultPolicy(policy => policy
    .WithOrigins("http://localhost:5001", "https://remoda.azurewebsites.net")
    .WithMethods("GET")));

builder.Services.AddHttpClient<MovieService>((httpClient) =>
{
    httpClient.BaseAddress = 
        new(builder.Configuration["MovieDatabase:ApiBaseAddress"]!);

    httpClient.DefaultRequestHeaders.Authorization = 
        new("Bearer", builder.Configuration["MovieDatabase:ApiAccessToken"]);

}).AddStandardResilienceHandler();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors();

app.MapGet("api/search", async (
    MovieService movieService, 
    [FromQuery] string keyword, 
    [FromQuery] int page = 1,
    CancellationToken cancellationToken = default) 
    => await movieService.SearchByKeywordAsync(keyword, page));

app.MapGet("api/movie/{id}", async (
    MovieService movieService, 
    string id, 
    CancellationToken cancellationToken = default) 
    => await movieService.GetByIdAsync(id));

app.Run();