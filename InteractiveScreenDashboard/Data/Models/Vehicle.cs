using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Vehicle
    {
        public int id { get; set; }
        public int VehicleId { get; set; }
        public int InstitutionId { get; set; }
        public int plate { get; set; }
        public string Make { get; set; }
        public string model { get; set; }
        public int year { get; set; }
        public string Office { get; set; }
    }
}
