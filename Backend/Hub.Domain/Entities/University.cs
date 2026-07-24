using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hub.Domain.Entities
{
    public class University
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string Logo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Website { get; set; } = null!;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public virtual ICollection<Club>? Clubs { get; set; }
        public virtual ICollection<User>? Users { get; set; }
    }
}