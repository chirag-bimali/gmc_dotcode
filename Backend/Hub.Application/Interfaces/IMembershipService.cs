using Hub.Application.DTOs.Membership;

namespace Hub.Application.Interfaces;

public interface IMembershipService
{
    Task<MembershipResponse> JoinAsync(Guid clubId, Guid userId);
    Task<bool> LeaveAsync(Guid clubId, Guid userId);
    Task<List<MembershipResponse>> GetMembersAsync(Guid clubId);
    Task<bool> IsMemberAsync(Guid clubId, Guid userId);
}