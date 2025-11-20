# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
# Copy wwwroot to the final image
COPY --from=build /src/wwwroot ./wwwroot

EXPOSE 8080
ENTRYPOINT ["dotnet", "the grand egyptian museum.dll"]
