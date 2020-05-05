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
    }
}
