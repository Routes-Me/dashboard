using InteractiveScreenDashboard.Data;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Controllers
{
    [Produces("application/json")]
    [Route("api/UserAccounts")]
    public class AccountsController : Controller
    {

        private readonly Iencrypt _Iencrypt;

        private IAccountService _account;

        public AccountsController(IAccountService account, Iencrypt iencrypt)
        {
            this._account = account;
            this._Iencrypt = iencrypt;
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


        //public static string DecryptStringAES(string cipherText)
        //{
        //    var keybytes = Encoding.UTF8.GetBytes("8080808080808080");
        //    var iv = Encoding.UTF8.GetBytes("8080808080808080");

        //    var encrypted = Convert.FromBase64String(cipherText);
        //    var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes, iv);
        //    return string.Format(decriptedFromJavascript);
        //}


        //private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        //{
        //    // Check arguments.  
        //    if (cipherText == null || cipherText.Length <= 0)
        //    {
        //        throw new ArgumentNullException("cipherText");
        //    }
        //    if (key == null || key.Length <= 0)
        //    {
        //        throw new ArgumentNullException("key");
        //    }
        //    if (iv == null || iv.Length <= 0)
        //    {
        //        throw new ArgumentNullException("key");
        //    }

        //    // Declare the string used to hold  
        //    // the decrypted text.  
        //    string plaintext = null;

        //    // Create an RijndaelManaged object  
        //    // with the specified key and IV.  
        //    using (var rijAlg = new RijndaelManaged())
        //    {
        //        //Settings  
        //        rijAlg.Mode = CipherMode.CBC;
        //        rijAlg.Padding = PaddingMode.PKCS7;
        //        rijAlg.FeedbackSize = 128;

        //        rijAlg.Key = key;
        //        rijAlg.IV = iv;

        //        // Create a decrytor to perform the stream transform.  
        //        var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

        //        try
        //        {
        //            // Create the streams used for decryption.  
        //            using (var msDecrypt = new MemoryStream(cipherText))
        //            {
        //                using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
        //                {

        //                    using (var srDecrypt = new StreamReader(csDecrypt))
        //                    {
        //                        // Read the decrypted bytes from the decrypting stream  
        //                        // and place them in a string.  
        //                        plaintext = srDecrypt.ReadToEnd();

        //                    }

        //                }
        //            }
        //        }
        //        catch
        //        {
        //            plaintext = "keyError";
        //        }
        //    }

        //    return plaintext;
        //}



        [HttpPost("Login")]
        [Produces(typeof(UserAccount))]
        public IActionResult LoginUser([FromBody]UserAccount account)
        {
            string key = _Iencrypt.Key.ToString();
            string IVKey = _Iencrypt.IV.ToString();
            string text = account.userName;
            string password = Encrypt.DecryptAESString(account.password,key,IVKey);
            var acc = _account.UserAccountAccess(text, password);

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