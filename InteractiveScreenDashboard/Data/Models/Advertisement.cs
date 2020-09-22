using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Advertisement
    {
        public int id { get; set; }
        public string Name { get; set; }

        List<DayInterval> Intervals { get; set; }

        List<Campaign> Campaigns { get; set; }

    }
}
