namespace Hub.Application.DTOs.Posts;

public record PostAttachmentRequest(
    string FileUrl,
    string FileType,
    string? FileName,
    long? FileSize
);
