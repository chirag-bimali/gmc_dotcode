using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UniversityId { get; set; }
        [ForeignKey(nameof(UniversityId))]
        public virtual University? University { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string? PasswordHash { get; set; }

        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }

        public string? StudentId { get; set; }

        public Guid? FacultyId { get; set; }
        [ForeignKey(nameof(FacultyId))]
        public virtual Faculty? Faculty { get; set; }

        public Guid? DepartmentId { get; set; }
        [ForeignKey(nameof(DepartmentId))]
        public virtual Department? Department { get; set; }

        public Guid? BatchId { get; set; }
        [ForeignKey(nameof(BatchId))]
        public virtual Batch? Batch { get; set; }

        public string? ProfilePicture { get; set; }
        public string? Bio { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public virtual ICollection<UserInterest>? UserInterests { get; set; }
        public virtual ICollection<UserSkill>? UserSkills { get; set; }
        public virtual ICollection<UserSocialLink>? SocialLinks { get; set; }
        public virtual ICollection<Membership>? Memberships { get; set; }
        public virtual ICollection<Post>? Posts { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
        public virtual ICollection<Rsvp>? Rsvps { get; set; }
        public virtual ICollection<Notification>? Notifications { get; set; }
        public virtual ICollection<Report>? ReportsFiled { get; set; }
        public virtual ICollection<Report>? ReportsReviewed { get; set; }
    }
}