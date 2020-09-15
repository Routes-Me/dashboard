using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models.Front
{
    public class Media
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public IFormFile File { get; set; }
    }
}
