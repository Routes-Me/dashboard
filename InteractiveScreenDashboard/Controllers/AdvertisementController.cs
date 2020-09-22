using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Models.Front;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VideoConvertor;

namespace InteractiveScreenDashboard.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/advertisements")]
    public class AdvertisementController : ControllerBase
    {
        private readonly IAdvertisementService _Advertisement;
        private IWebHostEnvironment _hostingEnvironment;

        public AdvertisementController(IAdvertisementService advertisementService, IWebHostEnvironment environment)
        {
            this._Advertisement = advertisementService;
            this._hostingEnvironment = environment;
        }

        [Produces(typeof(Advertisement))]
        public IActionResult addAdvertisement([FromBody]Advertisement add)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(add!=null)
            {
                _Advertisement.addAdvertisement(add);

            }

            return Ok(add);
        }


        [HttpGet]
        public ActionResult getAllAdvertisements([FromRoute] int? institutionId,[FromQuery] QueryParameters parameters)
        {
            List<Advertisement> addList = new List<Advertisement>();
            
            var result = new ObjectResult(_Advertisement.getAdvertisements(institutionId, parameters))
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return Ok(result);
        }

        [HttpGet]
        public ActionResult getAllCampaigns()
        {
            var result = new ObjectResult(_Advertisement.getAllCampaign())
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return Ok(result);
        }

        [HttpGet]
        public ActionResult getAllDayinterval()
        {
            var result = new ObjectResult(_Advertisement.getAllDayIntervals())
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("convert")]
        public async Task<IActionResult> UploadToConvert([FromForm] Media fileToConvert)
        {
            try
            {

                string Stoaragewrite = await WriteToStorage(fileToConvert.File);
                //String FilePath = 
                return StatusCode(StatusCodes.Status201Created);

                

                //using (var httpClient = new HttpClient())
                //{
                //    LoggedInUser user = new LoggedInUser();

                //    using (var response = await httpClient.GetAsync("https://localhost:8888/api/v1/adverti"))
                //    {
                //        string apiResponse = await response.Content.ReadAsStringAsync();
                //        user = JsonConvert.DeserializeObject<LoggedInUser>(apiResponse);
                //    }
                //}

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        private Task<string> WriteToStorage(IFormFile File)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Converted", File.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    File.CopyTo(stream);
                }
                return Task.FromResult("Inserted");
            }
            catch(Exception ex)
            {
                return Task.FromResult("Error => " + ex);
            }
            
            
        } 


        public string convertMedia(string filePath, bool mute)
        {
            try
            {
                string pathToConvertor = Path.Combine(_hostingEnvironment.WebRootPath, "/Data/Player/"); ;
                Convertor conversion = new Convertor();
                string path = conversion.ConvertVideo(filePath, (bool)mute, pathToConvertor);
                return path;
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                return msg;
            }
        }



    }
}
