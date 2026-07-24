namespace Hub.Application.DTOs.Club;

public class CreateClubRequest
{
    public string Name { get; set; } = string.Empty;
}

public class ClubResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid UniversityId { get; set; }
    public DateTime CreatedAt { get; set; }
    public int MemberCount { get; set; }
    public bool IsMember { get; set; }
}

public class ClubListResponse
{
    public List<ClubResponse> Items { get; set; } = [];
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}