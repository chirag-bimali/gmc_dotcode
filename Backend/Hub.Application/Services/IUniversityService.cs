using Hub.Application.DTOs.University;

namespace Hub.Application.Services;

public interface IUniversityService
{
    Task<UniversityResponse> CreateAsync(CreateUniversityRequest request);
    Task<UniversityResponse?> GetByIdAsync(Guid id);
    Task<List<UniversityResponse>> GetAllAsync();
    Task<UniversityResponse?> UpdateAsync(Guid id, UpdateUniversityRequest request);
    Task<bool> DeleteAsync(Guid id);
}