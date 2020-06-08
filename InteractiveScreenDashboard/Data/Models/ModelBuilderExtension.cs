using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Models
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserAccount>().HasData(
                new UserAccount
                {
                    Id = 1,
                    UserName = "vtharaka@routesme.com",
                    Password = "Tester@123",
                    Name = "Vivian",
                    AccountTypeId = 1
                },
                new UserAccount()
                {
                    Id = 2,
                    UserName = "yshaar@routesme.com",
                    Password = "Tester@123",
                    Name = "Yahya",
                    AccountTypeId = 2
                }
                );

            modelBuilder.Entity<user_roles>().HasData(
                new user_roles() 
                { 
                    User_role_id =1,
                    Name = "SuperUser"
                });

            modelBuilder.Entity<Users>().HasData(
                new
                {
                    User_id = 1,
                    First_name = "Yahya",
                    Last_name = "A",
                    Email = "yshaar@routesme.com",
                    Password = "Tester@123",
                    User_role_id1 = 1
                },
                new
                {
                    User_id = 2,
                    First_name = "Vivian",
                    Last_name = "George",
                    Email = "vtharaka@routesme.com",
                    Password = "Tester@123",
                    User_role_id1 = 1
                }
                );

        }
    }
}
