using Hub.Application.DTOs.Posts;
using Hub.Application.Services;
using Hub.Domain.Enums;
using Hub.Tests.Fakes;

namespace Hub.Tests.Services;

public class PostServiceTests
{
    private readonly InMemoryPostRepository _repository = new();
    private readonly PostService _service;

    public PostServiceTests()
    {
        _service = new PostService(_repository);
    }

    private static CreatePostRequest ValidRequest() => new()
    {
        ClubId = Guid.NewGuid(),
        AuthorId = Guid.NewGuid(),
        Type = PostType.Announcement,
        Title = "Orientation week",
        Content = "Join us on Monday.",
        IsPinned = true
    };

    [Fact]
    public async Task CreateAsync_ValidRequest_PersistsPostAndReturnsResponse()
    {
        var request = ValidRequest();

        var response = await _service.CreateAsync(request);

        Assert.NotEqual(Guid.Empty, response.Id);
        Assert.Equal(request.ClubId, response.ClubId);
        Assert.Equal(request.AuthorId, response.AuthorId);
        Assert.Equal(PostType.Announcement, response.Type);
        Assert.Equal("Orientation week", response.Title);
        Assert.Equal("Join us on Monday.", response.Content);
        Assert.True(response.IsPinned);
        Assert.Empty(response.Attachments);
        Assert.Equal(response.CreatedAt, response.UpdatedAt);
        Assert.Single(_repository.Posts);
    }

    [Fact]
    public async Task CreateAsync_TrimsContentAndTitle()
    {
        var request = ValidRequest();
        request.Title = "  Spaced title  ";
        request.Content = "  padded content  ";

        var response = await _service.CreateAsync(request);

        Assert.Equal("Spaced title", response.Title);
        Assert.Equal("padded content", response.Content);
    }

    [Fact]
    public async Task CreateAsync_WhitespaceTitle_StoresNull()
    {
        var request = ValidRequest();
        request.Title = "   ";

        var response = await _service.CreateAsync(request);

        Assert.Null(response.Title);
    }

    [Fact]
    public async Task CreateAsync_MapsAttachments()
    {
        var request = ValidRequest();
        request.Type = PostType.Image;
        request.Attachments.Add(new PostAttachmentRequest("https://cdn/img.png", "image/png", "img.png", 2048));
        request.Attachments.Add(new PostAttachmentRequest("https://cdn/doc.pdf", "application/pdf", null, null));

        var response = await _service.CreateAsync(request);

        Assert.Equal(2, response.Attachments.Count);

        var image = response.Attachments[0];
        Assert.NotEqual(Guid.Empty, image.Id);
        Assert.Equal("https://cdn/img.png", image.FileUrl);
        Assert.Equal("image/png", image.FileType);
        Assert.Equal("img.png", image.FileName);
        Assert.Equal(2048, image.FileSize);

        var doc = response.Attachments[1];
        Assert.Null(doc.FileName);
        Assert.Null(doc.FileSize);

        var stored = Assert.Single(_repository.Posts);
        Assert.All(stored.Attachments!, a => Assert.Equal(stored.Id, a.PostId));
    }

    [Fact]
    public async Task CreateAsync_EmptyClubId_Throws()
    {
        var request = ValidRequest();
        request.ClubId = Guid.Empty;

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(request));

