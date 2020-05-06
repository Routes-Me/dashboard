using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {

        private IAccountService _account;

        public AccountsController(IAccountService account)
        {
            this._account = account;
        }

        [HttpGet("[action]")]
        public IActionResult GetAllUserAccounts()
        {
            var allUserAccounts = _account.GetAllAccounts();
            return Ok(allUserAccounts);
        }

        [HttpGet("UserAccount/{id}")]
        public IActionResult GetUserAccountById(int id)
        {
            var acc = _account.GetUserAccountById(id);
            return Ok(acc);
        }

        [HttpPost("AddUserAccount")]
        public IActionResult AddUserAccount([FromBody]UserAccount account)
        {
            if (account != null)
            {
                _account.AddUserAccount(account);
            }
            return Ok();
        }

        [HttpPut("UpdateUserAccount/{id}")]
        public IActionResult UpdateUserAccount(int id, [FromBody]UserAccount account)
        {
            _account.UpdateUserAccount(id, account);
            return Ok(account);
        }

        [HttpDelete("DeleteUserAccount/{id}")]
        public IActionResult DeleteUserAccount(int id)
        {
            _account.DeleteUserAccount(id);
            return Ok();
        }

        [HttpPost("Login/{Username}/{Password}")]
        public IActionResult LoginUser([FromBody]string username, string password)
        {
            return Ok(_account.UserAccountExist(username, password));
        }

    }
}