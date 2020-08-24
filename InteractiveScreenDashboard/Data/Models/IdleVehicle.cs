using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class IdleVehicle
    {
        public int id { get; set; }
        public int institutionId { get; set; }
        public string status { get; set; }
        public string driver { get; set; }
        public string phone { get; set; }
        public string model { get; set; }
        public string institution { get; set; }
        public List<coordinate> coordinates { get; set; }
    }
}
