using Hub.Domain.Entities;
using Hub.Infrastructure.Persistance.Data;
using Hub.Infrastructure.Persistance.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Hub.Tests.Repositories;

public class PostRepositoryTests : IDisposable
{
    private readonly string _databaseName = $"posts-{Guid.NewGuid()}";
    private readonly List<ApplicationDbContext> _contexts = new();

    private ApplicationDbContext NewContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(_databaseName)
            .Options;

        var context = new ApplicationDbContext(options);
        _contexts.Add(context);
        return context;
    }

    private PostRepository NewRepository() => new(NewContext());

    /// <summary>
    /// Seeds posts along with an author row for each of them. Author is a required
    /// navigation, so the repository's Include translates to an inner join - a post
    /// with a dangling AuthorId would never be returned.
    /// </summary>
    private async Task SeedAsync(params Post[] posts)
    {
        await using var context = NewContext();

        foreach (var authorId in posts.Select(p => p.AuthorId).Distinct())
        {
            if (!await context.Users.AnyAsync(u => u.Id == authorId))
                context.Users.Add(TestData.User(authorId));
        }

        context.Posts.AddRange(posts);
        await context.SaveChangesAsync();
    }

    public void Dispose()
    {
        foreach (var context in _contexts)
            context.Dispose();
    }

    [Fact]
    public async Task CreateAsync_PersistsPostWithAttachments()
    {
        var post = TestData.Post(content: "first post");
        post.Attachments!.Add(new PostAttachment
        {
            Id = Guid.NewGuid(),
            PostId = post.Id,
            FileUrl = "https://cdn/img.png",
            FileType = "image/png",
            FileName = "img.png",
            FileSize = 512,
            CreatedAt = post.CreatedAt
        });

        await NewRepository().CreateAsync(post);

        await using var verify = NewContext();
        var stored = await verify.Posts.Include(p => p.Attachments).SingleAsync();
        Assert.Equal("first post", stored.Content);
        var attachment = Assert.Single(stored.Attachments!);
        Assert.Equal("https://cdn/img.png", attachment.FileUrl);
        Assert.Equal(512, attachment.FileSize);
    }

    [Fact]
    public async Task GetByIdAsync_IncludesAuthorAndAttachments()
    {
        var author = TestData.User(Guid.NewGuid(), "Sita Rai");
        var post = TestData.Post(authorId: author.Id);
        post.Attachments!.Add(new PostAttachment
        {
            Id = Guid.NewGuid(),
            PostId = post.Id,
            FileUrl = "https://cdn/a.pdf",
            FileType = "application/pdf",
            FileName = "a.pdf",
            CreatedAt = post.CreatedAt
        });

        await using (var seed = NewContext())
        {
            seed.Users.Add(author);
            seed.Posts.Add(post);
            await seed.SaveChangesAsync();
        }

        var loaded = await NewRepository().GetByIdAsync(post.Id);

        Assert.NotNull(loaded);
        Assert.Equal("Sita Rai", loaded!.Author?.FullName);
        Assert.Single(loaded.Attachments!);
    }

    [Fact]
    public async Task GetByIdAsync_UnknownId_ReturnsNull()
    {
        Assert.Null(await NewRepository().GetByIdAsync(Guid.NewGuid()));
    }

    [Fact]
    public async Task GetAllAsync_OrdersPinnedFirstThenNewestFirst()
    {
        await SeedAsync(
            TestData.Post(content: "older", createdAt: new DateTime(2026, 7, 1, 0, 0, 0, DateTimeKind.Utc)),
            TestData.Post(content: "newer", createdAt: new DateTime(2026, 7, 5, 0, 0, 0, DateTimeKind.Utc)),
            TestData.Post(content: "pinned", isPinned: true,
                createdAt: new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc)));

        var posts = await NewRepository().GetAllAsync();

        Assert.Equal(new[] { "pinned", "newer", "older" }, posts.Select(p => p.Content));
    }

    [Fact]
    public async Task GetByClubIdAsync_ReturnsOnlyPostsForThatClub()
    {
        var clubId = Guid.NewGuid();

        await SeedAsync(
            TestData.Post(clubId: clubId, content: "club post 1"),
            TestData.Post(clubId: clubId, content: "club post 2"),
            TestData.Post(content: "other club"));

        var posts = await NewRepository().GetByClubIdAsync(clubId);

        Assert.Equal(2, posts.Count);
        Assert.All(posts, p => Assert.Equal(clubId, p.ClubId));
    }

    [Fact]
    public async Task GetByAuthorIdAsync_ReturnsOnlyPostsByThatAuthor()
    {
        var authorId = Guid.NewGuid();

        await SeedAsync(
            TestData.Post(authorId: authorId, content: "mine"),
            TestData.Post(content: "not mine"));

        var posts = await NewRepository().GetByAuthorIdAsync(authorId);

        var only = Assert.Single(posts);
        Assert.Equal("mine", only.Content);
    }

    [Fact]
    public async Task UpdateAsync_PersistsChanges()
    {
        var post = TestData.Post(content: "before");
        await SeedAsync(post);

        var repository = NewRepository();
        var loaded = await repository.GetByIdAsync(post.Id);
        Assert.NotNull(loaded);
        loaded!.Content = "after";
        loaded.IsPinned = true;
        await repository.UpdateAsync(loaded);

        await using var verify = NewContext();
        var stored = await verify.Posts.SingleAsync(p => p.Id == post.Id);
        Assert.Equal("after", stored.Content);
        Assert.True(stored.IsPinned);
    }

    [Fact]
    public async Task DeleteAsync_RemovesPostAndItsAttachments()
    {
        var post = TestData.Post();
        post.Attachments!.Add(new PostAttachment
        {
            Id = Guid.NewGuid(),
            PostId = post.Id,
            FileUrl = "https://cdn/img.png",
            FileType = "image/png",
            FileName = "img.png",
            CreatedAt = post.CreatedAt
        });
        await SeedAsync(post);

        var repository = NewRepository();
        var loaded = await repository.GetByIdAsync(post.Id);
        Assert.NotNull(loaded);

        Assert.True(await repository.DeleteAsync(loaded!));

        await using var verify = NewContext();
        Assert.Empty(verify.Posts);
        Assert.Empty(verify.PostAttachments);
    }
}
