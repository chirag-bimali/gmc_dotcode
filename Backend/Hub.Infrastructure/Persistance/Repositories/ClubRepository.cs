using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Infrastructure.Persistance.Data;
using Microsoft.EntityFrameworkCore;

namespace Hub.Infrastructure.Persistance.Repositories;

public class ClubRepository : IClubRepository
{
    private readonly ApplicationDbContext _context;

    public ClubRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Club?> GetByIdAsync(Guid id)
    {
        return await _context.Clubs.FindAsync(id);
    }

    public async Task<Club?> GetByIdWithDetailsAsync(Guid id)
    {
        return await _context.Clubs
            .Include(c => c.Memberships)
            .Include(c => c.Posts)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<List<Club>> GetByUniversityAsync(Guid universityId, int page, int pageSize)
    {
        return await _context.Clubs
            .Where(c => c.UniversityId == universityId)
            .OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetCountByUniversityAsync(Guid universityId)
    {
        return await _context.Clubs.CountAsync(c => c.UniversityId == universityId);
    }

    public async Task<Club> CreateAsync(Club club)
    {
        _context.Clubs.Add(club);
        await _context.SaveChangesAsync();
        return club;
    }

    public async Task<Club> UpdateAsync(Club club)
    {
        _context.Clubs.Update(club);
        await _context.SaveChangesAsync();
        return club;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var club = await _context.Clubs.FindAsync(id);
        if (club == null) return false;

        _context.Clubs.Remove(club);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Clubs.AnyAsync(c => c.Id == id);
    }
}