using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Infrastructure.Persistance.Data;
using Microsoft.EntityFrameworkCore;

namespace Hub.Infrastructure.Persistance.Repositories;

public class UniversityRepository : IUniversityRepository
{
    private readonly ApplicationDbContext _context;

    public UniversityRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<University?> GetByIdAsync(Guid id)
    {
        return await _context.Universities.FindAsync(id);
    }

    public async Task<University?> GetByNameAsync(string name)
    {
        return await _context.Universities
            .FirstOrDefaultAsync(u => u.Name == name);
    }

    public async Task<List<University>> GetAllAsync()
    {
        return await _context.Universities
            .OrderBy(u => u.Name)
            .ToListAsync();
    }

    public async Task<University> CreateAsync(University university)
    {
        _context.Universities.Add(university);
        await _context.SaveChangesAsync();
        return university;
    }

    public async Task<University> UpdateAsync(University university)
    {
        _context.Universities.Update(university);
        await _context.SaveChangesAsync();
        return university;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var university = await _context.Universities.FindAsync(id);
        if (university == null) return false;

        _context.Universities.Remove(university);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Universities.AnyAsync(u => u.Id == id);
    }
}