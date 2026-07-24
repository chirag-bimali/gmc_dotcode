using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public virtual Post? Post { get; set; }

        [Required]
        public Guid AuthorId { get; set; }
        [ForeignKey(nameof(AuthorId))]
        public virtual User? Author { get; set; }

        public Guid? ParentId { get; set; }
        [ForeignKey(nameof(ParentId))]
        public virtual Comment? Parent { get; set; }

        public string? Content { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public virtual ICollection<Comment>? Replies { get; set; }
    }
}