using Hub.Application.DTOs.University;
using Hub.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UniversityController : ControllerBase
{
    private readonly UniversityService _universityService;

    public UniversityController(UniversityService universityService)
    {
        _universityService = universityService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUniversityRequest request)
    {
        try
        {
            var result = await _universityService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _universityService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _universityService.GetByIdAsync(id);
        if (result == null)
            return NotFound(new { error = "University not found" });

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUniversityRequest request)
    {
        try
        {
            var result = await _universityService.UpdateAsync(id, request);
            if (result == null)
                return NotFound(new { error = "University not found" });

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _universityService.DeleteAsync(id);
        if (!result)
            return NotFound(new { error = "University not found" });

        return NoContent();
    }
}