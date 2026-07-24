using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface IClubRepository
{
    Task<Club?> GetByIdAsync(Guid id);
    Task<Club?> GetByIdWithDetailsAsync(Guid id);
    Task<List<Club>> GetByUniversityAsync(Guid universityId, int page, int pageSize);
    Task<int> GetCountByUniversityAsync(Guid universityId);
    Task<Club> CreateAsync(Club club);
    Task<Club> UpdateAsync(Club club);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
}