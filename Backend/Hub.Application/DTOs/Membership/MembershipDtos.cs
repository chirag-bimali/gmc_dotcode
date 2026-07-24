namespace Hub.Application.DTOs.Membership;

public class JoinClubRequest { }

public class MembershipResponse
{
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public DateTime JoinedAt { get; set; }
}