using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AttendancesController : ControllerBase
{

	private readonly DistributionService _service;

	public AttendancesController(DistributionService service)
	{
		_service = service;
	}

	[HttpGet]
	public IActionResult GetAll()
	{
		return Ok(_service.GetAllAttendances());
	}

	[HttpPost]
	public IActionResult Create([FromBody] CreateAttendanceDto dto)
	{
		var attendance = new Attendance { CustomerName = dto.CustomerName, Subject = dto.Subject, Team = dto.Team };

		var created = _service.CreateAttendance(attendance);
		return CreatedAtAction(nameof(GetAll), created);
	}


	[HttpPatch("{id}/complete")]
	public IActionResult Complete(int id)
	{
		try
		{
			var completed = _service.CompleteAttendance(id);
			return Ok(completed);
		}
		catch (KeyNotFoundException)
		{
			return NotFound();
		}
	}
}