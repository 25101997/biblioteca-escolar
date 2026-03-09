namespace ExamenBiblioteca.Api.Models;

public class PrestamoDetalle
{
    public int IdLector { get; set; }
    public string NombreEstudiante { get; set; } = string.Empty;
    public int IdLibro { get; set; }
    public string TituloLibro { get; set; } = string.Empty;
    public string NombreAutor { get; set; } = string.Empty;
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public bool Devuelto { get; set; }
}