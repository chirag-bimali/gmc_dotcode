using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface IMembershipRepository
{
    Task<Membership?> GetAsync(Guid clubId, Guid userId);
    Task<Membership> CreateAsync(Membership membership);
    Task<bool> DeleteAsync(Guid clubId, Guid userId);
    Task<List<Membership>> GetByClubAsync(Guid clubId);
    Task<bool> IsMemberAsync(Guid clubId, Guid userId);
    Task<int> GetMemberCountAsync(Guid clubId);
}