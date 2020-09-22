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

    public class Rootobject
    {
        public Pagination pagination { get; set; }
        public Data[] data { get; set; }
        public Included included { get; set; }
        public bool status { get; set; }
        public string message { get; set; }
        public int responseCode { get; set; }
    }

    public class Pagination
    {
        public int offset { get; set; }
        public int limit { get; set; }
        public int total { get; set; }
    }

    public class Included
    {
        public MediaO[] media { get; set; }
    }

    public class MediaO
    {
        public int MediaId { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public string MediaType { get; set; }
        public float Size { get; set; }
        public float Duration { get; set; }
    }

    public class Data
    {
        public int advertisementId { get; set; }
        public int institutionId { get; set; }
        public DateTime createdAt { get; set; }
        public int mediaId { get; set; }
    }

}
