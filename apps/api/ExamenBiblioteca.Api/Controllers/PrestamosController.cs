using ExamenBiblioteca.Api.Data;
using ExamenBiblioteca.Api.Dtos;
using ExamenBiblioteca.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenBiblioteca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrestamosController : ControllerBase
{
    private readonly SqlServerConnectionFactory _connectionFactory;

    public PrestamosController(SqlServerConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PrestamoCreateDto dto)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        await using var command = new SqlCommand("dbo.sp_Prestamo_Insertar", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@IdLector", dto.IdLector);
        command.Parameters.AddWithValue("@IdLibro", dto.IdLibro);
        command.Parameters.AddWithValue("@FechaPrestamo", dto.FechaPrestamo);
        command.Parameters.AddWithValue("@FechaDevolucion", (object?)dto.FechaDevolucion ?? DBNull.Value);
        command.Parameters.AddWithValue("@Devuelto", dto.Devuelto);

        await command.ExecuteNonQueryAsync();

        return Ok(new { message = "Préstamo creado correctamente" });
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] PrestamoUpdateDto dto)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        await using var command = new SqlCommand("dbo.sp_Prestamo_Modificar", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@IdLector_Original", dto.IdLectorOriginal);
        command.Parameters.AddWithValue("@IdLibro_Original", dto.IdLibroOriginal);
        command.Parameters.AddWithValue("@FechaPrestamo_Original", dto.FechaPrestamoOriginal);

        command.Parameters.AddWithValue("@IdLector_Nuevo", dto.IdLectorNuevo);
        command.Parameters.AddWithValue("@IdLibro_Nuevo", dto.IdLibroNuevo);
        command.Parameters.AddWithValue("@FechaPrestamo_Nueva", dto.FechaPrestamoNueva);
        command.Parameters.AddWithValue("@FechaDevolucion", (object?)dto.FechaDevolucion ?? DBNull.Value);
        command.Parameters.AddWithValue("@Devuelto", dto.Devuelto);

        await command.ExecuteNonQueryAsync();

        return Ok(new { message = "Préstamo actualizado correctamente" });
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(
        [FromQuery] int idLector,
        [FromQuery] int idLibro,
        [FromQuery] DateTime fechaPrestamo)
    {
        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        await using var command = new SqlCommand("dbo.sp_Prestamo_Eliminar", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@IdLector", idLector);
        command.Parameters.AddWithValue("@IdLibro", idLibro);
        command.Parameters.AddWithValue("@FechaPrestamo", fechaPrestamo);

        await command.ExecuteNonQueryAsync();

        return Ok(new { message = "Préstamo eliminado correctamente" });
    }

    [HttpGet("top5")]
    public async Task<IActionResult> GetTop5()
    {
        var resultado = new List<PrestamoTop5>();

        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        await using var command = new SqlCommand("dbo.sp_Top5LibrosMasSolicitados_Estudiantes", connection);
        command.CommandType = CommandType.StoredProcedure;

        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            resultado.Add(new PrestamoTop5
            {
                NombreEstudiante = reader["NombreEstudiante"].ToString() ?? "",
                TituloLibro = reader["TituloLibro"].ToString() ?? "",
                NombreAutor = reader["NombreAutor"].ToString() ?? "",
                FechaPrestamo = Convert.ToDateTime(reader["FechaPrestamo"]),
                FechaDevolucion = reader["FechaDevolucion"] == DBNull.Value
                    ? null
                    : Convert.ToDateTime(reader["FechaDevolucion"]),
                Devuelto = Convert.ToBoolean(reader["Devuelto"])
            });
        }

        return Ok(resultado);
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var prestamos = new List<PrestamoDetalle>();

        await using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        const string sql = @"
            SELECT
                p.IdLector,
                e.Nombre AS NombreEstudiante,
                p.IdLibro,
                l.Titulo AS TituloLibro,
                a.Nombre AS NombreAutor,
                p.FechaPrestamo,
                p.FechaDevolucion,
                p.Devuelto
            FROM dbo.Prestamo p
            INNER JOIN dbo.Estudiante e
                ON p.IdLector = e.IdLector
            INNER JOIN dbo.Libro l
                ON p.IdLibro = l.IdLibro
            INNER JOIN dbo.LibAut la
                ON l.IdLibro = la.IdLibro
            INNER JOIN dbo.Autor a
                ON la.IdAutor = a.IdAutor
            ORDER BY p.FechaPrestamo DESC;";

        await using var command = new SqlCommand(sql, connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            prestamos.Add(new PrestamoDetalle
            {
                IdLector = reader.GetInt32(0),
                NombreEstudiante = reader.GetString(1),
                IdLibro = reader.GetInt32(2),
                TituloLibro = reader.GetString(3),
                NombreAutor = reader.GetString(4),
                FechaPrestamo = reader.GetDateTime(5),
                FechaDevolucion = reader.IsDBNull(6) ? null : reader.GetDateTime(6),
                Devuelto = reader.GetBoolean(7)
            });
        }

        return Ok(prestamos);
    }

}