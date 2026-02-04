using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AnimalRepository : IAnimalRepository
    {
        private readonly AppDbContext _context;

        public AnimalRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Animal>> GetAllAsync() =>
            await _context.Animals
                .Include(a => a.Litter) 
                    .ThenInclude(l => l.Mother) 
                .Include(a => a.Litter) 
                    .ThenInclude(l => l.Father)
                .AsNoTracking()
                .ToListAsync();

        public async Task<Animal?> GetByIdAsync(int id) =>
            await _context.Animals
                .Include(a => a.Litter) 
                    .ThenInclude(l => l.Mother) 
                .Include(a => a.Litter) 
                    .ThenInclude(l => l.Father)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);

        public async Task<Animal> AddAsync(Animal entity)
        {
            // Limpia posibles relaciones para evitar inserciones accidentales
            entity.Origin = null;
            entity.Status = null;
            entity.Stage = null;
            entity.Litter = null;
            entity.BirthDate = DateTime.SpecifyKind(entity.BirthDate, DateTimeKind.Utc);

            _context.Animals.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(Animal entity)
        {
            entity.Updated = DateTime.UtcNow;
            entity.BirthDate = DateTime.SpecifyKind(entity.BirthDate, DateTimeKind.Utc);
            
            _context.Animals.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal != null)
            {
                _context.Animals.Remove(animal);
                await _context.SaveChangesAsync();
            }
        }
    }
}
