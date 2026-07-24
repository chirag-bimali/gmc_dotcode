using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Faculty
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UniversityId { get; set; }
        [ForeignKey(nameof(UniversityId))]
        public virtual University? University { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }

        // Navigation
        public virtual ICollection<Department>? Departments { get; set; }
        public virtual ICollection<User>? Users { get; set; }
    }
}