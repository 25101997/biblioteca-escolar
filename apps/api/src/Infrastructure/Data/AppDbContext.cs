using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Animal> Animals => Set<Animal>();
        public DbSet<AnimalOrigin> AnimalOrigins => Set<AnimalOrigin>();
        public DbSet<AnimalStatus> AnimalStatuses => Set<AnimalStatus>();
        public DbSet<AnimalStage> AnimalStages => Set<AnimalStage>();
        public DbSet<AnimalReproductiveRecord> AnimalReproductiveRecords => Set<AnimalReproductiveRecord>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            // 🔹 AutoInclude para Animal
            modelBuilder.Entity<Animal>()
                .Navigation(a => a.Origin).AutoInclude();
            modelBuilder.Entity<Animal>()
                .Navigation(a => a.Status).AutoInclude();
            modelBuilder.Entity<Animal>()
                .Navigation(a => a.Stage).AutoInclude();

            // 🔹 AutoInclude para AnimalReproductiveRecord
            modelBuilder.Entity<AnimalReproductiveRecord>()
                .Navigation(r => r.Mother).AutoInclude();
            modelBuilder.Entity<AnimalReproductiveRecord>()
                .Navigation(r => r.Father).AutoInclude();
            
        }
    }
}
