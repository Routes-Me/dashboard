using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class DriverService : IDriverService
    {
        public void AddDriverAccount(Driver Acc)
        {
            Data.Drivers.Add(Acc);
        }


        public void DeleteDriverAccount(int Driverid)
        {
            var acc = Data.Drivers.FirstOrDefault(x => x.id == Driverid);
            if (acc != null)
            {
                Data.Drivers.Remove(acc);
            }
        }

        public List<Driver> GetAllDrivers() => Data.Drivers.ToList();
      

        public Driver GetUserDriverById(int Id) => Data.Drivers.FirstOrDefault(x => x.id == Id);

        public void UpdateDriverAccount(int id, Driver Acc)
        {
            var OldAccount = Data.Drivers.FirstOrDefault(x => x.id == id);

            if (OldAccount != null)
            {
                OldAccount.Name = Acc.Name;
                OldAccount.Liecense = Acc.Liecense;
                OldAccount.Vehicleid = Acc.Vehicleid;
            }
        }
    }
}
