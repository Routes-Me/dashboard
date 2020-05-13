using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class AccountService : IAccountService
    {
        public void AddUserAccount(UserAccount Acc)
        {
            Data.Accounts.Add(Acc);
        }

        public void DeleteUserAccount(int id)
        {
            var acc = Data.Accounts.FirstOrDefault(x => x.Id == id);
            if(acc != null)
            {
                Data.Accounts.Remove(acc);
            }
        }

        public List<UserAccount> GetAllAccounts() => Data.Accounts.ToList();


        public UserAccount GetUserAccountById(int id) => Data.Accounts.FirstOrDefault(x => x.Id == id);
       

        public void UpdateUserAccount(int id, UserAccount Acc)
        {
            var OldAccount = Data.Accounts.FirstOrDefault(x => x.Id == id);
            
            if(OldAccount != null)
            {
                OldAccount.userName = Acc.userName;
                OldAccount.password = Acc.password;
                OldAccount.companyId = Acc.companyId;
            }
        }

        public UserAccount UserAccountExist(String Username, String Password)
        {
            var status = "invalid User";
            UserAccount acc = Data.Accounts.FirstOrDefault(x => (x.userName == Username && x.password == Password));
            if (acc != null)
            {
                return acc;
            }
            return null;
        }
    }
}
