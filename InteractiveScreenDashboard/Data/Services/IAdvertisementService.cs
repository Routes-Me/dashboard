using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IAdvertisementService
    {
        List<Advertisement> getAdvertisements(int ? institutionId, QueryParameters? parameters);
        List<Campaign> getAllCampaign();
        List<DayInterval> getAllDayIntervals();

        Advertisement addAdvertisement(Advertisement add);
    }
}
