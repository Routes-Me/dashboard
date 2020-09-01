using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class Advertisementservices : IAdvertisementService
    {
        private readonly AppDBContext context;
        public Advertisementservices(AppDBContext context)
        {
            this.context = context;
        }

        public Advertisement addAdvertisement(Advertisement add)
        {
            throw new NotImplementedException();
        }

        public List<Advertisement> getAdvertisements(int? institutionId,QueryParameters? parameters)
        {
            List<Advertisement> adds = new List<Advertisement>();
            return adds;
        }

        public List<Campaign> getAllCampaign()
        {
            List<Campaign> campaigns = new List<Campaign>();
            return campaigns;
        }

        public List<DayInterval> getAllDayIntervals()
        {
            List<DayInterval> intervals = new List<DayInterval>();
            return intervals;
        }
    }
}
