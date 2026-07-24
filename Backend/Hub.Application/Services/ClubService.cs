using Hub.Application.DTOs.Club;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;

namespace Hub.Application.Services;

public class ClubService : IClubService
{
    private readonly IClubRepository _clubRepository;
    private readonly IMembershipRepository _membershipRepository;
    private readonly IUserRepository _userRepository;

    public ClubService(
        IClubRepository clubRepository,
        IMembershipRepository membershipRepository,
        IUserRepository userRepository)
    {
        _clubRepository = clubRepository;
        _membershipRepository = membershipRepository;
        _userRepository = userRepository;
    }

    public async Task<ClubResponse> CreateAsync(Guid userId, CreateClubRequest request)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            throw new Exception("User not found");

        var club = new Club
        {
            Name = request.Name,
            UniversityId = user.UniversityId,
            CreatedAt = DateTime.UtcNow
        };

        await _clubRepository.CreateAsync(club);

        // Auto-join creator as member
        var membership = new Membership
        {
            ClubId = club.Id,
            UserId = userId,
            JoinedAt = DateTime.UtcNow
        };
        await _membershipRepository.CreateAsync(membership);

        return new ClubResponse
        {
            Id = club.Id,
            Name = club.Name,
            UniversityId = club.UniversityId,
            CreatedAt = club.CreatedAt,
            MemberCount = 1,
            IsMember = true
        };
    }

    public async Task<ClubResponse?> GetByIdAsync(Guid id, Guid userId)
    {
        var club = await _clubRepository.GetByIdAsync(id);
        if (club == null) return null;

        var isMember = await _membershipRepository.IsMemberAsync(id, userId);
        var memberCount = await _membershipRepository.GetMemberCountAsync(id);

        return new ClubResponse
        {
            Id = club.Id,
            Name = club.Name,
            UniversityId = club.UniversityId,
            CreatedAt = club.CreatedAt,
            MemberCount = memberCount,
            IsMember = isMember
        };
    }

    public async Task<ClubListResponse> GetByUniversityAsync(Guid universityId, int page = 1, int pageSize = 20)
    {
        var clubs = await _clubRepository.GetByUniversityAsync(universityId, page, pageSize);
        var totalCount = await _clubRepository.GetCountByUniversityAsync(universityId);

        var items = new List<ClubResponse>();
        foreach (var club in clubs)
        {
            var memberCount = await _membershipRepository.GetMemberCountAsync(club.Id);
            // Note: IsMember would require user context - for list we default to false
            items.Add(new ClubResponse
            {
                Id = club.Id,
                Name = club.Name,
                UniversityId = club.UniversityId,
                CreatedAt = club.CreatedAt,
                MemberCount = 0, // Could be optimized with a batch query
                IsMember = false
            });
        }

        return new ClubListResponse
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<bool> JoinAsync(Guid clubId, Guid userId)
    {
        if (await _membershipRepository.IsMemberAsync(clubId, userId))
            return false;

        var membership = new Membership
        {
            ClubId = clubId,
            UserId = userId,
            JoinedAt = DateTime.UtcNow
        };

        await _membershipRepository.CreateAsync(membership);
        return true;
    }

    public async Task<bool> LeaveAsync(Guid clubId, Guid userId)
    {
        return await _membershipRepository.DeleteAsync(clubId, userId);
    }
}