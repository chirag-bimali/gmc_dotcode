using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Hub.Domain.Enums;

namespace Hub.Domain.Entities
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ClubId { get; set; }
        [ForeignKey(nameof(ClubId))]
        public virtual Club? Club { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User? User { get; set; }

        public PostType Type { get; set; }
        public string? Title { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        public string[] Tags { get; set; } = [];

        public PostStatus Status { get; set; } = PostStatus.Open;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public virtual ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
    }
}