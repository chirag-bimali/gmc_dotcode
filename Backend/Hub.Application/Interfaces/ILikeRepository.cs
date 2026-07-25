using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface ILikeRepository
{
    Task<Like?> GetAsync(Guid postId, Guid userId);
    Task<Like> CreateAsync(Like like);
    Task<bool> DeleteAsync(Guid postId, Guid userId);
    Task<List<Like>> GetByPostAsync(Guid postId);
    Task<bool> ExistsAsync(Guid postId, Guid userId);
    Task<int> GetCountAsync(Guid postId);
}