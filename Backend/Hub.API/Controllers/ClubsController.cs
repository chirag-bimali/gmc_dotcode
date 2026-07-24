using Hub.Application.DTOs.Club;
using Hub.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClubsController : ControllerBase
{
    private readonly IClubService _clubService;

    public ClubsController(IClubService clubService)
    {
        _clubService = clubService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateClubRequest request)
    {
        // TODO: Get userId from auth context - using existing test user for now
        var userId = Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422"); // test@test.com
        
        try
        {
            var result = await _clubService.CreateAsync(userId, request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        // TODO: Get universityId from user context
        var universityId = Guid.Parse("00000000-0000-0000-0000-000000000001"); // Test University
        
        var result = await _clubService.GetByUniversityAsync(universityId, page, pageSize);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        // TODO: Get userId from auth context
        var userId = Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422"); // test@test.com
        
        var result = await _clubService.GetByIdAsync(id, userId);
        if (result == null)
            return NotFound(new { error = "Club not found" });

        return Ok(result);
    }

    [HttpPost("{id}/join")]
    public async Task<IActionResult> Join(Guid id)
    {
        // TODO: Get userId from auth context
        var userId = Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422"); // test@test.com
        
        try
        {
            var result = await _clubService.JoinAsync(id, userId);
            if (!result)
                return BadRequest(new { error = "Already a member or club not found" });
            
            return Ok(new { message = "Successfully joined club" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("{id}/leave")]
    public async Task<IActionResult> Leave(Guid id)
    {
        // TODO: Get userId from auth context
        var userId = Guid.Parse("39bd181e-8c43-41aa-bb5d-e76e6b3f6422"); // test@test.com
        
        try
        {
            var result = await _clubService.LeaveAsync(id, userId);
            if (!result)
                return BadRequest(new { error = "Not a member or club not found" });
            
            return Ok(new { message = "Successfully left club" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}