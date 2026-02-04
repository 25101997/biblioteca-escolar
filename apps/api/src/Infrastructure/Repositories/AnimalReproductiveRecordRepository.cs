using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AnimalReproductiveRecordRepository : IAnimalReproductiveRecordRepository
    {
        private readonly AppDbContext _context;

        public AnimalReproductiveRecordRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AnimalReproductiveRecord>> GetAllAsync() => 
            await _context.AnimalReproductiveRecords 
            .AsNoTracking() .ToListAsync(); 

        public async Task<AnimalReproductiveRecord?> GetByIdAsync(int id) => 
            await _context.AnimalReproductiveRecords 
            .AsNoTracking() 
            .FirstOrDefaultAsync(r => r.Id == id);

        public async Task<AnimalReproductiveRecord> AddAsync(AnimalReproductiveRecord entity)
        {
            // Limpia posibles relaciones para evitar inserciones accidentales
            entity.Mother = null;
            entity.Father = null;
            
            _context.AnimalReproductiveRecords.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(AnimalReproductiveRecord entity)
        {
            entity.Updated = DateTime.UtcNow;
            
            _context.AnimalReproductiveRecords.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var animalReproductiveRecord = await _context.AnimalReproductiveRecords.FindAsync(id);
            if (animalReproductiveRecord != null)
            {
                _context.AnimalReproductiveRecords.Remove(animalReproductiveRecord);
                await _context.SaveChangesAsync();
            }
        }
    }
}
