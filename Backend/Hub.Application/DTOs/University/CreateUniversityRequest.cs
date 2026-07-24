namespace Hub.Application.DTOs.University;

public class CreateUniversityRequest
{
    public string Name { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
}