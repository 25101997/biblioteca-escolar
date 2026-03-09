namespace ExamenBiblioteca.Api.Dtos;

public class PrestamoUpdateDto
{
    public int IdLectorOriginal { get; set; }
    public int IdLibroOriginal { get; set; }
    public DateTime FechaPrestamoOriginal { get; set; }

    public int IdLectorNuevo { get; set; }
    public int IdLibroNuevo { get; set; }
    public DateTime FechaPrestamoNueva { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public bool Devuelto { get; set; }
}