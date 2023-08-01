using System.ComponentModel.DataAnnotations;

namespace dal.Models;

public record Visitor
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    public string Name { get; init; }

    [Required(ErrorMessage = "Email is required")]
    public string Email { get; init; }
    public string? Phone { get; set; }
    public string? Organization { get; set; }

    public byte[] Image { get; set; }

    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
}
