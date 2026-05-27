public class Attendance
{
	public int Id { get; set; }
	public string CustomerName { get; set; } = string.Empty;
	public string Subject { get; set; } = string.Empty;
	public AttendanceTeam Team { get; set; }
	public AttendanceStatus Status { get; set; }
	public int? AttendantId { get; set; }
	public DateTimeOffset CreatedAt { get; set; }
	public DateTimeOffset? CompletedAt { get; set; }
}