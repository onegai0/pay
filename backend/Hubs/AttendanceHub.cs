using Microsoft.AspNetCore.SignalR;

public class AttendanceHub : Hub
{
	public async Task NotifyUpdate()
	{
		await Clients.All.SendAsync("AttendanceUpdated");
	}
}