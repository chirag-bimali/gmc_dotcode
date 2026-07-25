using Hub.Application.DTOs.Post;

namespace Hub.Application.Interfaces;

public interface IPostService
{
    Task<PostResponse> CreateAsync(Guid userId, CreatePostRequest request);
    Task<PostResponse?> GetByIdAsync(Guid id, Guid userId);
    Task<PostListResponse> GetByClubAsync(Guid clubId, int page = 1, int pageSize = 20, Hub.Domain.Enums.PostType? type = null);
    Task<PostResponse?> UpdateAsync(Guid id, Guid userId, UpdatePostRequest request);
    Task<bool> DeleteAsync(Guid id, Guid userId);
    Task<bool> SetBestAnswerAsync(Guid postId, Guid commentId, Guid userId);
}