using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface IPostRepository
{
    Task<Post?> GetByIdAsync(Guid id);
    Task<List<Post>> GetAllAsync();
    Task<List<Post>> GetByClubIdAsync(Guid clubId);
    Task<List<Post>> GetByAuthorIdAsync(Guid authorId);
    Task<Post> CreateAsync(Post post);
    Task<Post> UpdateAsync(Post post);
    Task<bool> DeleteAsync(Post post);
}
