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

        List<Users> IUsersService.GetUsers(int? id, [FromQuery] QueryParameters parameters)
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

        List<user_roles> IUsersService.GetUser_Roles(QueryParameters parameters)
        {
            throw new NotImplementedException();
        }

        Users IUsersService.UpdateUsers(Users user)
        {
            return user;
        }
    }
}
