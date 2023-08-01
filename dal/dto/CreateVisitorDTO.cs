namespace dal.DTO;
public class CreateVisitorDTO
{
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Phone { get; set; }
    public string? Organization { get; set; }
    public byte[]? Image { get; set; }
    public CreateVisitorDTO(string name, string email, string? phone, string? organization, byte[]? image)
    {
        Name = name;
        Email = email;
        Phone = phone;
        Organization = organization;
        Image = image;
    }
    public CreateVisitorDTO()
    { }
}
public class VisitorUpdateDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Phone { get; set; }
    public string? Organization { get; set; }
    public byte[]? Image { get; set; }
    public VisitorUpdateDTO(int id, string name, string email, string? phone, string? organization, byte[]? image)
    {
        Id = id;
        Name = name;
        Email = email;
        Phone = phone;
        Organization = organization;
        Image = image;
    }
}