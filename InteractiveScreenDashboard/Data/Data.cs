using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data
{
    public class Data
    {
    public static List<UserAccount> Accounts => UserAccounts;
    static List<UserAccount> UserAccounts = new List<UserAccount>()
    {
        new UserAccount()
        {
            Id=1,
            userName="vtharaka@routesme.com",
            password="Tester@123"

        },
         new UserAccount()
        {
            Id=2,
            userName="vtharaka@routesme.com",
            password="Tester@123"

        }

    };

        

        public static List<Vehicle> Vehicles => Vehicles;
        static List<Vehicle> VehicleList = new List<Vehicle>()
        {
            new Vehicle()
            {
                id =1,
                plate =1234,
                Make ="BMW",
                model ="X6",
                year = 2020,
                office = "Afnan"
            },
            new Vehicle()
            {
                id =2,
                plate =1233,
                Make ="Jeep",
                model ="X2",
                year = 2020,
                office = "Afnan"
            }
        };


        public static List<Driver> Drivers => Drivers;
        static List<Driver> DriversList = new List<Driver>()
        {
            new Driver()
            {
                id =1,
                Name ="Sam",
                Liecense ="KWT2020",
                Vehicleid =1
            },
            new Driver()
            {
                id =2,
                Name ="Mathew",
                Liecense ="KWT2021",
                Vehicleid =2
            }
        };


    }
}
