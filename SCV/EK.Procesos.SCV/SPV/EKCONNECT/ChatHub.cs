using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Procesos.SCV.SPV.EKCONNECT
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(string user, string mensaje)
        {
            await Clients.All.SendAsync("receiveMessage", user, mensaje);
        }
    }
}
