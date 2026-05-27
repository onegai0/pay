public class CreateAttendanceDto
{
	public string CustomerName { get; set; } = string.Empty;
	public string Subject { get; set; } = string.Empty;
	public AttendanceTeam Team { get; set; }
}