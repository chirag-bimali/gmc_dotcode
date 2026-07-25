using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Infrastructure.Persistance.Data;
using Microsoft.EntityFrameworkCore;

namespace Hub.Infrastructure.Persistance.Repositories;

public class PostRepository : IPostRepository
{
    private readonly ApplicationDbContext _context;

    public PostRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Post?> GetByIdAsync(Guid id)
    {
        return await _context.Posts.FindAsync(id);
    }

    public async Task<Post?> GetByIdWithDetailsAsync(Guid id)
    {
        return await _context.Posts
            .Include(p => p.Comments)
            .Include(p => p.Likes)
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Post>> GetByClubAsync(Guid clubId, int page, int pageSize, Hub.Domain.Enums.PostType? type = null)
    {
        var query = _context.Posts
            .Include(p => p.User)
            .Where(p => p.ClubId == clubId);

        if (type.HasValue)
            query = query.Where(p => p.Type == type.Value);

        return await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetCountByClubAsync(Guid clubId, Hub.Domain.Enums.PostType? type = null)
    {
        var query = _context.Posts.Where(p => p.ClubId == clubId);
        if (type.HasValue)
            query = query.Where(p => p.Type == type.Value);
        return await query.CountAsync();
    }

    public async Task<Post> CreateAsync(Post post)
    {
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task<Post> UpdateAsync(Post post)
    {
        _context.Posts.Update(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null) return false;

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Posts.AnyAsync(p => p.Id == id);
    }
}