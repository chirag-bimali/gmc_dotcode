using Hub.Application.DTOs.Comment;

namespace Hub.Application.Interfaces;

public interface ICommentService
{
    Task<CommentResponse> CreateAsync(Guid userId, CreateCommentRequest request);
    Task<List<CommentResponse>> GetByPostAsync(Guid postId, int page = 1, int pageSize = 20);
    Task<CommentResponse?> UpdateAsync(Guid id, Guid userId, string text);
    Task<bool> DeleteAsync(Guid id, Guid userId);
    Task<bool> MarkBestAnswerAsync(Guid commentId, Guid postId, Guid userId);
}