using System;
using System.Collections.Generic;
using Hub.Domain.Enums;

namespace Hub.Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

    // Required org relationship
    public Guid UniversityId { get; set; }
    public University University { get; set; } = null!;

    // Auth / identity
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Student;
    public UserStatus Status { get; set; } = UserStatus.Invited;

    // Profile
    public string? FullName { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? Bio { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation - reverse relationships
    public ICollection<Membership> Memberships { get; set; } = new List<Membership>();
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<Like> Likes { get; set; } = new List<Like>();
    public ICollection<Club> ClubsCreated { get; set; } = new List<Club>();
}