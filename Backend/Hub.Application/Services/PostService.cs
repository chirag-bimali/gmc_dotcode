using Hub.Application.DTOs.Posts;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hub.Application.Services;

public class PostService
{
    private const int MaxTitleLength = 200;
    private const int MaxContentLength = 5000;

    private readonly IPostRepository _postRepository;

    public PostService(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }

    public async Task<PostResponse> CreateAsync(CreatePostRequest request)
    {
        if (request.ClubId == Guid.Empty)
            throw new Exception("ClubId is required");
        if (request.AuthorId == Guid.Empty)
            throw new Exception("AuthorId is required");

        ValidateTitle(request.Title);
        ValidateContent(request.Content);

        var now = DateTime.UtcNow;

        var post = new Post
        {
            Id = Guid.NewGuid(),
            ClubId = request.ClubId,
            AuthorId = request.AuthorId,
            Type = request.Type,
            Title = string.IsNullOrWhiteSpace(request.Title) ? null : request.Title.Trim(),
            Content = request.Content.Trim(),
            IsPinned = request.IsPinned,
            CreatedAt = now,
            UpdatedAt = now,
            Attachments = new List<PostAttachment>()
        };

        foreach (var attachment in request.Attachments)
        {
            if (string.IsNullOrWhiteSpace(attachment.FileUrl))
                throw new Exception("Attachment FileUrl is required");
            if (string.IsNullOrWhiteSpace(attachment.FileType))
                throw new Exception("Attachment FileType is required");

            post.Attachments.Add(new PostAttachment
            {
                Id = Guid.NewGuid(),
                PostId = post.Id,
                FileUrl = attachment.FileUrl.Trim(),
                FileType = attachment.FileType.Trim(),
                FileName = attachment.FileName ?? string.Empty,
                FileSize = attachment.FileSize,
                CreatedAt = now
            });
        }

        try
        {
            await _postRepository.CreateAsync(post);
        }
        catch (DbUpdateException)
        {
            throw new Exception("Club or author not found. Use a valid ClubId and AuthorId.");
        }

        return ToResponse(post);
    }

    public async Task<PostResponse?> GetByIdAsync(Guid id)
    {
        var post = await _postRepository.GetByIdAsync(id);
        return post == null ? null : ToResponse(post);
    }

    public async Task<List<PostResponse>> GetAllAsync()
    {
        var posts = await _postRepository.GetAllAsync();
        return posts.Select(ToResponse).ToList();
    }

    public async Task<List<PostResponse>> GetByClubAsync(Guid clubId)
    {
        var posts = await _postRepository.GetByClubIdAsync(clubId);
        return posts.Select(ToResponse).ToList();
    }

    public async Task<List<PostResponse>> GetByAuthorAsync(Guid authorId)
    {
        var posts = await _postRepository.GetByAuthorIdAsync(authorId);
        return posts.Select(ToResponse).ToList();
    }

    public async Task<PostResponse?> UpdateAsync(Guid id, UpdatePostRequest request)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null) return null;

        if (request.Title != null)
        {
            ValidateTitle(request.Title);
            post.Title = string.IsNullOrWhiteSpace(request.Title) ? null : request.Title.Trim();
        }

        if (request.Content != null)
        {
            ValidateContent(request.Content);
            post.Content = request.Content.Trim();
        }

        if (request.Type.HasValue) post.Type = request.Type.Value;
        if (request.IsPinned.HasValue) post.IsPinned = request.IsPinned.Value;

        post.UpdatedAt = DateTime.UtcNow;

        await _postRepository.UpdateAsync(post);
        return ToResponse(post);
    }

    public async Task<PostResponse?> SetPinnedAsync(Guid id, bool isPinned)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null) return null;

        post.IsPinned = isPinned;
        post.UpdatedAt = DateTime.UtcNow;

        await _postRepository.UpdateAsync(post);
        return ToResponse(post);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null) return false;

        return await _postRepository.DeleteAsync(post);
    }

    private static void ValidateTitle(string? title)
    {
        if (title != null && title.Trim().Length > MaxTitleLength)
            throw new Exception($"Title must be {MaxTitleLength} characters or fewer");
    }

    private static void ValidateContent(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new Exception("Content is required");
        if (content.Trim().Length > MaxContentLength)
            throw new Exception($"Content must be {MaxContentLength} characters or fewer");
    }

    private static PostResponse ToResponse(Post post)
    {
        var attachments = (post.Attachments ?? new List<PostAttachment>())
            .Select(a => new PostAttachmentResponse(
                a.Id,
                a.FileUrl,
                a.FileType,
                string.IsNullOrWhiteSpace(a.FileName) ? null : a.FileName,
                a.FileSize))
            .ToList();

        return new PostResponse(
            post.Id,
            post.ClubId,
            post.AuthorId,
            post.Author?.FullName,
            post.Type,
            post.Title,
            post.Content,
            post.IsPinned,
            attachments,
            post.CreatedAt,
            post.UpdatedAt
        );
    }
}
