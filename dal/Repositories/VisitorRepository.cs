using dal.Models;
using dal.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace dal.repositories;

public class VisitorRepository
{
    private readonly Dbcontext _context;
    public VisitorRepository(Dbcontext context)
    {
        _context = context;
    }

    public async Task<int> Create(CreateVisitorDTO dto)
    {
        Visitor visitor = new()
        {
            Name = dto.Name,
            Email = dto.Email,
            Organization = dto.Organization,
            Phone = dto.Phone,
            ImageURL = dto.ImageURL
        };
        _context.Visitors.Add(visitor);
        await _context.SaveChangesAsync();
        return visitor.Id;
    }

    public async Task Delete(int id)
    {
        await _context.Visitors.Where(x => x.Id == id).ExecuteDeleteAsync();
    }

    public async Task DeleteMany(IEnumerable<int> ids)
    {
        await _context.Visitors.Where(x => ids.Contains(x.Id)).ExecuteDeleteAsync();
    }

    public async Task<Visitor?> Get(int id)
    {
        return await _context.Visitors.FindAsync(id);
    }

    public async Task<IEnumerable<Visitor>> GetAll()
    {
        return await _context.Visitors.ToArrayAsync();
    }

    public async Task Update(VisitorUpdateDTO visitorUpdate)
    {
        await _context.Visitors.Where(x => x.Id == visitorUpdate.Id).ExecuteUpdateAsync(entity => entity
            .SetProperty(prop => prop.Name, visitorUpdate.Name)
            .SetProperty(prop => prop.Email, visitorUpdate.Email)
            .SetProperty(prop => prop.Organization, visitorUpdate.Organization)
            .SetProperty(prop => prop.Phone, visitorUpdate.Phone)
            .SetProperty(prop => prop.ImageURL, visitorUpdate.ImageURL));
    }
}