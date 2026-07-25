using Hub.Application.DTOs.Auth;

namespace Hub.Application.Services;

public interface IAuthService
{
    Task<UserResponse> RegisterAsync(RegisterRequest request);
    Task<UserResponse?> LoginAsync(LoginRequest request);
    Task<UserResponse?> GetByIdAsync(Guid id);
    Task<UserResponse?> UpdateProfileAsync(Guid id, UpdateProfileRequest request);
}