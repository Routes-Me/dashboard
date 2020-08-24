using InteractiveScreenDashboard.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IUsersService
    {
        List<Users> GetUsers(int? id, [FromQuery] QueryParameters parameters);
        List<user_roles> GetUser_Roles([FromQuery] QueryParameters parameters);
        Users AddUsers(Users user);
        Users UpdateUsers(Users user);
    }
}
