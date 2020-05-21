using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class VehicleService : IVehicleService
    {
        public Vehicle AddVehicle(Vehicle Veh)
        {
            Data.Vehicles.Add(Veh);
            return Veh;
        }

        public Vehicle DeleteVehicle(int Id)
        {
            var Veh = Data.Vehicles.FirstOrDefault(x => x.id == Id);
            if (Veh != null)
            {
                Data.Vehicles.Remove(Veh);
            }
            return Veh;
        }

        public List<Vehicle> GetAllVehicles() => Data.Vehicles.ToList();

        public Vehicle GetVehicleById(int Id) => Data.Vehicles.FirstOrDefault(x => x.id == Id);

        public Vehicle UpdateVehicleDetails(int Id, Vehicle veh)
        {
            var OldVehicle = Data.Vehicles.FirstOrDefault(x => x.id == Id);

            if (OldVehicle != null)
            {
                OldVehicle.plate = veh.plate;
                OldVehicle.Make = veh.Make;
                OldVehicle.model = veh.model;
                OldVehicle.year = veh.year;
                OldVehicle.Office = veh.Office;
            }
            return veh;
        }


        public bool VehicleExist(int id)
        {
            return (Data.Vehicles.Any(x => x.id == id));
        }
    }
}
