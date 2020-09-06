using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class LoggedInUser
    {
        public string token { get; set; }
        public string status { get; set; }
        public string message { get; set; }
        public int responseCode { get; set; }
    }
}
