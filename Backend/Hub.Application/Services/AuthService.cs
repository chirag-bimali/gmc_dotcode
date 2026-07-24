using Hub.Application.DTOs.Auth;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Hub.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserResponse> RegisterAsync(RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
            throw new Exception("Email is required");
        if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 6)
            throw new Exception("Password must be at least 6 characters");
        if (string.IsNullOrWhiteSpace(request.FullName))
            throw new Exception("Full name is required");
        if (!Guid.TryParse(request.UniversityId, out var universityId))
            throw new Exception("Invalid UniversityId format. Use a valid GUID like: 00000000-0000-0000-0000-000000000001");

        var existing = await _userRepository.GetByEmailAsync(request.Email);
        if (existing != null)
            throw new Exception("Email already exists");

        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FullName = request.FullName,
            UniversityId = universityId,
            Role = UserRole.Student,
            Status = UserStatus.Active,
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            await _userRepository.CreateAsync(user);
        }
        catch (DbUpdateException)
        {
            throw new Exception("University not found. Use a valid UniversityId. Available: 00000000-0000-0000-0000-000000000001");
        }

        return ToResponse(user);
    }

    public async Task<UserResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return null;

        return ToResponse(user);
    }

    public async Task<UserResponse?> GetByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        return user == null ? null : ToResponse(user);
    }

    public async Task<UserResponse?> UpdateProfileAsync(Guid id, UpdateProfileRequest request)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return null;

        if (request.FullName != null) user.FullName = request.FullName;
        if (request.Bio != null) user.Bio = request.Bio;
        if (request.ProfilePictureUrl != null) user.ProfilePictureUrl = request.ProfilePictureUrl;

        await _userRepository.UpdateAsync(user);
        return ToResponse(user);
    }

    private static UserResponse ToResponse(User user)
    {
        return new UserResponse(
            user.Id,
            user.Email,
            user.FullName,
            user.UniversityId,
            user.Role,
            user.Status,
            user.ProfilePictureUrl,
            user.Bio,
            user.CreatedAt
        );
    }
}
