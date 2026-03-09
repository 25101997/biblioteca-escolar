using ExamenBiblioteca.Api.Data;
using ExamenBiblioteca.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ExamenBiblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibrosController : ControllerBase
{
    private readonly SqlServerConnectionFactory _connectionFactory;

    public LibrosController(SqlServerConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var libros = new List<Libro>();

        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = @"
            SELECT IdLibro, Titulo, Editorial, Area
            FROM dbo.Libro
            ORDER BY IdLibro;";

        await using var command = new SqlCommand(sql, connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            libros.Add(new Libro
            {
                IdLibro = reader.GetInt32(0),
                Titulo = reader.GetString(1),
                Editorial = reader.GetString(2),
                Area = reader.GetString(3)
            });
        }

        return Ok(libros);
    }
}