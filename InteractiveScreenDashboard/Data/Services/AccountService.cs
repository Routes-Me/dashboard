using InteractiveScreenDashboard.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{

    public class AccountService : IAccountService
    {
        private readonly AppDBContext context;
        private readonly IHttpClientFactory _clientFactory;

        public AccountService(AppDBContext context, IHttpClientFactory clientFactory )
        {
            this.context = context;
            this._clientFactory = clientFactory;
        }


        public Users DeleteUserAccount(int id)
        {
            var acc = context.Users.FirstOrDefault(x => x.User_id == id);
            if(acc != null)
            {
                context.Users.Remove(acc);
                context.SaveChangesAsync();
            }
            return acc;
        }



        public List<Users> GetAllAccounts()
        {
            return context.Users.Include(u=>u.User_Roles).ToList();
        }

        public Users GetUserAccountById(int id) => context.Users.FirstOrDefault(x => x.User_id == id);
       

        public Users UpdateUserAccount(int id, Users Acc)
        {
            var OldAcc = context.Users.Attach(Acc);
            OldAcc.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChangesAsync();
            return Acc;
            //var OldAccount = context.UserAccounts.FirstOrDefault(x => x.Id == id);
            
            //if(OldAccount != null)
            //{
            //    OldAccount.userName = Acc.userName;
            //    OldAccount.password = Acc.password;
            //    OldAccount.companyId = Acc.companyId;
            //}
            //return Acc;
        }

        public async Task<Users> UserAccountAccessAsync(string Username, string Password)
        {
            Users acc = context.Users.Include(u=>u.User_Roles).FirstOrDefault(x => (x.Email.Equals(Username) && x.Password.Equals(Password))) ;
            if (acc != null)
            {
                return acc;
            }

            Authenticate user = new Authenticate();
            user.email = Username;
            user.password = Password;

            //var userObj = new StringContent(JsonSerializer.Serialize(user, _jsonSerializerOptions),Encoding.UTF8,"application/json");
            //var userObj="";
            //var client = _clientFactory.CreateClient("Staging");
            //var response = await client.PostAsync("/api/v1/signin", userObj);

            //using (var httpClient = new HttpClient())
            //{
            //    LoggedInUser user = new LoggedInUser();
                
            //    using (var response = await httpClient.GetAsync("https://localhost:8888/api/v1/signin"))
            //    {
            //        string apiResponse = await response.Content.ReadAsStringAsync();
            //        user = JsonConvert.DeserializeObject<LoggedInUser>(apiResponse);
            //    }
            //}


            return null;
        }



        public Users AddUserAccount(Users Acc)
        {
            context.Users.Add(Acc);
            context.SaveChanges();
            return Acc;
        }


        public bool UserAccountExist(int id)
        {
            return context.Users.Any(x => x.User_id == id);
        }

        public Users UserEmailExistAsync(string email)
        {
            Users user = context.Users.FirstOrDefault(i => i.Email.Equals(email));
            return user;
        }

    }
}
