using Microsoft.Data.SqlClient;

namespace ExamenBiblioteca.Api.Data;

public class SqlServerConnectionFactory
{
    private readonly string _connectionString;

    public SqlServerConnectionFactory(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("No se encontró la cadena de conexión.");
    }

    public SqlConnection CreateConnection()
    {
        return new SqlConnection(_connectionString);
    }
}