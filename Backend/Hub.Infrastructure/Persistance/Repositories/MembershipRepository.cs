using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Infrastructure.Persistance.Data;
using Microsoft.EntityFrameworkCore;

namespace Hub.Infrastructure.Persistance.Repositories;

public class MembershipRepository : IMembershipRepository
{
    private readonly ApplicationDbContext _context;

    public MembershipRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Membership?> GetAsync(Guid clubId, Guid userId)
    {
        return await _context.Memberships
            .FirstOrDefaultAsync(m => m.ClubId == clubId && m.UserId == userId);
    }

    public async Task<Membership> CreateAsync(Membership membership)
    {
        _context.Memberships.Add(membership);
        await _context.SaveChangesAsync();
        return membership;
    }

    public async Task<bool> DeleteAsync(Guid clubId, Guid userId)
    {
        var membership = await _context.Memberships
            .FirstOrDefaultAsync(m => m.ClubId == clubId && m.UserId == userId);
        if (membership == null) return false;

        _context.Memberships.Remove(membership);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<Membership>> GetByClubAsync(Guid clubId)
    {
        return await _context.Memberships
            .Include(m => m.User)
            .Where(m => m.ClubId == clubId)
            .OrderBy(m => m.JoinedAt)
            .ToListAsync();
    }

    public async Task<bool> IsMemberAsync(Guid clubId, Guid userId)
    {
        return await _context.Memberships
            .AnyAsync(m => m.ClubId == clubId && m.UserId == userId);
    }

    public async Task<int> GetMemberCountAsync(Guid clubId)
    {
        return await _context.Memberships.CountAsync(m => m.ClubId == clubId);
    }
}