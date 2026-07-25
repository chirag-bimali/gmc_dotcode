using Hub.Application.DTOs.Like;
using Hub.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/clubs/{clubId}/posts/{postId}/like")]
public class LikesController : ControllerBase
{
    private readonly ILikeService _likeService;
    private readonly IClubInternalApi _clubApi;

    public LikesController(ILikeService likeService, IClubInternalApi clubApi)
    {
        _likeService = likeService;
        _clubApi = clubApi;
    }

    private Guid GetUserId() => Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422");

    [HttpPost]
    public async Task<IActionResult> Toggle(Guid clubId, Guid postId)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to like posts" });

        var exists = await _likeService.ExistsAsync(postId, GetUserId());
        if (exists)
        {
            await _likeService.DeleteAsync(postId, GetUserId());
            return Ok(new { liked = false });
        }
        else
        {
            await _likeService.ToggleAsync(postId, GetUserId());
            return Ok(new { liked = true });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetByPost(Guid clubId, Guid postId)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to view likes" });

        var likes = await _likeService.GetByPostAsync(postId);
        var count = await _likeService.GetCountAsync(postId);
        var isLiked = await _likeService.ExistsAsync(postId, GetUserId());

        return Ok(new { count, isLiked, likes });
    }
}