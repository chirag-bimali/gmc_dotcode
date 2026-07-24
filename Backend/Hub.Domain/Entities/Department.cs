using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Department
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid FacultyId { get; set; }
        [ForeignKey(nameof(FacultyId))]
        public virtual Faculty? Faculty { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        // Navigation
        public virtual ICollection<User>? Users { get; set; }
    }
}