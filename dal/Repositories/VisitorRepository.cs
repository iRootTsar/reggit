using dal.Models;
using dal.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace dal.repositories;

public class VisitorRepository
{
    private readonly Dbcontext _db;
    public VisitorRepository(Dbcontext db)
    {
        _db = db;
    }

    public Visitor Create(Visitor visitor)
    {
        _db.Visitors.Add(visitor);
        _db.SaveChanges();
        return visitor;
    }

    public Visitor Delete(int id)
    {
        var visitor = _db.Visitors.Find(id);
        _db.Visitors.Remove(visitor);
        _db.SaveChanges();
        return visitor;
    }

    public Visitor Get(int id)
    {
        return _db.Visitors.Find(id);
    }

    public IEnumerable<Visitor> GetAll()
    {
        return _db.Visitors.ToArray();
    }

    public void Update(VisitorDTO visitor)
    {
        _db.Visitors.Update(visitor);
        _db.SaveChanges();

    }
}