using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class user_roles
    {
        [Key]
        public int User_role_id { get; set; }
        public string Name { get; set; }
    }
}
