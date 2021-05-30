using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Sign_In.Services
{
    public interface INotificationService
    {
        void SendMessage(string message);
    }

    public class NotificationService : INotificationService
    {
        public void SendMessage(string message)
        {

        }
    }
}
