using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Hub.Domain.Enums;

namespace Hub.Domain.Entities
{
    public class Membership
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ClubId { get; set; }
        [ForeignKey(nameof(ClubId))]
        public virtual Club Club { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public MembershipRole Role { get; set; }
        public MembershipStatus Status { get; set; }

        public DateTime JoinedAt { get; set; }
    }
}