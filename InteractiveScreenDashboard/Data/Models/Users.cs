using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class Users
    {
        [Key]
        public int User_id { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public user_roles User_role_id { get; set; }
    }
}
