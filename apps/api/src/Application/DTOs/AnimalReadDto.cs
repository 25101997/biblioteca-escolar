namespace Application.DTOs
{
    public class AnimalReadDto
    {
        public int Id { get; set; }
        public AnimalOriginReadDto? Origin { get; set; }
        public AnimalStatusReadDto? Status { get; set; }
        public AnimalStageReadDto? Stage { get; set; }
        public AnimalReproductiveRecordReadDto? Litter { get; set; }
        public decimal Weight { get; set; }
        public string Breed { get; set; } = string.Empty;
        public string Sex { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}


