using InteractiveScreenDashboard.Data;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/users")]
    public class AccountsController : Controller
    {

        private readonly Iencrypt _Iencrypt;
        private readonly JWTSettings _jwtSettings;

        private IAccountService _account;

        public AccountsController(IAccountService account, Iencrypt iencrypt, IOptions<JWTSettings> jwtsettings)
        {
            this._account = account;
            this._Iencrypt = iencrypt;
            _jwtSettings = jwtsettings.Value;
        }


        [AllowAnonymous]
        [Produces(typeof(Users))]
        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] Authenticate account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string email = account.email;
            string password = encryptPassword(account.Password);
            //string testPassword = "aypkE2WKlaKhsRUPsXzpFPXZyBZ2NhDHHq8wd6JwJwA==";
            //string decodedCipher = decodePassword(testPassword);


            var acc = _account.UserAccountAccess(email, account.Password);

            return Ok(acc);
            //if (acc!= null)
            //{
            //    Request.HttpContext.Response.Headers.Add("AccessToken", GenerateAccessToken(acc.User_id));

            //    return Ok(acc);
            //}
            //return Unauthorized();
        }

        [HttpGet]
        public ActionResult GetAllUserAccounts()
        {

            var result =new ObjectResult(_account.GetAllAccounts())
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            Request.HttpContext.Response.Headers.Add("X-Total-Count", _account.GetAllAccounts().Count().ToString());
            return Ok(result);
        }



        [HttpGet("{id}")]
        [Produces (typeof(Users))]
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
        [Produces(typeof(Users))]
        public IActionResult AddUserAccount([FromBody]Users account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (account != null)
            {
                _account.AddUserAccount(account);
            }
            return CreatedAtAction("GetUserAccountById",new { id=account.User_id }, account);
        }

        [HttpPut("{id}")]
        [Produces(typeof(Users))]
        public IActionResult UpdateUserAccount([FromRoute]int id, [FromBody]Users account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != account.User_id)
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
        [Produces(typeof(Users))]
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




        


        private string decryptPassword(string cipher)
        {
            string key = _Iencrypt.Key.ToString();
            string IVKey = _Iencrypt.IV.ToString();
            string password = Encrypt.DecryptAESString(cipher, key, IVKey);
            return password;
        }

        private string decodePassword(string cipher)
        {
            string key = _Iencrypt.Key.ToString();
            string IV  = _Iencrypt.IV.ToString();
            string password = Encrypt.DecodeAndDecrypt(cipher, IV, key);
            return password;
        }


        private string encryptPassword(string text)
        {
            string key = _Iencrypt.Key.ToString();
            string IVkey = _Iencrypt.IV.ToString();
            //string Salt = _Iencrypt.Salt.ToString();
            string cipher = Encrypt.EncryptAndEncode(text, IVkey, key);
            return cipher;
        }

        [AllowAnonymous]
        [HttpPost("forgot_password")]
        [Produces(typeof(Users))]
        public IActionResult EmailExist([FromBody]Users usr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _account.UserEmailExistAsync(usr.Email);
            sendMailForForgotPassword(user);
            Request.HttpContext.Response.Headers.Add("RecoveryToken", GenerateAccessToken(user.User_id));
            return Ok(user);
        }


        [AllowAnonymous]
        [HttpPost("rest_password")]
        [Produces(typeof(ResetPassword))]
        public IActionResult ResetPassword([FromBody]ResetPassword pswrd)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Users user = _account.UserEmailExistAsync(pswrd.Email);
            if(user==null)
            {
                return NotFound();
            }
            user.Password = decryptPassword(pswrd.Password);
            Users updatedUser = _account.UpdateUserAccount(user.User_id, user);
            return Ok(updatedUser);
        }

        private string GenerateAccessToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, Convert.ToString(userId))
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        private async Task<Users> GetUserFromAccessToken(string accessToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                SecurityToken securityToken;
                var principle = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out securityToken);

                JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;

                if (jwtSecurityToken != null && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    var userId = principle.FindFirst(ClaimTypes.Name)?.Value;

                    return _account.GetUserAccountById(int.Parse(userId));
                }
            }
            catch (Exception)
            {
                return new Users();
            }

            return new Users();
        }

        private bool AccountExists(int id)
        {
            return _account.UserAccountExist(id);
        }

       

        public void sendMailForForgotPassword(Users Obj)
        {
            String Email = "vtharaka@routesme.com", Password = "Jy@th!r@y", Hostname = "smtp.gmail.com";
            int Port = 587;

            MailMessage msgObj = new MailMessage(Email, Obj.Email);
            msgObj.Subject = "Change password request";
            msgObj.Body = CreateBodyForRegisterEmail(Obj);
            msgObj.IsBodyHtml = true;

            SmtpClient mailObj = new SmtpClient(Hostname, Port);
            mailObj.EnableSsl = true;


            NetworkCredential nc = new NetworkCredential(Email, Password);

            mailObj.UseDefaultCredentials = true;
            mailObj.Credentials = nc;
            mailObj.Send(msgObj);
        }

        private string CreateBodyForRegisterEmail(Users model)
        {
            var filePath = "C:/Users/LENOVO/Source/Repos/dashboard/InteractiveScreenDashboard/Mail/resetPasswordTemp.html";
            string body = string.Empty;
            using (StreamReader reader = System.IO.File.OpenText(filePath))
            {
                body = reader.ReadToEnd();
            }
            string hyperlink = "https://localhost:5001/resetpassword/" + model.Email;
            body = body.Replace("{Name}", model.First_name);
            body = body.Replace("{PasswordResetLink}", hyperlink);

            return body;
        }
    }
}