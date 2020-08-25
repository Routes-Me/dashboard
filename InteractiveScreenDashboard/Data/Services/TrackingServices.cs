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
            List<IdleVehicle> IdleVehicleList = new List<IdleVehicle>();

            return IdleVehicleList;
        }
    }
}
