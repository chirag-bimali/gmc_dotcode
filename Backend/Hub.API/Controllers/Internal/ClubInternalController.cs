using Hub.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers.Internal;

[ApiController]
[Route("internal/clubs")]
public class ClubInternalController : ControllerBase
{
    private readonly IClubRepository _clubRepository;
    private readonly IMembershipService _membershipService;

    public ClubInternalController(
        IClubRepository clubRepository,
        IMembershipService membershipService)
    {
        _clubRepository = clubRepository;
        _membershipService = membershipService;
    }

    [HttpGet("{clubId}/members/{userId}/exists")]
    public async Task<IActionResult> IsMember(Guid clubId, Guid userId)
    {
        var isMember = await _membershipService.IsMemberAsync(clubId, userId);
        return Ok(new { isMember });
    }

    [HttpGet("{clubId}/exists")]
    public async Task<IActionResult> Exists(Guid clubId)
    {
        var exists = await _clubRepository.ExistsAsync(clubId);
        return Ok(new { exists });
    }

    [HttpGet("{clubId}/university")]
    public async Task<IActionResult> GetUniversityId(Guid clubId)
    {
        var club = await _clubRepository.GetByIdAsync(clubId);
        if (club == null)
            return NotFound();

        return Ok(new { universityId = club.UniversityId });
    }
}