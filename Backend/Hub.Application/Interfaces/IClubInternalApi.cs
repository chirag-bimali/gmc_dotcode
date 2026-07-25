using Hub.Application.Interfaces;

namespace Hub.Application.Interfaces;

public interface IClubInternalApi
{
    Task<bool> IsMemberAsync(Guid clubId, Guid userId);
    Task<bool> ExistsAsync(Guid clubId);
    Task<Guid?> GetUniversityIdAsync(Guid clubId);
}