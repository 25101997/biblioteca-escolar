namespace Application.DTOs
{
    public class AnimalReproductiveRecordReadDto
    {
        public int Id { get; set; }
        public AnimalReadDto? Mother { get; set; }
        public AnimalReadDto? Father { get; set; }
        public string Status { get; set; } = string.Empty;
        public int BornMale { get; set; }
        public int BornFemale { get; set; }
        public int AbortedMale { get; set; }
        public int AbortedFemale { get; set; }
        public string? Notes { get; set; }
        public DateTimeOffset Updated { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}
