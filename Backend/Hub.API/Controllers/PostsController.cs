using System;
using System.Threading.Tasks;
using Hub.Application.DTOs.Posts;
using Hub.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly PostService _postService;

    public PostsController(PostService postService)
    {
        _postService = postService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePostRequest request)
    {
        try
        {
            var result = await _postService.CreateAsync(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _postService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _postService.GetByIdAsync(id);
        if (result == null)
            return NotFound(new { error = "Post not found" });

        return Ok(result);
    }

    [HttpGet("club/{clubId}")]
    public async Task<IActionResult> GetByClub(Guid clubId)
    {
        var result = await _postService.GetByClubAsync(clubId);
        return Ok(result);
    }

    [HttpGet("author/{authorId}")]
    public async Task<IActionResult> GetByAuthor(Guid authorId)
    {
        var result = await _postService.GetByAuthorAsync(authorId);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePostRequest request)
    {
        try
        {
            var result = await _postService.UpdateAsync(id, request);
            if (result == null)
                return NotFound(new { error = "Post not found" });

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPatch("{id}/pin")]
    public async Task<IActionResult> SetPinned(Guid id, [FromQuery] bool isPinned = true)
    {
        var result = await _postService.SetPinnedAsync(id, isPinned);
        if (result == null)
            return NotFound(new { error = "Post not found" });

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _postService.DeleteAsync(id);
        if (!deleted)
            return NotFound(new { error = "Post not found" });

        return NoContent();
    }
}
