using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Event
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ClubId { get; set; }
        [ForeignKey(nameof(ClubId))]
        public virtual Club? Club { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }
        [ForeignKey(nameof(CreatedBy))]
        public virtual User Creator { get; set; } = null!;

        [Required]
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        public string? Venue { get; set; }
        public int? Capacity { get; set; }
        public string? CoverImage { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public virtual ICollection<Rsvp>? Rsvps { get; set; }
    }
}