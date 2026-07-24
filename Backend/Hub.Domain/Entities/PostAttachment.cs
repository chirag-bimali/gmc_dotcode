using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class PostAttachment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public virtual Post Post { get; set; }

        [Required]
        public string FileUrl { get; set; }
        [Required]
        public string FileType { get; set; }
        public string FileName { get; set; }
        public long? FileSize { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}