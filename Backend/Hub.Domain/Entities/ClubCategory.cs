using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hub.Domain.Entities
{
    public class ClubCategory
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        // Navigation
        public virtual ICollection<Club> Clubs { get; set; } = [];
    }
}