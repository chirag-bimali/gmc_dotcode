using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Report
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ReportedBy { get; set; }
        [ForeignKey(nameof(ReportedBy))]
        public virtual User Reporter { get; set; }

        [Required]
        public Guid UniversityId { get; set; }
        [ForeignKey(nameof(UniversityId))]
        public virtual University University { get; set; }

        [Required]
        public Guid ReportTypeId { get; set; }
        [ForeignKey(nameof(ReportTypeId))]
        public virtual ReportType ReportType { get; set; }

        public ReportTargetType TargetType { get; set; }
        public Guid TargetId { get; set; }

        public string Reason { get; set; }
        public ReportStatus Status { get; set; }

        public Guid? ReviewedBy { get; set; }
        [ForeignKey(nameof(ReviewedBy))]
        public virtual User Reviewer { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}