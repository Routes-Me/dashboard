using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersService _Users;
        public UsersController(IUsersService Users)
        {
            this._Users = Users;
        }

        [HttpGet("{id}")]
        public IActionResult GetUsers([FromRoute] int? userId, [FromQuery] QueryParameters parameters)
        {
            var users = _Users.GetUsers(userId, parameters);
            return Ok(users);
        }
        [HttpGet]
        [Route("roles")]
        public IActionResult GetUserRoles([FromQuery] QueryParameters parameters)
        {
            var roles = _Users.GetUser_Roles(parameters);
            return Ok(roles);
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
