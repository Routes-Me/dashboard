using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public class QueryParameters
    {
        public int? currentPage { get; set; }
        public int? pageSize { get; set; }
        public string[]? include { get; set; }
    }
}
