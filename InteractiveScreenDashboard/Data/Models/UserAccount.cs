﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class UserAccount
    {
        public int Id { get; set; }
        [EmailAddress]
        public String userName { get; set; }
        public String password { get; set; }
        public int companyId { get; set; }

    }
}
