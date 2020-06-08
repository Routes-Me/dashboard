using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IAccountService
    {
        List<Users> GetAllAccounts();

        Users GetUserAccountById(int id);

        Users UpdateUserAccount(int id, Users Acc);
        Users DeleteUserAccount(int id);
        Users AddUserAccount(Users Acc);

        Users UserAccountAccess(String Username, String Password);

        bool UserAccountExist(int id);
    }
}
