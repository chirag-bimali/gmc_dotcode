using Hub.Domain.Entities;
using Hub.Domain.Enums;
using Hub.Infrastructure.Persistance.Data;
using Microsoft.EntityFrameworkCore;

namespace Hub.Tests;

// TEMPORARY smoke-test helper: seeds reference rows into the local hub_db so the
// Posts endpoints can be exercised over HTTP. Delete after use.
public class LocalDbSeed
{
    private static readonly Guid UniversityId = Guid.Parse("00000000-0000-0000-0000-000000000001");
    private static readonly Guid CategoryId = Guid.Parse("00000000-0000-0000-0000-000000000002");
    private static readonly Guid UserId = Guid.Parse("00000000-0000-0000-0000-000000000020");
    private static readonly Guid ClubId = Guid.Parse("00000000-0000-0000-0000-000000000010");

    [Fact]
    public async Task Seed()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseNpgsql("Host=localhost;Port=5432;Database=hub_db;Username=postgres;Password=Admin@1234")
            .Options;

        await using var context = new ApplicationDbContext(options);
        var now = DateTime.UtcNow;

        if (!await context.Set<University>().AnyAsync(u => u.Id == UniversityId))
        {
            context.Add(new University
            {
                Id = UniversityId,
                Name = "Test University",
                Logo = "",
                Description = "",
                Website = "",
                CreatedAt = now,
                UpdatedAt = now
            });
        }

        if (!await context.Set<ClubCategory>().AnyAsync(c => c.Id == CategoryId))
            context.Add(new ClubCategory { Id = CategoryId, Name = "Tech" });

        if (!await context.Users.AnyAsync(u => u.Id == UserId))
        {
            context.Add(new User
            {
                Id = UserId,
                UniversityId = UniversityId,
                Email = "seed.author@example.com",
                PasswordHash = "x",
                FullName = "Seed Author",
                Role = UserRole.ClubAdmin,
                Status = UserStatus.Active,
                CreatedAt = now
            });
        }

        await context.SaveChangesAsync();

        if (!await context.Set<Club>().AnyAsync(c => c.Id == ClubId))
        {
            context.Add(new Club
            {
                Id = ClubId,
                UniversityId = UniversityId,
                Name = "Robotics Club",
                Logo = "",
                CoverImage = "",
                Description = "",
                CategoryId = CategoryId,
                Privacy = ClubPrivacy.Public,
                CreatedBy = UserId,
                IsVerified = true,
                CreatedAt = now,
                UpdatedAt = now
            });
            await context.SaveChangesAsync();
        }

        Assert.True(await context.Set<Club>().AnyAsync(c => c.Id == ClubId));
    }
}
