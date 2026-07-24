using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface IUniversityRepository
{
    Task<University?> GetByIdAsync(Guid id);
    Task<University?> GetByNameAsync(string name);
    Task<List<University>> GetAllAsync();
    Task<University> CreateAsync(University university);
    Task<University> UpdateAsync(University university);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
}