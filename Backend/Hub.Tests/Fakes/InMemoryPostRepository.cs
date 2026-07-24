using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hub.Tests.Fakes;

/// <summary>
/// Lightweight stand-in for PostRepository so service/controller tests run without a database.
/// Mirrors the real repository's ordering (pinned first, then newest).
/// </summary>
public class InMemoryPostRepository : IPostRepository
{
    private readonly List<Post> _posts = new();

    public bool ThrowOnCreate { get; set; }
    public int UpdateCallCount { get; private set; }

    public IReadOnlyList<Post> Posts => _posts;

    public void Seed(params Post[] posts) => _posts.AddRange(posts);

    public Task<Post?> GetByIdAsync(Guid id)
        => Task.FromResult(_posts.FirstOrDefault(p => p.Id == id));

    public Task<List<Post>> GetAllAsync()
        => Task.FromResult(Ordered(_posts));

    public Task<List<Post>> GetByClubIdAsync(Guid clubId)
        => Task.FromResult(Ordered(_posts.Where(p => p.ClubId == clubId)));

    public Task<List<Post>> GetByAuthorIdAsync(Guid authorId)
        => Task.FromResult(Ordered(_posts.Where(p => p.AuthorId == authorId)));

    public Task<Post> CreateAsync(Post post)
    {
        if (ThrowOnCreate)
            throw new DbUpdateException("FK violation");

        _posts.Add(post);
        return Task.FromResult(post);
    }

    public Task<Post> UpdateAsync(Post post)
    {
        UpdateCallCount++;
        return Task.FromResult(post);
    }

    public Task<bool> DeleteAsync(Post post)
        => Task.FromResult(_posts.Remove(post));

    private static List<Post> Ordered(IEnumerable<Post> posts)
        => posts.OrderByDescending(p => p.IsPinned)
            .ThenByDescending(p => p.CreatedAt)
            .ToList();
}
