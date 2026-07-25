using Hub.Application.Interfaces;
using Hub.Application.Services;

namespace Hub.Application.Services;

public class ClubInternalApi : IClubInternalApi
{
    private readonly IMembershipService _membershipService;
    private readonly IClubRepository _clubRepository;

    public ClubInternalApi(
        IMembershipService membershipService,
        IClubRepository clubRepository)
    {
        _membershipService = membershipService;
        _clubRepository = clubRepository;
    }

    public async Task<bool> IsMemberAsync(Guid clubId, Guid userId)
    {
        return await _membershipService.IsMemberAsync(clubId, userId);
    }

    public async Task<bool> ExistsAsync(Guid clubId)
    {
        return await _clubRepository.ExistsAsync(clubId);
    }

    public async Task<Guid?> GetUniversityIdAsync(Guid clubId)
    {
        // This would need proper implementation with the club entity
        // For now return a placeholder
        var exists = await _clubRepository.ExistsAsync(clubId);
        return exists ? Guid.Parse("00000000-0000-0000-0000-000000000001") : null;
    }
}