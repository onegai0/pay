public class Attendant 
{
	public int Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public AttendanceTeam Team { get; set; }
	public List<Attendance> ActiveAttendances { get; set; } = new();
	public bool IsAvailable => ActiveAttendances.Count < 3;
}