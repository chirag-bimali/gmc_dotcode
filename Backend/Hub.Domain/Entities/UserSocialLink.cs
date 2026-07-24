using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class UserSocialLink
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [Required]
        public Guid PlatformId { get; set; }
        [ForeignKey(nameof(PlatformId))]
        public virtual SocialPlatform Platform { get; set; }

        [Required]
        public string Url { get; set; }
    }
}