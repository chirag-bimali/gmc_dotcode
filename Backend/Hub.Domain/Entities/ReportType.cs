using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Hub.Domain.Entities
{
    public class ReportType
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<Report>? Reports { get; set; }
    }
}