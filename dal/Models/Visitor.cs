namespace dal.Models;


public record Visitor
{
    public int Id { get; set; }
    public required string Name { get; init; }
    public required string Email { get; init; }
    public string? Phone { get; set; }
    public string? Organization { get; set; }

}
