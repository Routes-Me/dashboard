using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersService _Users;
        public UsersController(IUsersService Users)
        {
            this._Users = Users;
        }

        [HttpGet("{id}")]
        public IActionResult GetUsers([FromRoute] int? id)
        {
            var users = _Users.GetUsers(id);
            return Ok(users);
        }

        [HttpPost]
        public IActionResult AddUsers([FromBody] Users user)
        {
            _Users.AddUsers(user);
            return Ok(user);
        }

        [HttpPut]
        public IActionResult AddUsers(int id, Users user)
        {
            if(id != user.User_id)
            {
                return BadRequest();
            }
            _Users.UpdateUsers(user);
            return Ok(user);
        }
    }
}
