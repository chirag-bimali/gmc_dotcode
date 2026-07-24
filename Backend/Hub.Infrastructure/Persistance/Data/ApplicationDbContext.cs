using Hub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hub.Infrastructure.Persistance.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<PostAttachment> PostAttachments => Set<PostAttachment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserInterest>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.InterestId });
        });

        modelBuilder.Entity<UserSkill>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.SkillId });
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasOne(r => r.Reporter)
                .WithMany(u => u.ReportsFiled)
                .HasForeignKey(r => r.ReportedBy)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(r => r.Reviewer)
                .WithMany(u => u.ReportsReviewed)
                .HasForeignKey(r => r.ReviewedBy)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
