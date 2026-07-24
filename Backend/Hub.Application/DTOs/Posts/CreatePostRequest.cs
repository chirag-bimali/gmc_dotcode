using Hub.Domain.Enums;

namespace Hub.Application.DTOs.Posts;

public class CreatePostRequest
{
    public Guid ClubId { get; set; }
    public Guid AuthorId { get; set; }
    public PostType Type { get; set; } = PostType.Text;
    public string? Title { get; set; }
    public string Content { get; set; } = string.Empty;
    public bool IsPinned { get; set; }
    public List<PostAttachmentRequest> Attachments { get; set; } = new();
}
