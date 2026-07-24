using Hub.Domain.Entities;
using Hub.Domain.Enums;

namespace Hub.Tests;

public static class TestData
{
    public static Post Post(
        Guid? id = null,
        Guid? clubId = null,
        Guid? authorId = null,
        string content = "hello world",
        bool isPinned = false,
        DateTime? createdAt = null,
        string? title = null)
    {
        var created = createdAt ?? new DateTime(2026, 7, 1, 12, 0, 0, DateTimeKind.Utc);

        return new Post
        {
            Id = id ?? Guid.NewGuid(),
            ClubId = clubId ?? Guid.NewGuid(),
            AuthorId = authorId ?? Guid.NewGuid(),
            Type = PostType.Text,
            Title = title,
            Content = content,
            IsPinned = isPinned,
            CreatedAt = created,
            UpdatedAt = created,
            Attachments = new List<PostAttachment>()
        };
    }

    public static User User(Guid id, string fullName = "Test Student")
    {
        return new User
        {
            Id = id,
            UniversityId = Guid.Parse("00000000-0000-0000-0000-000000000001"),
            Email = $"{id:N}@example.com",
            PasswordHash = "hash",
            FullName = fullName,
            Role = UserRole.Student,
            Status = UserStatus.Active,
            CreatedAt = new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc)
        };
    }
}
