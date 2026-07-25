namespace Hub.Application.DTOs.Like;

public class LikeResponse
{
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; }
}