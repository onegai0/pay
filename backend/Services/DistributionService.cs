using Microsoft.AspNetCore.SignalR;

public class DistributionService
{
	private static List<Attendant> _attendants = new();
	private static List<Attendance> _attendances = new();
	private static Queue<Attendance> _cardsQueue = new();
	private static Queue<Attendance> _loansQueue = new();
	private static Queue<Attendance> _othersQueue = new();
	private static int _nextId = 1;


	private readonly IHubContext<AttendanceHub> _hub;

	public DistributionService(IHubContext<AttendanceHub> hub)
	{
		_hub = hub;
	}

	public List<Attendant> GetAllAttendants() => _attendants;

	public Attendant AddAttendant(Attendant attendant)
	{
		attendant.Id = _nextId++;
		_attendants.Add(attendant);
		return attendant;
	}

	public void RemoveAttendant(int id)
	{
		_attendants.RemoveAll(a => a.Id == id);
	}


	public List<Attendance> GetAllAttendances() => _attendances;

	public async Task<Attendance> CreateAttendance(Attendance attendance)
	{
		attendance.Id = _nextId++;
		attendance.Team = attendance.Team;
		attendance.Status = AttendanceStatus.Waiting;
		attendance.CreatedAt = DateTimeOffset.UtcNow;

		_attendances.Add(attendance);
		TryDistribute(attendance);

		await _hub.Clients.All.SendAsync("AttendanceUpdated");
		return attendance;
	}

	public async Task<Attendance> CompleteAttendance(int id)
	{
		var attendance = _attendances.FirstOrDefault(a => a.Id == id)
			?? throw new KeyNotFoundException();

		attendance.Status = AttendanceStatus.Completed;
		attendance.CompletedAt = DateTimeOffset.UtcNow;

		if (attendance.AttendantId.HasValue)
		{
			var attendant = _attendants.FirstOrDefault(a => a.Id == attendance.AttendantId);
			attendant?.ActiveAttendances.RemoveAll(a => a.Id == id);
		}

		ProcessQueue(attendance.Team);

		await _hub.Clients.All.SendAsync("AttendanceUpdated");
		return attendance;
	}

	private void TryDistribute(Attendance attendance)
	{
		var availableAttendant = _attendants
			.Where(a => a.Team == attendance.Team && a.IsAvailable)
			.FirstOrDefault();

		if (availableAttendant != null)
		{
			attendance.AttendantId = availableAttendant.Id;
			attendance.Status = AttendanceStatus.InProgress;
			availableAttendant.ActiveAttendances.Add(attendance);
		}
		else
		{
			EnqueueAttendance(attendance);
		}
	}

	private void EnqueueAttendance(Attendance attendance)
	{
		switch (attendance.Team)
		{
			case AttendanceTeam.Cards: _cardsQueue.Enqueue(attendance); break;
			case AttendanceTeam.Loans: _loansQueue.Enqueue(attendance); break;
			case AttendanceTeam.Others: _othersQueue.Enqueue(attendance); break;
		}
	}

	private void ProcessQueue(AttendanceTeam team)
	{
		var queue = team switch
		{
			AttendanceTeam.Cards => _cardsQueue,
			AttendanceTeam.Loans => _loansQueue,
			_ => _othersQueue
		};

		if (queue.Count > 0)
		{
			var next = queue.Dequeue();
			TryDistribute(next);
		}
	}


}