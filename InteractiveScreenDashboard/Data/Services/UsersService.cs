using InteractiveScreenDashboard.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class UsersService : IUsersService
    {
        Users IUsersService.AddUsers(Users user)
        {
            return user;
        }

        List<Users> IUsersService.GetUsers(int? id)
        {
            List<Users> UsersList = new List<Users>();
            if (id == null)
            {

            }
            else
            {

            }
            return UsersList;
        }

        Users IUsersService.UpdateUsers(Users user)
        {
            return user;
        }
    }
}
