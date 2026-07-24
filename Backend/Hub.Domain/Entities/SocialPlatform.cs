using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hub.Domain.Entities
{
    public class SocialPlatform
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        // Navigation
        public virtual ICollection<UserSocialLink>? UserSocialLinks { get; set; }
    }
}