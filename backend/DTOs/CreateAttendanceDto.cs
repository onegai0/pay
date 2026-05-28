using System.ComponentModel.DataAnnotations;

public class CreateAttendanceDto
{
	[Required]
	public string CustomerName { get; set; } = string.Empty;
	[Required]
	public string Subject { get; set; } = string.Empty;
	[Required]
	public AttendanceTeam Team { get; set; }
}