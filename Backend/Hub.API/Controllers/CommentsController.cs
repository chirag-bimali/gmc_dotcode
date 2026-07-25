using Hub.Application.DTOs.Comment;
using Hub.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/clubs/{clubId}/posts/{postId}/comments")]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _commentService;
    private readonly IClubInternalApi _clubApi;

    public CommentsController(ICommentService commentService, IClubInternalApi clubApi)
    {
        _commentService = commentService;
        _clubApi = clubApi;
    }

    private Guid GetUserId() => Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422");

    [HttpGet]
    public async Task<IActionResult> GetByPost(Guid clubId, Guid postId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return Forbid();

        var comments = await _commentService.GetByPostAsync(postId, page, pageSize);
        return Ok(comments);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid clubId, Guid postId, [FromBody] CreateCommentRequest request)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return Forbid();

        request.PostId = postId;
        var result = await _commentService.CreateAsync(GetUserId(), request);
        return CreatedAtAction(nameof(GetByPost), new { clubId, postId }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid clubId, Guid postId, Guid id, [FromBody] UpdateCommentRequest request)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return Forbid();

        var result = await _commentService.UpdateAsync(id, GetUserId(), request.Text);
        if (result == null) return NotFound(new { error = "Comment not found or not authorized" });

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid clubId, Guid postId, Guid id)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return Forbid();

        var deleted = await _commentService.DeleteAsync(id, GetUserId());
        if (!deleted) return NotFound(new { error = "Comment not found or not authorized" });

        return NoContent();
    }

    [HttpPost("{id}/best-answer")]
    public async Task<IActionResult> MarkBestAnswer(Guid clubId, Guid postId, Guid id)
    {
        var isMember = await _clubApi.IsMemberAsync(clubId, GetUserId());
        if (!isMember) return Forbid();

        var result = await _commentService.MarkBestAnswerAsync(id, postId, GetUserId());
        if (!result) return BadRequest(new { error = "Cannot mark best answer" });

        return Ok(new { message = "Best answer marked" });
    }
}