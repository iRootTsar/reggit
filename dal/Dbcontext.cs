using dal.Models;
using Microsoft.EntityFrameworkCore;

namespace dal;

public class Dbcontext : DbContext
{
    public DbSet<Visitor> Visitors { get; set; } = default!;
    public Dbcontext(DbContextOptions<Dbcontext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("Reggit");
        base.OnModelCreating(modelBuilder);

    }
}

