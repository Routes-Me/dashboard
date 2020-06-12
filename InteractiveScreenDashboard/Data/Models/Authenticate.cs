using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Authenticate
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
