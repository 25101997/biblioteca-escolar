using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class AnimalConfiguration : IEntityTypeConfiguration<Animal>
    {
        public void Configure(EntityTypeBuilder<Animal> builder)
        {
            builder.ToTable("animal");

            builder.HasKey(a => a.Id);
            builder.Property(a => a.Id).HasColumnName("id");

            builder.Property(a => a.OriginId).HasColumnName("origin_id").IsRequired();
            builder.Property(a => a.StatusId).HasColumnName("status_id").IsRequired();
            builder.Property(a => a.StageId).HasColumnName("stage_id").IsRequired();
            builder.Property(a => a.LitterId).HasColumnName("litter_id");

            builder.Property(a => a.Sex)
                .HasColumnName("sex")
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(a => a.Breed)
                .HasColumnName("breed")
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(a => a.Weight)
                .HasColumnName("weight")
                .HasPrecision(6, 2);

            builder.Property(a => a.BirthDate)
                .HasColumnName("birth_date")
                .IsRequired();

            builder.Property(a => a.Created)
                .HasColumnName("created")
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            builder.Property(a => a.Updated)
                .HasColumnName("updated")
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired();

            // Relaciones
            builder.HasOne(a => a.Origin)
                .WithMany()
                .HasForeignKey(a => a.OriginId) // 🔹 especifica la FK correcta
                .HasConstraintName("fk_origin")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(a => a.Status)
                .WithMany()
                .HasForeignKey(a => a.StatusId) // 🔹 especifica la FK correcta
                .HasConstraintName("fk_status")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(a => a.Stage)
                .WithMany()
                .HasForeignKey(a => a.StageId) // 🔹 especifica la FK correcta
                .HasConstraintName("fk_stage")
                .OnDelete(DeleteBehavior.Restrict);
                //.WithMany(st => st.Animals)
            
            builder.HasOne(a => a.Litter)
                .WithMany()
                .HasForeignKey(a => a.LitterId)
                .HasConstraintName("fk_litter")
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
