using Hub.Application.DTOs.Club;

namespace Hub.Application.Interfaces;

public interface IClubService
{
    Task<ClubResponse> CreateAsync(Guid userId, CreateClubRequest request);
    Task<ClubResponse?> GetByIdAsync(Guid id, Guid userId);
    Task<ClubListResponse> GetByUniversityAsync(Guid universityId, int page = 1, int pageSize = 20);
    Task<bool> JoinAsync(Guid clubId, Guid userId);
    Task<bool> LeaveAsync(Guid clubId, Guid userId);
}