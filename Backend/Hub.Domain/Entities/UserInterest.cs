using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class UserInterest
    {
        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [Required]
        public Guid InterestId { get; set; }
        [ForeignKey(nameof(InterestId))]
        public virtual Interest Interest { get; set; }
    }
}