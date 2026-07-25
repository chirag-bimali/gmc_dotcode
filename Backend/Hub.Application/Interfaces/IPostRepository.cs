using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface IPostRepository
{
    Task<Post?> GetByIdAsync(Guid id);
    Task<Post?> GetByIdWithDetailsAsync(Guid id);
    Task<List<Post>> GetByClubAsync(Guid clubId, int page, int pageSize, Hub.Domain.Enums.PostType? type = null);
    Task<int> GetCountByClubAsync(Guid clubId, Hub.Domain.Enums.PostType? type = null);
    Task<Post> CreateAsync(Post post);
    Task<Post> UpdateAsync(Post post);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
}