namespace Hub.Application.DTOs.Auth;

public record UpdateProfileRequest(
    string? FullName,
    string? Bio,
    string? ProfilePictureUrl
);
