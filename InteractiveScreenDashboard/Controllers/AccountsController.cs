using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Controllers
{
    [Produces("application/json")]
    [Route("api/UserAccounts")]
    public class AccountsController : Controller
    {

        private IAccountService _account;

        public AccountsController(IAccountService account)
        {
            this._account = account;
        }

        
        public IActionResult GetAllUserAccounts()
        {
            var result =new ObjectResult(_account.GetAllAccounts())
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            Request.HttpContext.Response.Headers.Add("X-Total-Count", _account.GetAllAccounts().Count().ToString());
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Produces (typeof(UserAccount))]
        public IActionResult GetUserAccountById([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var acc = _account.GetUserAccountById(id);
            
            if (acc == null)
            {
                return NotFound();
            }
            return Ok(acc);
        }

        [HttpPost]
        [Produces(typeof(UserAccount))]
        public IActionResult AddUserAccount([FromBody]UserAccount account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (account != null)
            {
                _account.AddUserAccount(account);
            }
            return CreatedAtAction("GetUserAccountById",new { id=account.Id }, account);
        }

        [HttpPut("{id}")]
        [Produces(typeof(UserAccount))]
        public IActionResult UpdateUserAccount([FromRoute]int id, [FromBody]UserAccount account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != account.Id)
            {
                return BadRequest();
            }

            try
            {
                _account.UpdateUserAccount(id, account);
                return Ok(account);
            }
            catch(Exception e)
            {
                if (! AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw(e);
                }
            }
        }

        [HttpDelete("{id}")]
        [Produces(typeof(UserAccount))]
        public IActionResult DeleteUserAccountAsync([FromRoute]int id)
        {
            var acc = _account.GetUserAccountById(id);
            if (acc != null)
            {
                _account.DeleteUserAccount(id);
                return Ok(acc);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpPost("Login")]
        [Produces(typeof(UserAccount))]
        public IActionResult LoginUser([FromBody]UserAccount account)
        {
            var acc = _account.UserAccountAccess(account.userName, account.password);
            if(acc!= null)
            {
                return Ok(acc);
            }
            return Unauthorized();
        }

        private bool AccountExists(int id)
        {
            return _account.UserAccountExist(id);
        }

    }
}