using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hub.Domain.Entities
{
    public class UserSkill
    {
        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [Required]
        public Guid SkillId { get; set; }
        [ForeignKey(nameof(SkillId))]
        public virtual Skill Skill { get; set; }
    }
}