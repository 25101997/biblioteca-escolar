namespace Domain.Entities
{
    public class AnimalReproductiveRecord
    {
        public int Id { get; set; }

        public int MotherId { get; set; }
        public int FatherId { get; set; }

        public string Status { get; set; } = "registrado";

        public int BornMale { get; set; }
        public int BornFemale { get; set; }
        public int AbortedMale { get; set; }
        public int AbortedFemale { get; set; }

        public string? Notes { get; set; }

        public DateTimeOffset Created { get; set; }
        public DateTimeOffset Updated { get; set; } = DateTimeOffset.UtcNow;

        // 🔹 Relaciones
        public Animal? Mother { get; set; }
        public Animal? Father { get; set; }
    }
}
