using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public int User_role_id { get; set; }
        [ForeignKey("User_role_id")]
        public user_roles User_Roles { get; set; }
    }
}
