using dal.DTO;
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
    public async Task<IEnumerable<Visitor>> GetVisitors()
    {
        return await _repository.GetAll();
    }

    [HttpGet("{id}", Name = "GetVisitor")]
    public async Task<Visitor?> GetVisitor(int id)
    {
        return await _repository.Get(id);
    }

    [HttpPost("CreateVisitor", Name = "CreateVisitor")]
    public async Task<int> CreateVisitor([FromForm] CreateVisitorDTO createVisitorDTO)
    {

        return await _repository.Create(createVisitorDTO);
    }

    [HttpPost("UpdateVisitor", Name = "UpdateVisitor")]
    public async Task UpdateVisitor([FromForm] VisitorUpdateDTO visitorUpdate)
    {

        await _repository.Update(visitorUpdate);
    }

    [HttpDelete("{id}", Name = "DeleteVisitor")]
    public async Task DeleteVisitor(int id)
    {
        await _repository.Delete(id);
    }

    [HttpDelete("DeleteVisitors", Name = "DeleteVisitors")]
    public async Task DeleteMultipleVisitor([FromBody] List<int> ids)
    {
        await _repository.DeleteMany(ids);
    }

}

