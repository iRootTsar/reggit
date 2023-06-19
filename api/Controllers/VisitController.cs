using Microsoft.AspNetCore.Mvc;
using dal.Models;
using dal.repositories;

namespace reggit_api.Controllers;

[ApiController]
[Route("[controller]")]
public class VisitController : ControllerBase
{


    private readonly ILogger<VisitController> _logger;
    private readonly VisitorRepository _repository;

    public VisitController(ILogger<VisitController> logger, VisitorRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpGet(Name = "GetVisitors")]
    public IEnumerable<Visitor> GetVisitors()
    {
        using var db = _repository.GetService<Dbcontext>();
        return db.Visitors.ToArray();
    }

    [HttpGet("{id}", Name = "GetVisitor")]
    public Visitor GetVisitor(int id)
    {
        using var db = _repository.GetService<Dbcontext>();
        return db.Visitors.Find(id);
    }

    [HttpPost(Name = "CreateVisitor")]
    public Visitor CreateVisitor(Visitor visitor)
    {
        using var db = _repository.GetService<Dbcontext>();
        db.Visitors.Add(visitor);
        db.SaveChanges();
        return visitor;
    }

    [HttpPut("{id}", Name = "UpdateVisitor")]
    public Visitor UpdateVisitor(int id, Visitor visitor)
    {
        _repository.Update(visitor);
    }
}

