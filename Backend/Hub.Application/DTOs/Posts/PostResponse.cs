using Hub.Domain.Enums;

namespace Hub.Application.DTOs.Posts;

public record PostResponse(
    Guid Id,
    Guid ClubId,
    Guid AuthorId,
    string? AuthorName,
    PostType Type,
    string? Title,
    string Content,
    bool IsPinned,
    IReadOnlyList<PostAttachmentResponse> Attachments,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
