using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Hub.Domain.Enums;

namespace Hub.Domain.Entities
{
    public class Rsvp
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid EventId { get; set; }
        [ForeignKey(nameof(EventId))]
        public virtual Event Event { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public RsvpStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}