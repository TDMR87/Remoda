# Remoda (React Movie Database)

Web app for searching movies, built with React (TypeScript) and .NET

Try the live demo at [remoda.azurewebsites.net](https://remoda.azurewebsites.net/).

*****

# Local development

This app utilizes a 3rd party API for fetching movie data. 

To be able to fetch movie data, you need an account and an API access token to [The Movie Database API](https://developer.themoviedb.org/reference/intro/getting-started). Place the access token in the .NET project ``appsettings.json`` file or in [user secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows#set-a-secret) with key ``MovieDatabase:ApiAccessToken``

### To run the app

##### 1) Run the frontend from ``\src\Frontend`` with command:
*npm run dev*

##### 2) Run the backend API from ``\src\Backend\Api`` with command:
*dotnet run*

##### 3) Browse to ``http://localhost:5001``


