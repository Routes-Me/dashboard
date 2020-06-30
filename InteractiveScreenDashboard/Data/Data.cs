using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data
{
    public class Data
    {
    //public static List<UserAccount> Accounts => UserAccounts;
    //static List<UserAccount> UserAccounts = new List<UserAccount>()
    //{
    //    new UserAccount()
    //    {
    //        Id=1,
    //        UserName="vtharaka@routesme.com",
    //        Password="Tester@123",
    //        Name = "Vivian",
    //        AccountTypeId =1

    //    },
    //     new UserAccount()
    //    {
    //        Id=2,
    //        UserName="yshaar@routesme.com",
    //        Password="Tester@123",
    //        Name = "Yahya",
    //        AccountTypeId =2

    //    }

    //};


        public static List<Vehicle> Vehicles => VehicleList;
        static List<Vehicle> VehicleList = new List<Vehicle>()
        {
            new Vehicle()
            {
                id =1,
                plate =1234,
                Make ="BMW",
                model ="X6",
                year = 2020,
                Office = "Afnan"
            },
            new Vehicle()
            {
                id =2,
                plate =1233,
                Make ="Jeep",
                model ="X2",
                year = 2020,
                Office = "Afnan"
            },
            new Vehicle()
            {
                id =3,
                plate =1233,
                Make ="KIA  ",
                model ="X2",
                year = 2020,
                Office = "Afnan"
            }
        };



        public static List<Driver> Drivers => DriversList;
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
