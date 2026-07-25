using Hub.Application.DTOs.Post;
using Hub.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/clubs/{clubId}/posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly IClubInternalApi _clubApi;

    public PostsController(IPostService postService, IClubInternalApi clubApi)
    {
        _postService = postService;
        _clubApi = clubApi;
    }

    private Guid GetUserId() => Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422");

    [HttpPost]
    public async Task<IActionResult> Create(Guid clubId, [FromBody] CreatePostRequest request)
    {
        var exists = await _clubApi.ExistsAsync(clubId);
        if (!exists) return NotFound(new { error = "Club not found" });

        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to post in this club" });

        request.ClubId = clubId;
        var result = await _postService.CreateAsync(GetUserId(), request);
        return CreatedAtAction(nameof(GetById), new { clubId, id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> GetByClub(Guid clubId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] Hub.Domain.Enums.PostType? type = null)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to view posts" });

        var result = await _postService.GetByClubAsync(clubId, page, pageSize, type);
        return Ok(result);
    }

    [HttpGet("{id}")]
public async Task<IActionResult> GetById(Guid clubId, Guid id)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to view posts" });

        var result = await _postService.GetByIdAsync(id, GetUserId());
        if (result == null) return NotFound(new { error = "Post not found" });
        
        if (result.ClubId != clubId) return NotFound();

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid clubId, Guid id, [FromBody] UpdatePostRequest request)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to update posts" });

        var result = await _postService.UpdateAsync(id, GetUserId(), request);
        if (result == null) return NotFound(new { error = "Post not found or not authorized" });
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid clubId, Guid id)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to delete posts" });

        var deleted = await _postService.DeleteAsync(id, GetUserId());
        if (!deleted) return NotFound(new { error = "Post not found or not authorized" });

        return NoContent();
    }

    [HttpPost("{id}/best-answer/{commentId}")]
    public async Task<IActionResult> MarkBestAnswer(Guid clubId, Guid id, Guid commentId)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return StatusCode(403, new { error = "You must be a member to mark best answer" });

        var result = await _postService.SetBestAnswerAsync(id, commentId, GetUserId());
        if (!result) return BadRequest(new { error = "Cannot mark best answer" });

        return Ok(new { message = "Best answer marked" });
    }
}