using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Driver
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Liecense { get; set; }
        public int Vehicleid { get; set; }
        public Vehicle OwnedVehicles {get; set;}

    }
}
