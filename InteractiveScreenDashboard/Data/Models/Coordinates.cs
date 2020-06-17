using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Coordinates
    {
        public int id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
