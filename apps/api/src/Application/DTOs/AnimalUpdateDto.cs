namespace Application.DTOs
{
    public class AnimalUpdateDto
    {
        public int Id { get; set; }
        public int OriginId { get; set; }
        public int StatusId { get; set; }
        public int StageId { get; set; }
        public decimal Weight { get; set; }
        public string Sex { get; set; } = string.Empty;
        public string Breed { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
    }
}
