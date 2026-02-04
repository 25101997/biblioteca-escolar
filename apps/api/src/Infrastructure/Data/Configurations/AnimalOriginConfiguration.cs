using Microsoft.EntityFrameworkCore; 
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Data.Configurations
{
    public class AnimalOriginConfiguration : IEntityTypeConfiguration<AnimalOrigin>
    {
        public void Configure(EntityTypeBuilder<AnimalOrigin> builder)
        {
            builder.ToTable("animal_origin");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).HasColumnName("id");
            builder.Property(o => o.Name)
                   .HasColumnName("name")
                   .HasMaxLength(50)
                   .IsRequired();
        }
    }
}