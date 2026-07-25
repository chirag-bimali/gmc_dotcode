using Hub.Application.DTOs.Comment;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Domain.Enums;

namespace Hub.Application.Services;

public class CommentService : ICommentService
{
    private readonly ICommentRepository _commentRepository;
    private readonly IPostRepository _postRepository;
    private readonly IClubInternalApi _clubApi;
    private readonly IUserRepository _userRepository;

    public CommentService(
        ICommentRepository commentRepository,
        IPostRepository postRepository,
        IClubInternalApi clubApi,
        IUserRepository userRepository)
    {
        _commentRepository = commentRepository;
        _postRepository = postRepository;
        _clubApi = clubApi;
        _userRepository = userRepository;
    }

    public async Task<CommentResponse> CreateAsync(Guid userId, CreateCommentRequest request)
    {
        var post = await _postRepository.GetByIdAsync(request.PostId);
        if (post == null)
            throw new Exception("Post not found");

        // Check membership via Club API
        var isMember = await _clubApi.IsMemberAsync(post.ClubId, userId);
        if (!isMember)
            throw new Exception("You must be a member of the club to comment");

        var comment = new Comment
        {
            PostId = request.PostId,
            UserId = userId,
            Text = request.Text,
            CreatedAt = DateTime.UtcNow
        };

        await _commentRepository.CreateAsync(comment);

        var user = await _userRepository.GetByIdAsync(userId);
        return new CommentResponse
        {
            Id = comment.Id,
            PostId = comment.PostId,
            UserId = comment.UserId,
            UserName = user?.FullName ?? user?.Email ?? "Unknown",
            Text = comment.Text,
            IsBestAnswer = comment.IsBestAnswer,
            CreatedAt = comment.CreatedAt
        };
    }

    public async Task<List<CommentResponse>> GetByPostAsync(Guid postId, int page = 1, int pageSize = 20)
    {
        var comments = await _commentRepository.GetByPostAsync(postId, page, pageSize);
        var userIds = comments.Select(c => c.UserId).Distinct().ToList();
        
        var users = await _userRepository.GetAllAsync();
        var userDict = users.Where(u => userIds.Contains(u.Id))
            .ToDictionary(u => u.Id, u => u.FullName ?? u.Email);

        return comments.Select(c => new CommentResponse
        {
            Id = c.Id,
            PostId = c.PostId,
            UserId = c.UserId,
            UserName = userDict.GetValueOrDefault(c.UserId, "Unknown"),
            Text = c.Text,
            IsBestAnswer = c.IsBestAnswer,
            CreatedAt = c.CreatedAt
        }).ToList();
    }

    public async Task<CommentResponse?> UpdateAsync(Guid id, Guid userId, string text)
    {
        var comment = await _commentRepository.GetByIdAsync(id);
        if (comment == null) return null;

        if (comment.UserId != userId)
            throw new Exception("You can only edit your own comments");

        comment.Text = text;
        await _commentRepository.UpdateAsync(comment);

        var user = await _userRepository.GetByIdAsync(userId);
        return new CommentResponse
        {
            Id = comment.Id,
            PostId = comment.PostId,
            UserId = comment.UserId,
            UserName = "", // Will be filled by controller
            Text = comment.Text,
            IsBestAnswer = comment.IsBestAnswer,
            CreatedAt = comment.CreatedAt
        };
    }

    public async Task<bool> DeleteAsync(Guid id, Guid userId)
    {
        var comment = await _commentRepository.GetByIdAsync(id);
        if (comment == null) return false;

        if (comment.UserId != userId)
            throw new Exception("You can only delete your own comments");

        return await _commentRepository.DeleteAsync(id);
    }

    public async Task<bool> MarkBestAnswerAsync(Guid commentId, Guid postId, Guid userId)
    {
        var post = await _postRepository.GetByIdAsync(postId);
        if (post == null) return false;

        if (post.UserId != userId)
            throw new Exception("Only the post author can mark best answer");

        if (post.Type != PostType.Doubt)
            throw new Exception("Best answer can only be set for Doubt type posts");

        var comment = await _commentRepository.GetByIdAsync(commentId);
        if (comment == null || comment.PostId != postId) return false;

        // Reset existing best answers
        var comments = await _commentRepository.GetByPostAsync(postId, 1, int.MaxValue);
        foreach (var c in comments)
        {
            if (c.IsBestAnswer)
            {
                c.IsBestAnswer = false;
                await _commentRepository.UpdateAsync(c);
            }
        }

        // Set new best answer
        var targetComment = await _commentRepository.GetByIdAsync(commentId);
        if (targetComment == null || targetComment.PostId != postId) return false;

        targetComment.IsBestAnswer = true;
        await _commentRepository.UpdateAsync(targetComment);
        return true;
    }
}