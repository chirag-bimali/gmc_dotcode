using Hub.Domain.Enums;

namespace Hub.Application.DTOs.Posts;

public record UpdatePostRequest(
    string? Title,
    string? Content,
    PostType? Type,
    bool? IsPinned
);
