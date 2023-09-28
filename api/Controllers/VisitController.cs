using dal.DTO;
using Microsoft.AspNetCore.Mvc;
using dal.Models;
using dal.repositories;
using PTouchCSharp;

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

    //Here we also do the printing itself, and we only suing first name
    [HttpPut(Name = "CreateVisitor")]
    public async Task<int> CreateVisitor(CreateVisitorDTO createVisitorUpdate)
    {
        var reg = await _repository.Create(createVisitorUpdate);

        var PrinterClient = new PrinterClient();
        var printer = new PTouch(2, new PTouchOptions { Copies = 1 });
        var firstName = createVisitorUpdate.Name.Split(' ')[0];
        printer.InsertData("name", firstName);
        printer.InsertData("org", createVisitorUpdate.Organization ??  "");
        var data = printer.Generate();
        PrinterClient.SendToPrinter(data, "10.101.0.200", 9100);
        return reg;
    }

    [HttpPost("", Name = "UpdateVisitor")]
    public async Task UpdateVisitor(VisitorUpdateDTO visitorUpdate)
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

