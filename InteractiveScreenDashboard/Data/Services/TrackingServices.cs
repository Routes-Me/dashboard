using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class TrackingServices : ITrackingServices
    {
        List<IdleVehicle> ITrackingServices.GetIdleVehicles()
        {
            throw new NotImplementedException();
        }
    }
}
