using Hub.Application.DTOs.University;
using Hub.Application.Interfaces;
using Hub.Domain.Entities;

namespace Hub.Application.Services;

public class UniversityService : IUniversityService
{
    private readonly IUniversityRepository _universityRepository;

    public UniversityService(IUniversityRepository universityRepository)
    {
        _universityRepository = universityRepository;
    }

    public async Task<UniversityResponse> CreateAsync(CreateUniversityRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new Exception("Name is required");

        var existing = await _universityRepository.GetByNameAsync(request.Name);
        if (existing != null)
            throw new Exception("University with this name already exists");

        var university = new University
        {
            Name = request.Name,
            Logo = request.Logo,
            Description = request.Description,
            Website = request.Website,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _universityRepository.CreateAsync(university);
        return ToResponse(university);
    }

    public async Task<UniversityResponse?> GetByIdAsync(Guid id)
    {
        var university = await _universityRepository.GetByIdAsync(id);
        return university == null ? null : ToResponse(university);
    }

    public async Task<List<UniversityResponse>> GetAllAsync()
    {
        var universities = await _universityRepository.GetAllAsync();
        return universities.Select(ToResponse).ToList();
    }

    public async Task<UniversityResponse?> UpdateAsync(Guid id, UpdateUniversityRequest request)
    {
        var university = await _universityRepository.GetByIdAsync(id);
        if (university == null) return null;

        if (!string.IsNullOrWhiteSpace(request.Name))
        {
            var existing = await _universityRepository.GetByNameAsync(request.Name);
            if (existing != null && existing.Id != id)
                throw new Exception("University with this name already exists");
            university.Name = request.Name;
        }

        if (request.Logo != null) university.Logo = request.Logo;
        if (request.Description != null) university.Description = request.Description;
        if (request.Website != null) university.Website = request.Website;

        university.UpdatedAt = DateTime.UtcNow;

        await _universityRepository.UpdateAsync(university);
        return ToResponse(university);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _universityRepository.DeleteAsync(id);
    }

    private static UniversityResponse ToResponse(University university)
    {
        return new UniversityResponse
        {
            Id = university.Id,
            Name = university.Name,
            Logo = university.Logo,
            Description = university.Description,
            Website = university.Website,
            CreatedAt = university.CreatedAt,
            UpdatedAt = university.UpdatedAt
        };
    }
}