using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IVehicleService
    {
        List<Vehicle> GetAllVehicles();

        Vehicle GetVehicleById(int id);

        void UpdateVehicleDetails(int id, Vehicle Acc);
        void DeleteVehicle(int tripId);
        void AddVehicle(Vehicle Acc);
    }
}
