using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IVehicleService
    {
        List<Vehicle> GetVehicles(int? id, QueryParameters? parameters);
        List<Model> GetModels(QueryParameters? parameter);
        List<Make> GetMakes(QueryParameters? parameter);
        Vehicle UpdateVehicleDetails(int id, Vehicle Acc);
        Vehicle AddVehicle(Vehicle Acc);
        Vehicle GetVehicleById(int id);
        Vehicle DeleteVehicle(int tripId);
        bool VehicleExist(int id);
    }
}
