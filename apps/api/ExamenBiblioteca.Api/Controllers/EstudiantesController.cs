using ExamenBiblioteca.Api.Data;
using ExamenBiblioteca.Api.Dtos;
using ExamenBiblioteca.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenBiblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EstudiantesController : ControllerBase
{
    private readonly SqlServerConnectionFactory _connectionFactory;

    public EstudiantesController(SqlServerConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var estudiantes = new List<Estudiante>();

        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = @"
            SELECT IdLector, CI, Nombre, Direccion, Carrera, Edad
            FROM dbo.Estudiante
            ORDER BY IdLector;";

        await using var command = new SqlCommand(sql, connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            estudiantes.Add(new Estudiante
            {
                IdLector = reader.GetInt32(0),
                CI = reader.GetString(1),
                Nombre = reader.GetString(2),
                Direccion = reader.IsDBNull(3) ? null : reader.GetString(3),
                Carrera = reader.GetString(4),
                Edad = reader.GetByte(5)
            });
        }

        return Ok(estudiantes);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EstudianteCreateDto dto)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("dbo.sp_Estudiante_Insertar", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@CI", dto.CI);
            command.Parameters.AddWithValue("@Nombre", dto.Nombre);
            command.Parameters.AddWithValue("@Direccion", (object?)dto.Direccion ?? DBNull.Value);
            command.Parameters.AddWithValue("@Carrera", dto.Carrera);
            command.Parameters.AddWithValue("@Edad", dto.Edad);

            var result = await command.ExecuteScalarAsync();

            return Ok(new
            {
                message = "Estudiante creado correctamente",
                idLector = Convert.ToInt32(result)
            });
        }
        catch (SqlException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] EstudianteUpdateDto dto)
    {
        if (id != dto.IdLector)
        {
            return BadRequest(new
            {
                message = "El id de la URL no coincide con el del cuerpo."
            });
        }

        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("dbo.sp_Estudiante_Modificar", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@IdLector", dto.IdLector);
            command.Parameters.AddWithValue("@CI", dto.CI);
            command.Parameters.AddWithValue("@Nombre", dto.Nombre);
            command.Parameters.AddWithValue("@Direccion", (object?)dto.Direccion ?? DBNull.Value);
            command.Parameters.AddWithValue("@Carrera", dto.Carrera);
            command.Parameters.AddWithValue("@Edad", dto.Edad);

            await command.ExecuteNonQueryAsync();

            return Ok(new
            {
                message = "Estudiante actualizado correctamente"
            });
        }
        catch (SqlException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}