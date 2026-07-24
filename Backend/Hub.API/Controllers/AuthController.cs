using System;
using System.Threading.Tasks;
using Hub.Application.DTOs.Auth;
using Hub.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var result = await _authService.RegisterAsync(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        if (result == null)
            return Unauthorized(new { error = "Invalid email or password" });

        return Ok(result);
    }

    [HttpGet("user/{id}")]
    public async Task<IActionResult> GetUser(Guid id)
    {
        var result = await _authService.GetByIdAsync(id);
        if (result == null)
            return NotFound(new { error = "User not found" });

        return Ok(result);
    }

    [HttpPut("user/{id}")]
    public async Task<IActionResult> UpdateProfile(Guid id, [FromBody] UpdateProfileRequest request)
    {
        var result = await _authService.UpdateProfileAsync(id, request);
        if (result == null)
            return NotFound(new { error = "User not found" });

        return Ok(result);
    }
}
