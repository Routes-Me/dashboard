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

        void UpdateUserAccount(int id, UserAccount Acc);
        void DeleteUserAccount(int tripId);
        void AddUserAccount(UserAccount Acc);

        UserAccount UserAccountExist(String Username, String Password);

    }
}
