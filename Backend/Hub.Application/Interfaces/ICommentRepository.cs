using Hub.Domain.Entities;

namespace Hub.Application.Interfaces;

public interface ICommentRepository
{
    Task<Comment?> GetByIdAsync(Guid id);
    Task<List<Comment>> GetByPostAsync(Guid postId, int page, int pageSize);
    Task<int> GetCountByPostAsync(Guid postId);
    Task<Comment> CreateAsync(Comment comment);
    Task<Comment> UpdateAsync(Comment comment);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
}