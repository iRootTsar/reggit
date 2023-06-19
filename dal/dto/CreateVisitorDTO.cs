namespace dal.DTO;
public record CreateVisitorDTO(string Name, string Email, string? Phone, string? Organization, string? ImageURL);
public record VisitorUpdateDTO(int Id, string Name, string Email, string? Phone, string? Organization, string? ImageURL);
