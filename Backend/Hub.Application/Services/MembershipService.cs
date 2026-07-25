using Hub.Application.DTOs.Membership;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;

namespace Hub.Application.Services;

public class MembershipService : IMembershipService
{
    private readonly IMembershipRepository _membershipRepository;

    public MembershipService(IMembershipRepository membershipRepository)
    {
        _membershipRepository = membershipRepository;
    }

    public async Task<MembershipResponse> JoinAsync(Guid clubId, Guid userId)
    {
        var existing = await _membershipRepository.IsMemberAsync(clubId, userId);
        if (existing)
            throw new Exception("Already a member of this club");

        var membership = new Membership
        {
            ClubId = clubId,
            UserId = userId,
            JoinedAt = DateTime.UtcNow
        };

        await _membershipRepository.CreateAsync(membership);
        
        return new MembershipResponse
        {
            UserId = userId,
            UserName = "User", // Would need IUserRepository to get actual name
            JoinedAt = DateTime.UtcNow
        };
    }

    public async Task<bool> LeaveAsync(Guid clubId, Guid userId)
    {
        return await _membershipRepository.DeleteAsync(clubId, userId);
    }

    public async Task<List<MembershipResponse>> GetMembersAsync(Guid clubId)
    {
        var memberships = await _membershipRepository.GetByClubAsync(clubId);
        
        return memberships.Select(m => new MembershipResponse
        {
            UserId = m.UserId,
            UserName = "User", // Would need IUserRepository to get actual name
            JoinedAt = m.JoinedAt
        }).ToList();
    }

    public async Task<bool> IsMemberAsync(Guid clubId, Guid userId)
    {
        return await _membershipRepository.IsMemberAsync(clubId, userId);
    }
}