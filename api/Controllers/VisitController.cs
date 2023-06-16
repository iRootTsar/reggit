using Microsoft.AspNetCore.Mvc;

namespace reggit_api.Controllers;

[ApiController]
[Route("[controller]")]
public class VisitController : ControllerBase
{
    

    private readonly ILogger<VisitController> _logger;

    public VisitController(ILogger<VisitController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetVisitors")]
    public IEnumerable<Visitor> Get()
    {
        return Enumerable.Range(1, 2).Select(index => new Visitor
        {
            Name = "Bjartmar",
            Email = "vlad@komponent.no",
        })
        .ToArray();
    }
}

public record Visitor
{
    public string? Name; 

    public string? Email;
}
