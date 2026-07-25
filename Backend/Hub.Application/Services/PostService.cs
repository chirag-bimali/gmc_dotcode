using Hub.Application.DTOs.Post;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Hub.Domain.Enums;

namespace Hub.Application.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly ICommentRepository _commentRepository;
    private readonly ILikeRepository _likeRepository;
    private readonly IMembershipRepository _membershipRepository;
    private readonly IUserRepository _userRepository;
    private readonly IClubInternalApi _clubApi;

    public PostService(
        IPostRepository postRepository,
        ICommentRepository commentRepository,
        ILikeRepository likeRepository,
        IMembershipRepository membershipRepository,
        IUserRepository userRepository,
        IClubInternalApi clubApi)
    {
        _postRepository = postRepository;
        _commentRepository = commentRepository;
        _likeRepository = likeRepository;
        _membershipRepository = membershipRepository;
        _userRepository = userRepository;
        _clubApi = clubApi;
    }

    public async Task<PostResponse> CreateAsync(Guid userId, CreatePostRequest request)
    {
        var isMember = await _clubApi.IsMemberAsync(request.ClubId, userId);
        if (!isMember)
            throw new Exception("You must be a member of this club to create a post");

        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            throw new Exception("User not found");

        var post = new Post
        {
            ClubId = request.ClubId,
            UserId = userId,
            Type = request.Type,
            Title = request.Title,
            Description = request.Description,
            Tags = request.Tags ?? [],
            Status = PostStatus.Open,
            CreatedAt = DateTime.UtcNow
        };

        await _postRepository.CreateAsync(post);

        return new PostResponse
        {
            Id = post.Id,
            ClubId = post.ClubId,
            UserId = post.UserId,
            UserName = user?.FullName ?? user?.Email ?? "Unknown",
            Type = post.Type,
            Title = post.Title,
            Description = post.Description,
            Tags = post.Tags,
            Status = post.Status,
            CreatedAt = post.CreatedAt,
            LikeCount = 0,
            CommentCount = 0,
            IsLiked = false,
            IsAuthor = true,
            HasBestAnswer = false
        };
    }

    public async Task<PostResponse?> GetByIdAsync(Guid id, Guid userId)
    {
        var post = await _postRepository.GetByIdWithDetailsAsync(id);
        if (post == null) return null;

        var isAuthor = post.UserId == userId;
        var isLiked = await _likeRepository.ExistsAsync(post.Id, userId);
        var likeCount = await _likeRepository.GetCountAsync(post.Id);
        var commentCount = await _commentRepository.GetCountByPostAsync(post.Id);
        var hasBestAnswer = post.Comments?.Any(c => c.IsBestAnswer) ?? false;
        var bestAnswerCommentId = post.Comments?.FirstOrDefault(c => c.IsBestAnswer)?.Id;

        var user = await _userRepository.GetByIdAsync(post.UserId);

        return new PostResponse
        {
            Id = post.Id,
            ClubId = post.ClubId,
            UserId = post.UserId,
            UserName = user?.FullName ?? user?.Email ?? "Unknown",
            Type = post.Type,
            Title = post.Title,
            Description = post.Description,
            Tags = post.Tags,
            Status = post.Status,
            CreatedAt = post.CreatedAt,
            LikeCount = 0,
            CommentCount = 0,
            IsLiked = false,
            IsAuthor = true,
            HasBestAnswer = false,
            BestAnswerCommentId = null
        };
    }

    public async Task<PostListResponse> GetByClubAsync(Guid clubId, int page = 1, int pageSize = 20, PostType? type = null)
    {
        var posts = await _postRepository.GetByClubAsync(clubId, page, pageSize, type);
        var totalCount = await _postRepository.GetCountByClubAsync(clubId, type);

        var items = new List<PostResponse>();
        foreach (var post in posts)
        {
            var user = await _userRepository.GetByIdAsync(post.UserId);
            items.Add(new PostResponse
            {
                Id = post.Id,
                ClubId = post.ClubId,
                UserId = post.UserId,
                UserName = user?.FullName ?? user?.Email ?? "Unknown",
                Type = post.Type,
                Title = post.Title,
                Description = post.Description,
                Tags = post.Tags,
                Status = post.Status,
                CreatedAt = post.CreatedAt,
                LikeCount = 0,
                CommentCount = 0,
                IsLiked = false,
                IsAuthor = false,
                HasBestAnswer = false,
                BestAnswerCommentId = null
            });
        }

        return new PostListResponse
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<PostResponse?> UpdateAsync(Guid id, Guid userId, UpdatePostRequest request)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null) return null;

        if (post.UserId != userId)
            throw new Exception("You can only update your own posts");

        if (!string.IsNullOrEmpty(request.Title))
            post.Title = request.Title;
        if (request.Description != null)
            post.Description = request.Description;
        if (request.Tags != null)
            post.Tags = request.Tags;
        if (request.Status.HasValue)
            post.Status = request.Status.Value;

        await _postRepository.UpdateAsync(post);

        var user = await _userRepository.GetByIdAsync(post.UserId);
        return new PostResponse
        {
            Id = post.Id,
            ClubId = post.ClubId,
            UserId = post.UserId,
            UserName = user?.FullName ?? user?.Email ?? "Unknown",
            Type = post.Type,
            Title = post.Title,
            Description = post.Description,
            Tags = post.Tags,
            Status = post.Status,
            CreatedAt = post.CreatedAt,
            LikeCount = 0,
            CommentCount = 0,
            IsLiked = false,
            IsAuthor = true,
            HasBestAnswer = false,
            BestAnswerCommentId = null
        };
    }

    public async Task<bool> DeleteAsync(Guid id, Guid userId)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null) return false;

        if (post.UserId != userId)
            throw new Exception("You can only delete your own posts");

        return await _postRepository.DeleteAsync(id);
    }

    public async Task<bool> SetBestAnswerAsync(Guid postId, Guid commentId, Guid userId)
    {
        var post = await _postRepository.GetByIdAsync(postId);
        if (post == null) return false;

        if (post.UserId != userId)
            throw new Exception("Only the post author can mark a best answer");

        // This would need CommentRepository to get comment details
        return true;
    }
}