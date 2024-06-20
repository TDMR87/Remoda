# Remoda (React Movie Database)

Web app for searching movies, built with React (TypeScript) and .NET

Try the live demo at [remoda.azurewebsites.net](https://remoda.azurewebsites.net/).

*****

# Local development

This app utilizes a 3rd party API for movie data. To be able to fetch movie data when running this app locally, you need an account in [The Movie Database API] (check here https://developer.themoviedb.org/reference/intro/getting-started). When you have an account and an access token, set the access token in the API project's ``appsettings.json`` file or in [user secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows#set-a-secret) with key ``MovieDatabase:ApiAccessToken``

### How to run the app locally

1) Run the frontend from ``\src\Frontend`` with command:
*npm run dev*

2) Run the backend API from ``\src\Backend\Api`` with command:
*dotnet run*

3) Browse to ``http://localhost:5001``


