namespace ExamenBiblioteca.Api.Models;

public class Libro
{
    public int IdLibro { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Editorial { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
}