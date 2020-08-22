using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Institution
    {
        public int id { get; set; }
        public string Name { get; set; }
        [Phone]
        public string Phone { get; set; }

        public string CountryIso { get; set; }
        public int[] ServiceId { get; set; }
    }
}
