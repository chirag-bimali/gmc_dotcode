namespace Hub.Application.DTOs.Posts;

public record PostAttachmentResponse(
    Guid Id,
    string FileUrl,
    string FileType,
    string? FileName,
    long? FileSize
);
