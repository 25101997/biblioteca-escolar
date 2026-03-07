namespace ExamenBiblioteca.Api.Dtos;

public class EstudianteUpdateDto
{
    public int IdLector { get; set; }
    public string CI { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string? Direccion { get; set; }
    public string Carrera { get; set; } = string.Empty;
    public byte Edad { get; set; }
}