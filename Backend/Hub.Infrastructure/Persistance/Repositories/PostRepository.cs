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
        return await BaseQuery().FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Post>> GetAllAsync()
    {
        return await Ordered(BaseQuery()).ToListAsync();
    }

    public async Task<List<Post>> GetByClubIdAsync(Guid clubId)
    {
        return await Ordered(BaseQuery().Where(p => p.ClubId == clubId)).ToListAsync();
    }

    public async Task<List<Post>> GetByAuthorIdAsync(Guid authorId)
    {
        return await Ordered(BaseQuery().Where(p => p.AuthorId == authorId)).ToListAsync();
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

    public async Task<bool> DeleteAsync(Post post)
    {
        _context.Posts.Remove(post);
        return await _context.SaveChangesAsync() > 0;
    }

    private IQueryable<Post> BaseQuery()
    {
        return _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Attachments);
    }

    private static IQueryable<Post> Ordered(IQueryable<Post> query)
    {
        return query
            .OrderByDescending(p => p.IsPinned)
            .ThenByDescending(p => p.CreatedAt);
    }
}
