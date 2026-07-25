using Hub.Application.DTOs.Like;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hub.Application.Services;

public class LikeService : ILikeService
{
    private readonly ILikeRepository _likeRepository;
    private readonly IPostRepository _postRepository;

    public LikeService(ILikeRepository likeRepository, IPostRepository postRepository)
    {
        _likeRepository = likeRepository;
        _postRepository = postRepository;
    }

    public async Task<LikeResponse> ToggleAsync(Guid postId, Guid userId)
    {
        var post = await _postRepository.GetByIdAsync(postId);
        if (post == null)
            throw new Exception("Post not found");

        var existing = await _likeRepository.GetAsync(postId, userId);
        if (existing != null)
        {
            await _likeRepository.DeleteAsync(postId, userId);
            return new LikeResponse { PostId = postId, UserId = userId, CreatedAt = DateTime.UtcNow };
        }

        var like = new Like
        {
            PostId = postId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        await _likeRepository.CreateAsync(like);
        return new LikeResponse
        {
            PostId = like.PostId,
            UserId = like.UserId,
            CreatedAt = like.CreatedAt
        };
    }

    public async Task<List<LikeResponse>> GetByPostAsync(Guid postId)
    {
        var likes = await _likeRepository.GetByPostAsync(postId);
        return likes.Select(l => new LikeResponse
        {
            PostId = l.PostId,
            UserId = l.UserId,
            CreatedAt = l.CreatedAt
        }).ToList();
    }

    public async Task<bool> ExistsAsync(Guid postId, Guid userId)
    {
        return await _likeRepository.ExistsAsync(postId, userId);
    }

    public async Task<int> GetCountAsync(Guid postId)
    {
        return await _likeRepository.GetCountAsync(postId);
    }

    public async Task<bool> DeleteAsync(Guid postId, Guid userId)
    {
        return await _likeRepository.DeleteAsync(postId, userId);
    }
}