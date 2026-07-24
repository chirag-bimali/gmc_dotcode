using Hub.Domain.Enums;

namespace Hub.Application.DTOs.Auth;

public record UserResponse(
    Guid Id,
    string Email,
    string? FullName,
    Guid UniversityId,
    UserRole Role,
    UserStatus Status,
    string? ProfilePictureUrl,
    string? Bio,
    DateTime CreatedAt
);
