using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Club
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UniversityId { get; set; }
        [ForeignKey(nameof(UniversityId))]
        public virtual University? University { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string Logo { get; set; } = null!;
        public string CoverImage { get; set; } = null!;
        public string Description { get; set; } = null!;

        [Required]
        public Guid CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public virtual ClubCategory? Category { get; set; }

        public ClubPrivacy Privacy { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }
        [ForeignKey(nameof(CreatedBy))]
        public virtual User? Creator { get; set; }

        public bool IsVerified { get; set; }
        public bool IsArchived { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public virtual ICollection<Membership>? Memberships { get; set; }
        public virtual ICollection<Post>? Posts { get; set; }
        public virtual ICollection<Event>? Events { get; set; }
    }
}