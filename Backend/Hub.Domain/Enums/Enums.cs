namespace Hub.Domain.Enums;

public enum UserRole
{
    Student,
    ClubAdmin,
    UniversityAdmin
}

public enum UserStatus
{
    Invited,
    PendingProfile,
    Active,
    Disabled
}

public enum ClubPrivacy
{
    Public,
    Private
}

public enum MembershipRole
{
    Member,
    Admin
}

public enum MembershipStatus
{
    Pending,
    Approved,
    Rejected
}

public enum PostType
{
    Text,
    Image,
    Announcement,
    Poll
}

public enum RsvpStatus
{
    Going,
    Interested,
    NotGoing
}

public enum NotificationType
{
    Like,
    Comment,
    Event,
    Announcement,
    Membership
}

public enum ReferenceType
{
    Post,
    Comment,
    Event,
    Club,
    Membership
}

public enum ReportTargetType
{
    Post,
    Comment,
    User
}

public enum ReportStatus
{
    Pending,
    Reviewed,
    Resolved,
    Dismissed
}