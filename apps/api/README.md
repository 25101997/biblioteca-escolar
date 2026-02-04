Construir la imagen si no existe: docker build -t dotnet-api .

docker run -it --rm -v "$PWD":/api -u $(id -u):$(id -g) -w /api -e DOTNET_CLI_HOME=/api -p 8080:8080 dotnet-api sh

If project not exist:
    dotnet new webapi --output .
    dotnet add package AutoMapper --version 12.0.1
    dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 12.0.1
    dotnet tool install --global dotnet-ef
    export PATH="$PATH:/app/.dotnet/tools"
    dotnet tool list -g

If projec exist
    dotnet clean
    dotnet restore
    dotnet build
    dotnet run --urls "http://0.0.0.0:8080"

After implemens a Entiti
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet add package Microsoft.EntityFrameworkCore
    dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

    dotnet ef migrations add InitialCreate
    dotnet ef database update

