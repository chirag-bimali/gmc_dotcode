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
        public Guid AuthorId { get; set; }
        [ForeignKey(nameof(AuthorId))]
        public virtual User? Author { get; set; }

        public PostType Type { get; set; }
        public string? Title { get; set; }

        [Required]
        public string Content { get; set; }

        public bool IsPinned { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public virtual ICollection<PostAttachment>? Attachments { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
    }
}