        Assert.Equal("ClubId is required", ex.Message);
        Assert.Empty(_repository.Posts);
    }

    [Fact]
    public async Task CreateAsync_EmptyAuthorId_Throws()
    {
        var request = ValidRequest();
        request.AuthorId = Guid.Empty;

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(request));

        Assert.Equal("AuthorId is required", ex.Message);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public async Task CreateAsync_BlankContent_Throws(string content)
    {
        var request = ValidRequest();
        request.Content = content;

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(request));

        Assert.Equal("Content is required", ex.Message);
    }

    [Fact]
    public async Task CreateAsync_ContentTooLong_Throws()
    {
        var request = ValidRequest();
        request.Content = new string('x', 5001);

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(request));

        Assert.Contains("5000 characters", ex.Message);
    }

    [Fact]
    public async Task CreateAsync_TitleTooLong_Throws()
    {
        var request = ValidRequest();
        request.Title = new string('x', 201);

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(request));

        Assert.Contains("200 characters", ex.Message);
    }

    [Fact]
    public async Task CreateAsync_ContentAtMaxLength_Succeeds()
    {
        var request = ValidRequest();
        request.Content = new string('x', 5000);

        var response = await _service.CreateAsync(request);

        Assert.Equal(5000, response.Content.Length);
    }

    [Theory]
    [InlineData("", "image/png", "Attachment FileUrl is required")]
    [InlineData("https://cdn/img.png", "", "Attachment FileType is required")]
    public async Task CreateAsync_InvalidAttachment_Throws(string fileUrl, string fileType, string expected)
    {
        var request = ValidRequest();
        request.Attachments.Add(new PostAttachmentRequest(fileUrl, fileType, null, null));

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(request));

        Assert.Equal(expected, ex.Message);
        Assert.Empty(_repository.Posts);
    }

    [Fact]
    public async Task CreateAsync_ForeignKeyViolation_ThrowsFriendlyMessage()
    {
        _repository.ThrowOnCreate = true;

        var ex = await Assert.ThrowsAsync<Exception>(() => _service.CreateAsync(ValidRequest()));

        Assert.Contains("Club or author not found", ex.Message);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingPost_ReturnsResponse()
    {
        var post = TestData.Post(content: "seeded");
        post.Author = TestData.User(post.AuthorId, "Aayush Sharma");
        _repository.Seed(post);

        var response = await _service.GetByIdAsync(post.Id);

        Assert.NotNull(response);
        Assert.Equal("seeded", response!.Content);
        Assert.Equal("Aayush Sharma", response.AuthorName);
    }

    [Fact]
    public async Task GetByIdAsync_UnknownId_ReturnsNull()
    {
        Assert.Null(await _service.GetByIdAsync(Guid.NewGuid()));
    }

    [Fact]
    public async Task GetAllAsync_ReturnsPinnedFirstThenNewest()
    {
        var older = TestData.Post(content: "older", createdAt: new DateTime(2026, 7, 1, 0, 0, 0, DateTimeKind.Utc));
        var newer = TestData.Post(content: "newer", createdAt: new DateTime(2026, 7, 5, 0, 0, 0, DateTimeKind.Utc));
        var pinned = TestData.Post(content: "pinned", isPinned: true,
            createdAt: new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc));
        _repository.Seed(older, newer, pinned);

        var responses = await _service.GetAllAsync();

        Assert.Equal(new[] { "pinned", "newer", "older" }, responses.Select(r => r.Content));
    }

    [Fact]
    public async Task GetByClubAsync_ReturnsOnlyThatClubsPosts()
    {
        var clubId = Guid.NewGuid();
        _repository.Seed(
            TestData.Post(clubId: clubId, content: "mine"),
            TestData.Post(content: "other club"));

        var responses = await _service.GetByClubAsync(clubId);

        var only = Assert.Single(responses);
        Assert.Equal("mine", only.Content);
    }

    [Fact]
    public async Task GetByAuthorAsync_ReturnsOnlyThatAuthorsPosts()
    {
        var authorId = Guid.NewGuid();
        _repository.Seed(
            TestData.Post(authorId: authorId, content: "mine"),
            TestData.Post(content: "someone else"));

        var responses = await _service.GetByAuthorAsync(authorId);

        var only = Assert.Single(responses);
        Assert.Equal("mine", only.Content);
    }

    [Fact]
    public async Task UpdateAsync_UnknownId_ReturnsNull()
    {
        var result = await _service.UpdateAsync(Guid.NewGuid(), new UpdatePostRequest("t", "c", null, null));

        Assert.Null(result);
        Assert.Equal(0, _repository.UpdateCallCount);
    }

    [Fact]
    public async Task UpdateAsync_OnlyChangesProvidedFields()
    {
        var post = TestData.Post(content: "original", title: "original title");
        _repository.Seed(post);

        var response = await _service.UpdateAsync(post.Id, new UpdatePostRequest(null, "edited", null, null));

        Assert.NotNull(response);
        Assert.Equal("edited", response!.Content);
        Assert.Equal("original title", response.Title);
        Assert.Equal(PostType.Text, response.Type);
        Assert.False(response.IsPinned);
        Assert.Equal(1, _repository.UpdateCallCount);
    }

    [Fact]
    public async Task UpdateAsync_ChangesAllFieldsAndBumpsUpdatedAt()
    {
        var post = TestData.Post();
        _repository.Seed(post);

        var response = await _service.UpdateAsync(post.Id,
            new UpdatePostRequest("new title", "new content", PostType.Poll, true));

        Assert.NotNull(response);
        Assert.Equal("new title", response!.Title);
        Assert.Equal("new content", response.Content);
        Assert.Equal(PostType.Poll, response.Type);
        Assert.True(response.IsPinned);
        Assert.True(response.UpdatedAt > response.CreatedAt);
    }

    [Fact]
    public async Task UpdateAsync_BlankContent_ThrowsAndLeavesPostUnchanged()
    {
        var post = TestData.Post(content: "original");
        _repository.Seed(post);

        await Assert.ThrowsAsync<Exception>(() =>
            _service.UpdateAsync(post.Id, new UpdatePostRequest(null, "  ", null, null)));

        Assert.Equal("original", post.Content);
        Assert.Equal(0, _repository.UpdateCallCount);
    }

    [Fact]
    public async Task SetPinnedAsync_PinsAndUnpinsPost()
    {
        var post = TestData.Post();
        _repository.Seed(post);

        var pinned = await _service.SetPinnedAsync(post.Id, true);
        Assert.True(pinned!.IsPinned);

        var unpinned = await _service.SetPinnedAsync(post.Id, false);
        Assert.False(unpinned!.IsPinned);
        Assert.Equal(2, _repository.UpdateCallCount);
    }

    [Fact]
    public async Task SetPinnedAsync_UnknownId_ReturnsNull()
    {
        Assert.Null(await _service.SetPinnedAsync(Guid.NewGuid(), true));
    }

    [Fact]
    public async Task DeleteAsync_ExistingPost_RemovesItAndReturnsTrue()
    {
        var post = TestData.Post();
        _repository.Seed(post);

        Assert.True(await _service.DeleteAsync(post.Id));
        Assert.Empty(_repository.Posts);
    }

    [Fact]
    public async Task DeleteAsync_UnknownId_ReturnsFalse()
    {
        Assert.False(await _service.DeleteAsync(Guid.NewGuid()));
    }
}
