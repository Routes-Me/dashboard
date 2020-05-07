using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IDriverService
    {
        List<Driver> GetAllDrivers();

        Driver GetUserDriverById(int id);

        void UpdateDriverAccount(int id, Driver Acc);
        void DeleteDriverAccount(int tripId);
        void AddDriverAccount(Driver Acc);

    }
}
