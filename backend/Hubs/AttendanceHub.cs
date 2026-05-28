using Microsoft.AspNetCore.SignalR;

public class AttendanceHub : Hub
{
	public async Task NotifyUpdate()
	{
		await Clients.All.SendAsync("AttendanceUpdated");
	}

	public override async Task OnConnectedAsync()
	{
		await Clients.Caller.SendAsync("AttendanceUpdated");
		await base.OnConnectedAsync();
	}
}