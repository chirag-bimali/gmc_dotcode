namespace Hub.Application.DTOs.Comment;

public class CreateCommentRequest
{
    public Guid PostId { get; set; }
    public string Text { get; set; } = string.Empty;
}

public class UpdateCommentRequest
{
    public string Text { get; set; } = string.Empty;
}

public class CommentResponse
{
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public bool IsBestAnswer { get; set; }
    public DateTime CreatedAt { get; set; }
}