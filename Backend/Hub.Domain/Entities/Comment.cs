using System;
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
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User? User { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;

        public bool IsBestAnswer { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}