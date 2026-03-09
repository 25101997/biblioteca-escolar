namespace ExamenBiblioteca.Api.Models;

public class PrestamoTop5
{
    public string NombreEstudiante { get; set; } = string.Empty;
    public string TituloLibro { get; set; } = string.Empty;
    public string NombreAutor { get; set; } = string.Empty;
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public bool Devuelto { get; set; }
}