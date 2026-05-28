using System.ComponentModel.DataAnnotations;

public class CreateAttendantDto
{
	[Required]
	public string Name { get; set; } = string.Empty;
	[Required]
	public AttendanceTeam Team { get; set; }
}