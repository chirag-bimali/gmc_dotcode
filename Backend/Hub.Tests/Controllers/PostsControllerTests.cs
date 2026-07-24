using Hub.API.Controllers;
using Hub.Application.DTOs.Posts;
using Hub.Application.Services;
using Hub.Domain.Enums;
using Hub.Tests.Fakes;
using Microsoft.AspNetCore.Mvc;

namespace Hub.Tests.Controllers;

public class PostsControllerTests
{
    private readonly InMemoryPostRepository _repository = new();
    private readonly PostsController _controller;

    public PostsControllerTests()
    {
        _controller = new PostsController(new PostService(_repository));
    }

    private static CreatePostRequest ValidRequest() => new()
    {
        ClubId = Guid.NewGuid(),
        AuthorId = Guid.NewGuid(),
        Content = "Meeting at 5pm."
    };

    private static T AssertOk<T>(IActionResult result)
    {
        var ok = Assert.IsType<OkObjectResult>(result);
        return Assert.IsType<T>(ok.Value);
    }

    [Fact]
    public async Task Create_ValidRequest_ReturnsOkWithPost()
    {
        var result = await _controller.Create(ValidRequest());

        var response = AssertOk<PostResponse>(result);
        Assert.Equal("Meeting at 5pm.", response.Content);
    }

    [Fact]
    public async Task Create_InvalidRequest_ReturnsBadRequest()
    {
        var request = ValidRequest();
        request.Content = "";

        var result = await _controller.Create(request);

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.NotNull(badRequest.Value);
        Assert.Empty(_repository.Posts);
    }

    [Fact]
    public async Task GetAll_ReturnsOkWithAllPosts()
    {
        _repository.Seed(TestData.Post(), TestData.Post());

        var result = await _controller.GetAll();

        var posts = AssertOk<List<PostResponse>>(result);
        Assert.Equal(2, posts.Count);
    }

    [Fact]
    public async Task GetById_ExistingPost_ReturnsOk()
    {
        var post = TestData.Post(content: "existing");
        _repository.Seed(post);

        var result = await _controller.GetById(post.Id);

        var response = AssertOk<PostResponse>(result);
        Assert.Equal("existing", response.Content);
    }

    [Fact]
    public async Task GetById_UnknownPost_ReturnsNotFound()
    {
        var result = await _controller.GetById(Guid.NewGuid());

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetByClub_ReturnsOnlyThatClubsPosts()
    {
        var clubId = Guid.NewGuid();
        _repository.Seed(TestData.Post(clubId: clubId), TestData.Post());

        var result = await _controller.GetByClub(clubId);

        var posts = AssertOk<List<PostResponse>>(result);
        Assert.Single(posts);
    }

    [Fact]
    public async Task GetByAuthor_ReturnsOnlyThatAuthorsPosts()
    {
        var authorId = Guid.NewGuid();
        _repository.Seed(TestData.Post(authorId: authorId), TestData.Post());

        var result = await _controller.GetByAuthor(authorId);

        var posts = AssertOk<List<PostResponse>>(result);
        Assert.Single(posts);
    }

    [Fact]
    public async Task Update_ExistingPost_ReturnsOkWithUpdatedPost()
    {
        var post = TestData.Post(content: "before");
        _repository.Seed(post);

        var result = await _controller.Update(post.Id, new UpdatePostRequest(null, "after", PostType.Poll, null));

        var response = AssertOk<PostResponse>(result);
        Assert.Equal("after", response.Content);
        Assert.Equal(PostType.Poll, response.Type);
    }

    [Fact]
    public async Task Update_UnknownPost_ReturnsNotFound()
    {
        var result = await _controller.Update(Guid.NewGuid(), new UpdatePostRequest(null, "x", null, null));

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task Update_InvalidContent_ReturnsBadRequest()
    {
        var post = TestData.Post();
        _repository.Seed(post);

        var result = await _controller.Update(post.Id, new UpdatePostRequest(null, "   ", null, null));

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task SetPinned_ExistingPost_ReturnsOkWithPinnedPost()
    {
        var post = TestData.Post();
        _repository.Seed(post);

        var pinned = AssertOk<PostResponse>(await _controller.SetPinned(post.Id));
        Assert.True(pinned.IsPinned);

        var unpinned = AssertOk<PostResponse>(await _controller.SetPinned(post.Id, false));
        Assert.False(unpinned.IsPinned);
    }

    [Fact]
    public async Task SetPinned_UnknownPost_ReturnsNotFound()
    {
        Assert.IsType<NotFoundObjectResult>(await _controller.SetPinned(Guid.NewGuid()));
    }

    [Fact]
    public async Task Delete_ExistingPost_ReturnsNoContent()
    {
        var post = TestData.Post();
        _repository.Seed(post);

        Assert.IsType<NoContentResult>(await _controller.Delete(post.Id));
        Assert.Empty(_repository.Posts);
    }

    [Fact]
    public async Task Delete_UnknownPost_ReturnsNotFound()
    {
        Assert.IsType<NotFoundObjectResult>(await _controller.Delete(Guid.NewGuid()));
    }
}
