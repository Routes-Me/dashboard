using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IAccountService
    {
        List<UserAccount> GetAllAccounts();

        UserAccount GetUserAccountById(int id);

        UserAccount UpdateUserAccount(int id, UserAccount Acc);
        UserAccount DeleteUserAccount(int id);
        UserAccount AddUserAccount(UserAccount Acc);

        UserAccount UserAccountAccess(String Username, String Password);

        bool UserAccountExist(int id);
    }
}
