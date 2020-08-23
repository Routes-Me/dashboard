using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IVehicleService
    {
        List<Vehicle> GetVehicles(int? id);

        Vehicle GetVehicleById(int id);

        Vehicle UpdateVehicleDetails(int id, Vehicle Acc);
        Vehicle DeleteVehicle(int tripId);
        Vehicle AddVehicle(Vehicle Acc);

        bool VehicleExist(int id);
    }
}
