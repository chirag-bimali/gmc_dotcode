using Hub.Application.DTOs.Like;

namespace Hub.Application.Interfaces;

public interface ILikeService
{
    Task<LikeResponse> ToggleAsync(Guid postId, Guid userId);
    Task<List<LikeResponse>> GetByPostAsync(Guid postId);
    Task<bool> ExistsAsync(Guid postId, Guid userId);
    Task<int> GetCountAsync(Guid postId);
    Task<bool> DeleteAsync(Guid postId, Guid userId);
}