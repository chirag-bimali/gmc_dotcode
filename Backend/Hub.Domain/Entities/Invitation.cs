using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class Invitation
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UniversityId { get; set; }
        [ForeignKey(nameof(UniversityId))]
        public virtual University University { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public Guid InvitedBy { get; set; }
        [ForeignKey(nameof(InvitedBy))]
        public virtual User Inviter { get; set; }

        [Required]
        public string Token { get; set; }

        public string Status { get; set; } // pending, accepted, expired

        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}