﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class UserAccount
    {
        [Key]
        public int Id { get; set; }
        [EmailAddress]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public int AccountTypeId { get; set; }

    }
}