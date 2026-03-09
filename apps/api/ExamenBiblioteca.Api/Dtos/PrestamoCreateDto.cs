namespace ExamenBiblioteca.Api.Dtos;

public class PrestamoCreateDto
{
    public int IdLector { get; set; }
    public int IdLibro { get; set; }
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public bool Devuelto { get; set; }
}