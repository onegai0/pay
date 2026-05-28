using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class AttendantsController : ControllerBase
{
	private readonly DistributionService _service;

	public AttendantsController(DistributionService service)
	{
		_service = service;
	}

	[HttpGet]
	public IActionResult GetAll()
	{
		return Ok(_service.GetAllAttendants());
	}

	[HttpPost]
	public IActionResult Create([FromBody] CreateAttendantDto dto)
	{
		var attendant = new Attendant { Name = dto.Name, Team = dto.Team};

		var created = _service.AddAttendant(attendant);
		return CreatedAtAction(nameof(GetAll), created);
	}

	[HttpDelete("{id}")]
	public async Task <IActionResult> Delete(int id)
	{
		await _service.RemoveAttendant(id);
		return NoContent();
	}
}