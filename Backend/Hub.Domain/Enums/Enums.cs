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

public enum PostType
{
    Doubt,
    Resource,
    Info
}

public enum PostStatus
{
    Open,
    Closed,
    Resolved
}