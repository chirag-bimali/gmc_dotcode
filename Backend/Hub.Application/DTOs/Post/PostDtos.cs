using Hub.Domain.Enums;

namespace Hub.Application.DTOs.Post;

public class CreatePostRequest
{
    public Guid ClubId { get; set; }
    public PostType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
}

public class UpdatePostRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string[]? Tags { get; set; }
    public PostStatus? Status { get; set; }
}

public class PostResponse
{
    public Guid Id { get; set; }
    public Guid ClubId { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public PostType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
    public PostStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public int LikeCount { get; set; }
    public int CommentCount { get; set; }
    public bool IsLiked { get; set; }
    public bool IsAuthor { get; set; }
    public bool HasBestAnswer { get; set; }
    public Guid? BestAnswerCommentId { get; set; }
}

public class PostListResponse
{
    public List<PostResponse> Items { get; set; } = [];
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}